import { Dispatch, SetStateAction } from 'react'
import { pathMap } from '../data/pathMap'

export async function handlePathFolderClick(
  path: Path[],
  setPath: Dispatch<SetStateAction<Path[]>>,
  folder: Folder
) {
  const latestPathItemType = path[path.length - 1].type

  const newPathItem = {
    id: folder.id,
    name: folder.name,
    type: pathMap.get(latestPathItemType) as string,
    files: true,
    folders: true,
  } as Path
  setPath([...path, newPathItem])
}
