type SafeReviver<T> = (value: unknown) => T | null;
type VersionedEnvelope<T> = {
  schemaVersion: number;
  data: T;
};

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

export function readJsonVersioned<T>(
  key: string,
  seed: T,
  options: {
    currentVersion: number;
    reviveData: SafeReviver<T>;
    migrate?: (legacyData: unknown, legacyVersion: number) => T | null;
  },
) {
  const raw = readRaw(key);
  if (!raw) return cloneValue(seed);

  try {
    const parsed = JSON.parse(raw) as unknown;

    // New envelope format.
    if (parsed && typeof parsed === "object" && "schemaVersion" in parsed && "data" in parsed) {
      const envelope = parsed as VersionedEnvelope<unknown>;
      const version =
        typeof envelope.schemaVersion === "number" && Number.isFinite(envelope.schemaVersion)
          ? envelope.schemaVersion
          : 0;

      if (version === options.currentVersion) {
        const revived = options.reviveData(envelope.data);
        if (revived === null) return cloneValue(seed);
        return cloneValue(revived);
      }

      if (options.migrate) {
        const migrated = options.migrate(envelope.data, version);
        if (migrated !== null) {
          writeJsonVersioned(key, migrated, options.currentVersion);
          return cloneValue(migrated);
        }
      }

      return cloneValue(seed);
    }

    // Legacy plain format fallback.
    const revivedLegacy = options.reviveData(parsed);
    if (revivedLegacy !== null) {
      writeJsonVersioned(key, revivedLegacy, options.currentVersion);
      return cloneValue(revivedLegacy);
    }

    if (options.migrate) {
      const migrated = options.migrate(parsed, 0);
      if (migrated !== null) {
        writeJsonVersioned(key, migrated, options.currentVersion);
        return cloneValue(migrated);
      }
    }

    return cloneValue(seed);
  } catch {
    return cloneValue(seed);
  }
}

export function writeJsonVersioned<T>(key: string, value: T, schemaVersion: number) {
  const envelope: VersionedEnvelope<T> = {
    schemaVersion,
    data: value,
  };
  writeRaw(key, JSON.stringify(envelope));
}
