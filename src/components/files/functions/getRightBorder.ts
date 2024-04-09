export function getRightBorder(
  files: number,
  folders: number,
  colNum: number,
  index: number
) {
  return index === folders - 1 && colNum !== 1
}
