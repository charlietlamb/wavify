export function getBottomBorder(
  folders: number,
  files: number,
  colNum: number,
  index: number,
  isFile: boolean
) {
  if (isFile) return index + colNum + 1 > files
  return index + colNum + 1 > files + folders
}
