export const getFileExtension = (url: string | undefined): string => {
  if (typeof url === 'string') {
    const parts = url.split('.')
    return parts.length > 0 ? parts.pop()?.toLowerCase() || '' : ''
  }
  return ''
}
