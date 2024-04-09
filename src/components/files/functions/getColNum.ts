export function getColNum(size: number) {
  if (size < 640) return 1
  if (size < 768) return 2
  if (size < 1024) return 3
  if (size < 1280) return 4
  if (size < 1536) return 5
  return 6
}
