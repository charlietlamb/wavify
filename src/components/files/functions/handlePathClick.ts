import { Dispatch, SetStateAction } from 'react'

export function handlePathClick(
  id: string,
  path: Path[],
  setPath: Dispatch<SetStateAction<Path[]>>
) {
  const newPath = []
  for (const pathItem of path) {
    newPath.push(pathItem)
    if (pathItem.id === id) {
      break
    }
  }
  setPath(newPath)
}
