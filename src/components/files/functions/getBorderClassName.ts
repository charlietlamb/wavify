export function getBorderClassName(
  folders: number,
  files: number,
  colNum: number,
  index: number,
  isFile: boolean
) {
  console.log(colNum)
  let className = 'border-b '
  console.log(folders + files)
  if (isFile && (index + 1 + folders) % files !== colNum)
    className += 'border-r'
  if (!isFile && (index + 1) % folders !== colNum) className += 'border-r'

  return className
}
