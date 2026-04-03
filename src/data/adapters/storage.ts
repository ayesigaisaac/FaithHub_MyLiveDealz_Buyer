type SafeReviver<T> = (value: unknown) => T | null;

const memoryStorage = new Map<string, string>();

function hasWindowStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readRaw(key: string) {
  if (hasWindowStorage()) {
    return window.localStorage.getItem(key);
  }
  return memoryStorage.get(key) || null;
}

function writeRaw(key: string, value: string) {
  if (hasWindowStorage()) {
    window.localStorage.setItem(key, value);
    return;
  }
  memoryStorage.set(key, value);
}

function cloneValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function readJson<T>(key: string, seed: T, reviver: SafeReviver<T>) {
  const raw = readRaw(key);
  if (!raw) return cloneValue(seed);

  try {
    const parsed = JSON.parse(raw) as unknown;
    const revived = reviver(parsed);
    if (revived === null) return cloneValue(seed);
    return cloneValue(revived);
  } catch {
    return cloneValue(seed);
  }
}

export function writeJson<T>(key: string, value: T) {
  writeRaw(key, JSON.stringify(value));
}

export function clearJson(key: string) {
  if (hasWindowStorage()) {
    window.localStorage.removeItem(key);
    return;
  }
  memoryStorage.delete(key);
}

