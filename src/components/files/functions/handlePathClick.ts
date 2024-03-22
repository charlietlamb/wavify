import { Dispatch, SetStateAction } from 'react'

export function handlePathClick(
  id: string | null,
  path: Path[],
  setPath: Dispatch<SetStateAction<Path[]>>
) {
  if (!id) {
    return setPath([path[0]])
  }
  const newPath = []
  for (const pathItem of path) {
    newPath.push(pathItem)
    if (pathItem.id === id) {
      break
    }
  }
  setPath(newPath)
}
