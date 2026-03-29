import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const scanRoots = [
  path.join(projectRoot, "src", "pages"),
  path.join(projectRoot, "src", "components"),
];
const outputDir = path.join(projectRoot, "docs");
const outputFile = path.join(outputDir, "interaction-audit.md");

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, out);
      continue;
    }
    if (entry.isFile() && fullPath.endsWith(".tsx")) {
      out.push(fullPath);
    }
  }
  return out;
}

function getLineNumber(content, index) {
  let line = 1;
  for (let i = 0; i < index; i += 1) {
    if (content.charCodeAt(i) === 10) line += 1;
  }
  return line;
}

function extractTags(content, tagName) {
  const needle = `<${tagName}`;
  const tags = [];
  let cursor = 0;

  while (cursor < content.length) {
    const start = content.indexOf(needle, cursor);
    if (start === -1) break;
    const boundaryChar = content[start + needle.length] || "";
    if (/[A-Za-z0-9_-]/.test(boundaryChar)) {
      cursor = start + needle.length;
      continue;
    }

    let end = start + needle.length;
    let inSingle = false;
    let inDouble = false;
    let braceDepth = 0;

    while (end < content.length) {
      const char = content[end];
      const prev = content[end - 1];

      if (!inDouble && braceDepth === 0 && char === "'" && prev !== "\\") inSingle = !inSingle;
      else if (!inSingle && braceDepth === 0 && char === '"' && prev !== "\\") inDouble = !inDouble;
      else if (!inSingle && !inDouble && char === "{") braceDepth += 1;
      else if (!inSingle && !inDouble && char === "}" && braceDepth > 0) braceDepth -= 1;
      else if (!inSingle && !inDouble && braceDepth === 0 && char === ">") {
        end += 1;
        break;
      }

      end += 1;
    }

    tags.push({ start, end, raw: content.slice(start, end), tagName });
    cursor = end;
  }

  return tags;
}

function parseAction(tagRaw) {
  const readAttr = (name) => {
    const quoted = tagRaw.match(new RegExp(`${name}\\s*=\\s*\"([^\"]+)\"`, "i"));
    if (quoted?.[1]) return quoted[1];
    const single = tagRaw.match(new RegExp(`${name}\\s*=\\s*'([^']+)'`, "i"));
    if (single?.[1]) return single[1];
    return "";
  };

  const dataActionId = readAttr("data-action-id");
  if (dataActionId) return `resolver:data-action-id (${dataActionId})`;

  const dataActionLabel = readAttr("data-action-label");
  if (dataActionLabel) return `resolver:data-action-label (${dataActionLabel})`;

  const to = readAttr("to");
  if (to) return `route:${to}`;

  const href = readAttr("href");
  if (href) return `link:${href}`;

  if (/\bonClick\s*=/.test(tagRaw)) return "handler:onClick";

  const ariaLabel = readAttr("aria-label");
  if (ariaLabel) return `resolver:aria-label (${ariaLabel})`;

  const title = readAttr("title");
  if (title) return `resolver:title (${title})`;

  if (/\bdisabled\b/.test(tagRaw)) return "disabled";
  if (/\btype\s*=\s*\"submit\"|\btype\s*=\s*'submit'|\btype\s*=\s*\{\s*\"submit\"/.test(tagRaw)) return "form:submit";

  return "unresolved";
}

function resolveInnerAction(content, tag) {
  if (tag.raw.endsWith("/>")) return "unresolved";
  const closeTag = `</${tag.tagName}>`;
  const closeIndex = content.indexOf(closeTag, tag.end);
  if (closeIndex === -1) return "unresolved";
  const rawInner = content.slice(tag.end, closeIndex);
  const sanitizedInner = rawInner
    .replace(/\{[^}]*\}/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (sanitizedInner) return `resolver:text-content (${sanitizedInner.slice(0, 60)})`;
  if (/<[A-Z][A-Za-z0-9]*/.test(rawInner)) return "resolver:icon-fallback";
  if (/\{[^}]+\}/.test(rawInner)) return "resolver:dynamic-content";
  return "unresolved";
}

function main() {
  const files = scanRoots.flatMap((dir) => walk(dir));
  const clickableTags = [];

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    const tags = [
      ...extractTags(content, "button"),
      ...extractTags(content, "Button"),
      ...extractTags(content, "Link"),
      ...extractTags(content, "NavLink"),
      ...extractTags(content, "a"),
    ];

    for (const tag of tags) {
      const line = getLineNumber(content, tag.start);
      let action = parseAction(tag.raw);
      if (action === "unresolved") {
        action = resolveInnerAction(content, tag);
      }
      const relPath = path.relative(projectRoot, file).replaceAll("\\", "/");
      clickableTags.push({
        file: relPath,
        line,
        element: `<${tag.tagName}>`,
        action,
      });
    }
  }

  clickableTags.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line);

  const unresolved = clickableTags.filter((item) => item.action === "unresolved");
  const lines = [];
  lines.push("# Interaction Audit");
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(`- Total clickable elements scanned: **${clickableTags.length}**`);
  lines.push(`- Unresolved candidates (manual review): **${unresolved.length}**`);
  lines.push("");
  lines.push("## Inventory (clickable elements)");
  lines.push("");
  lines.push("| File | Line | Element | Expected action |");
  lines.push("| --- | ---: | --- | --- |");
  for (const row of clickableTags) {
    lines.push(`| \`${row.file}\` | ${row.line} | \`${row.element}\` | ${row.action} |`);
  }
  lines.push("");
  lines.push("## Unresolved candidates");
  lines.push("");
  if (unresolved.length === 0) {
    lines.push("- None");
  } else {
    for (const row of unresolved) {
      lines.push(`- \`${row.file}:${row.line}\` ${row.element}`);
    }
  }
  lines.push("");

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputFile, `${lines.join("\n")}\n`, "utf8");

  console.log(`Wrote audit to ${path.relative(projectRoot, outputFile)}`);
  console.log(`Total clickable: ${clickableTags.length}`);
  console.log(`Unresolved: ${unresolved.length}`);
}

main();
