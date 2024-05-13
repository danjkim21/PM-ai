const trackers: Record<string, { count: number; expiresAt: number }> = {};

export async function rateLimitByKey(
  key: string | undefined,
  limit = 1,
  window = 10000,
) {
  if (!key) {
    throw new Error("Key is required");
  }

  const tracker = trackers[key] ?? { count: 0, expiresAt: 0 };

  if (!trackers[key]) {
    trackers[key] = tracker;
  }

  if (tracker.expiresAt < Date.now()) {
    tracker.count = 0;
    tracker.expiresAt = Date.now() + window;
  }

  tracker.count++;

  if (tracker.count > limit) {
    throw new Error("Rate limit exceeded");
  }
}
