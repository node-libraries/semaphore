export const semaphore = (
  limit = 1,
  count = 0,
  rs = new Array<() => void>(),
  all?: () => void
) => ({
  acquire: () =>
    ++count > limit && new Promise<void>((resolve) => rs.push(resolve)),
  release: () => (--count ? rs.shift()?.() : all?.()),
  all: () => count && new Promise<void>((resolve) => (all = resolve)),
});
