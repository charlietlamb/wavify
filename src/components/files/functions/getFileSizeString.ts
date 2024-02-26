export function getFileSizeString(size: number) {
  if (size < 1) {
    return `${(size * 1024).toFixed(2)} KB`
  }
  if (size < 1024) {
    return `${size.toFixed(2)} MB`
  }
  return `${(size / 1024).toFixed(2)} GB`
}
