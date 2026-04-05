import React, { useEffect, useMemo, useState } from "react";
import { BookOpen, Download, ExternalLink, Filter, Search, Sparkles, Tag, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import EmptyState from "@/components/system/EmptyState";
import LoadingState from "@/components/system/LoadingState";
import {
  bumpResourceDownload,
  createResource,
  faithMartUrl,
  getFaithHubResources,
  getResourceCategories,
  removeResource,
  saveFaithHubResources,
  updateResource,
} from "@/data/resources";
import { routes } from "@/constants/routes";
import type { FaithHubResource, ResourceCategory, ResourceType } from "@/types/resources";

const ALL_CATEGORIES = "All categories";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function typeLabel(type: ResourceType) {
  if (type === "pdf") return "PDF";
  if (type === "audio") return "Audio";
  return "Video";
}

function resolveDetailPath(resourceId: string, role: "user" | "provider") {
  if (role === "provider") return routes.app.provider.resourceDetailById(resourceId);
  return routes.app.user.resourceDetailById(resourceId);
}

function ResourceCard({
  resource,
  role,
  onOpen,
  onDownload,
}: {
  resource: FaithHubResource;
  role: "user" | "provider";
  onOpen: () => void;
  onDownload: () => void;
}) {
  const providerResource = resource.uploader_role === "provider";
  return (
    <Card
      className={`fh-surface-card rounded-2xl transition-all duration-200 ${
        providerResource ? "border-[rgba(3,205,140,0.34)]" : ""
      }`}
    >
      <CardContent className="p-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <div className="text-base font-semibold text-[var(--text-primary)]">{resource.title}</div>
            <div className="mt-1 text-xs text-[var(--text-secondary)]">
              {resource.author} • {typeLabel(resource.type)} • {resource.category}
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            <Badge className="fh-pill fh-pill-emerald">Free</Badge>
            {providerResource ? <Badge className="fh-pill fh-pill-slate">Provider</Badge> : null}
          </div>
        </div>

        <p className="mt-2 text-sm text-[var(--text-secondary)]">{resource.description}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {resource.tags.slice(0, 4).map((tag) => (
            <span key={`${resource.id}-${tag}`} className="fh-pill fh-pill-slate">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--text-secondary)]">
          <span>{formatDate(resource.created_at)}</span>
          <span className="inline-flex items-center gap-1">
            <Download className="h-3.5 w-3.5" />
            {resource.download_count} downloads
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <Button className="fh-user-primary-btn" onClick={onOpen}>
            Open details
          </Button>
          <Button variant="outline" className="fh-user-secondary-btn" onClick={onDownload}>
            Download
          </Button>
          {role === "provider" && providerResource ? (
            <Badge className="fh-pill fh-pill-emerald">Trusted provider upload</Badge>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

export default function FaithHubResourcesHub() {
  const navigate = useNavigate();
  const { role, user } = useAuth();
  const viewerRole = role === "provider" ? "provider" : "user";
  const isProvider = viewerRole === "provider";

  const [resources, setResources] = useState<FaithHubResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>(ALL_CATEGORIES);
  const [resourceType, setResourceType] = useState<"all" | ResourceType>("all");

  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadDescription, setUploadDescription] = useState("");
  const [uploadType, setUploadType] = useState<ResourceType>("pdf");
  const [uploadCategory, setUploadCategory] = useState<ResourceCategory>("Books");
  const [uploadUrl, setUploadUrl] = useState("");
  const [uploadTags, setUploadTags] = useState("");

  const [tagDraftById, setTagDraftById] = useState<Record<string, string>>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setResources(getFaithHubResources());
      setIsLoading(false);
    }, 120);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    saveFaithHubResources(resources);
  }, [isLoading, resources]);

  const categories = useMemo(() => [ALL_CATEGORIES, ...getResourceCategories()], []);

  const filteredResources = useMemo(() => {
    const term = search.trim().toLowerCase();
    return resources.filter((resource) => {
      const categoryMatch = category === ALL_CATEGORIES || resource.category === category;
      const typeMatch = resourceType === "all" || resource.type === resourceType;
      const searchMatch =
        !term ||
        resource.title.toLowerCase().includes(term) ||
        resource.description.toLowerCase().includes(term) ||
        resource.author.toLowerCase().includes(term) ||
        resource.tags.join(" ").toLowerCase().includes(term);
      return categoryMatch && typeMatch && searchMatch;
    });
  }, [category, resourceType, resources, search]);

  const featuredResources = useMemo(
    () => resources.filter((resource) => resource.featured).slice(0, 4),
    [resources],
  );
  const recentlyAdded = useMemo(
    () =>
      resources
        .slice()
        .sort((a, b) => b.created_at.localeCompare(a.created_at))
        .slice(0, 4),
    [resources],
  );
  const recommended = useMemo(
    () => resources.filter((resource) => resource.recommended).slice(0, 4),
    [resources],
  );

  const providerOwnedResources = useMemo(
    () => resources.filter((resource) => resource.uploader_role === "provider"),
    [resources],
  );

  const openResourceDetail = (resourceId: string) => {
    navigate(resolveDetailPath(resourceId, viewerRole));
  };

  const downloadResource = (resource: FaithHubResource) => {
    const next = bumpResourceDownload(resources, resource.id);
    setResources(next);
    window.open(resource.file_url, "_blank", "noopener,noreferrer");
  };

  const handleProviderUpload = () => {
    if (!uploadTitle.trim() || !uploadDescription.trim() || !uploadUrl.trim()) return;
    const next = createResource(resources, {
      title: uploadTitle,
      description: uploadDescription,
      type: uploadType,
      category: uploadCategory,
      author: user?.name || "Provider Team",
      file_url: uploadUrl,
      tags: uploadTags.split(",").map((tag) => tag.trim()),
      uploader_role: "provider",
    });
    setResources(next);
    setUploadTitle("");
    setUploadDescription("");
    setUploadUrl("");
    setUploadTags("");
    setUploadType("pdf");
    setUploadCategory("Books");
  };

  const saveProviderTags = (resourceId: string) => {
    const draft = (tagDraftById[resourceId] || "").trim();
    if (!draft) return;
    const next = updateResource(resources, resourceId, {
      tags: draft
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    });
    setResources(next);
  };

  return (
    <div className="space-y-4">
      {isLoading ? <LoadingState title="Loading resources" message="Syncing free library content..." /> : null}
      <Card className="fh-surface-card rounded-[28px]">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="fh-label text-[var(--text-muted)]">Books & Resources</div>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                Free Learning Resources
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
                Explore free books, PDFs, audio teachings, and devotionals. Paid resources remain in FaithMart.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge className="fh-pill fh-pill-emerald">{resources.length} free resources</Badge>
                <Badge className="fh-pill fh-pill-slate">
                  {isProvider ? "Provider upload enabled" : "Reader mode"}
                </Badge>
              </div>
            </div>

            <Button
              variant="outline"
              className="fh-user-secondary-btn"
              onClick={() => window.open(faithMartUrl, "_blank", "noopener,noreferrer")}
            >
              <ExternalLink className="mr-1.5 h-4 w-4" />
              Explore premium resources in FaithMart
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="fh-surface-card rounded-2xl">
        <CardContent className="p-4 sm:p-5">
          <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
            <label className="fh-user-input">
              <Search className="h-4 w-4 text-[var(--text-secondary)]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search title, author, or tag"
                className="w-full"
              />
            </label>

            <label className="fh-user-filter min-w-[190px]">
              <span className="inline-flex items-center gap-1">
                <Filter className="h-3.5 w-3.5" />
                Category
              </span>
              <select value={category} onChange={(event) => setCategory(event.target.value)} className="w-full">
                {categories.map((entry) => (
                  <option key={entry} value={entry}>
                    {entry}
                  </option>
                ))}
              </select>
            </label>

            <label className="fh-user-filter min-w-[150px]">
              Type
              <select
                value={resourceType}
                onChange={(event) => setResourceType(event.target.value as "all" | ResourceType)}
                className="w-full"
              >
                <option value="all">All types</option>
                <option value="pdf">PDF</option>
                <option value="audio">Audio</option>
                <option value="video">Video</option>
              </select>
            </label>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <div className="flex items-center gap-2 text-lg font-semibold text-[var(--text-primary)]">
          <Sparkles className="h-5 w-5 text-[var(--accent)]" />
          Featured resources
        </div>
        {featuredResources.length ? (
          <div className="grid gap-3 md:grid-cols-2">
            {featuredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                role={viewerRole}
                onOpen={() => openResourceDetail(resource.id)}
                onDownload={() => downloadResource(resource)}
              />
            ))}
          </div>
        ) : (
          <EmptyState title="No featured resources yet" message="Featured items will appear here when curated." />
        )}
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Card className="fh-surface-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <div className="text-base font-semibold text-[var(--text-primary)]">Recently added</div>
            <div className="mt-3 space-y-2">
              {recentlyAdded.map((resource) => (
                <button
                  key={resource.id}
                  type="button"
                  onClick={() => openResourceDetail(resource.id)}
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-left transition hover:border-[rgba(3,205,140,0.35)] hover:bg-[var(--accent-soft)]"
                >
                  <div className="text-sm font-semibold text-[var(--text-primary)]">{resource.title}</div>
                  <div className="text-xs text-[var(--text-secondary)]">
                    {resource.author} • {formatDate(resource.created_at)}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="fh-surface-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <div className="text-base font-semibold text-[var(--text-primary)]">Recommended</div>
            <div className="mt-3 space-y-2">
              {recommended.map((resource) => (
                <button
                  key={resource.id}
                  type="button"
                  onClick={() => openResourceDetail(resource.id)}
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-left transition hover:border-[rgba(3,205,140,0.35)] hover:bg-[var(--accent-soft)]"
                >
                  <div className="text-sm font-semibold text-[var(--text-primary)]">{resource.title}</div>
                  <div className="text-xs text-[var(--text-secondary)]">
                    {resource.category} • {resource.download_count} downloads
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-3">
        <div className="flex items-center gap-2 text-lg font-semibold text-[var(--text-primary)]">
          <BookOpen className="h-5 w-5 text-[var(--accent)]" />
          Resource library
        </div>
        {filteredResources.length ? (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                role={viewerRole}
                onOpen={() => openResourceDetail(resource.id)}
                onDownload={() => downloadResource(resource)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No resources match your filters"
            message="Try another category, type, or search term."
            actionLabel="Clear filters"
            onAction={() => {
              setSearch("");
              setCategory(ALL_CATEGORIES);
              setResourceType("all");
            }}
          />
        )}
      </section>

      {isProvider ? (
        <section className="grid gap-4 xl:grid-cols-[1.1fr_1fr]">
          <Card className="fh-surface-card rounded-2xl">
            <CardContent className="p-4 sm:p-5">
              <div className="text-base font-semibold text-[var(--text-primary)]">Provider upload</div>
              <p className="mt-1 text-xs text-[var(--text-secondary)]">
                Upload free resources for the community and tag them for better discovery.
              </p>
              <div className="mt-3 space-y-3">
                <label className="fh-user-filter">
                  Title
                  <input
                    value={uploadTitle}
                    onChange={(event) => setUploadTitle(event.target.value)}
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
                    placeholder="Resource title"
                  />
                </label>
                <label className="fh-user-filter">
                  Description
                  <textarea
                    value={uploadDescription}
                    onChange={(event) => setUploadDescription(event.target.value)}
                    rows={3}
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
                    placeholder="Short summary"
                  />
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="fh-user-filter">
                    Type
                    <select
                      value={uploadType}
                      onChange={(event) => setUploadType(event.target.value as ResourceType)}
                      className="w-full"
                    >
                      <option value="pdf">PDF</option>
                      <option value="audio">Audio</option>
                      <option value="video">Video</option>
                    </select>
                  </label>
                  <label className="fh-user-filter">
                    Category
                    <select
                      value={uploadCategory}
                      onChange={(event) => setUploadCategory(event.target.value as ResourceCategory)}
                      className="w-full"
                    >
                      {getResourceCategories().map((entry) => (
                        <option key={entry} value={entry}>
                          {entry}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className="fh-user-filter">
                  File URL
                  <input
                    value={uploadUrl}
                    onChange={(event) => setUploadUrl(event.target.value)}
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
                    placeholder="https://..."
                  />
                </label>
                <label className="fh-user-filter">
                  Tags (comma separated)
                  <input
                    value={uploadTags}
                    onChange={(event) => setUploadTags(event.target.value)}
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
                    placeholder="prayer, discipleship, youth"
                  />
                </label>
                <Button className="fh-user-primary-btn w-full" onClick={handleProviderUpload}>
                  <Upload className="mr-1.5 h-4 w-4" />
                  Publish free resource
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="fh-surface-card rounded-2xl">
            <CardContent className="p-4 sm:p-5">
              <div className="text-base font-semibold text-[var(--text-primary)]">Manage provider resources</div>
              <div className="mt-3 space-y-3">
                {providerOwnedResources.length ? (
                  providerOwnedResources.map((resource) => (
                    <div key={resource.id} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
                      <div className="text-sm font-semibold text-[var(--text-primary)]">{resource.title}</div>
                      <div className="mt-1 text-xs text-[var(--text-secondary)]">
                        {resource.download_count} downloads � {resource.category}
                      </div>
                      <div className="mt-2 grid gap-2">
                        <label className="text-xs font-semibold text-[var(--text-secondary)]">
                          <span className="inline-flex items-center gap-1">
                            <Tag className="h-3.5 w-3.5" />
                            Tags
                          </span>
                          <input
                            value={tagDraftById[resource.id] ?? resource.tags.join(", ")}
                            onChange={(event) =>
                              setTagDraftById((prev) => ({
                                ...prev,
                                [resource.id]: event.target.value,
                              }))
                            }
                            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
                          />
                        </label>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          className="fh-user-secondary-btn"
                          onClick={() => saveProviderTags(resource.id)}
                        >
                          Save tags
                        </Button>
                        <Button
                          variant="outline"
                          className="fh-user-secondary-btn"
                          onClick={() =>
                            setResources(
                              updateResource(resources, resource.id, {
                                featured: !resource.featured,
                              }),
                            )
                          }
                        >
                          {resource.featured ? "Unfeature" : "Feature"}
                        </Button>
                        <Button
                          variant="outline"
                          className="fh-user-secondary-btn"
                          onClick={() =>
                            setResources(
                              updateResource(resources, resource.id, {
                                recommended: !resource.recommended,
                              }),
                            )
                          }
                        >
                          {resource.recommended ? "Unrecommend" : "Recommend"}
                        </Button>
                        <Button
                          variant="outline"
                          className="fh-user-secondary-btn"
                          onClick={() => setResources(removeResource(resources, resource.id))}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <EmptyState
                    title="No provider uploads yet"
                    message="Publish your first free resource to start serving the community."
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </section>
      ) : null}
    </div>
  );
}
