import { getFilesFeedback } from '../functions/getFiles/getFilesFeedback'
import { getFilesLibrary } from '../functions/getFiles/getFilesLibrary'

async function getNothing() {
  return []
}

export const fileFunctionMap = new Map<
  string,
  () => Promise<FolderAndSender[]>
>([
  ['library', getFilesLibrary],
  ['postbox', getNothing],
  ['postbox/user', getFilesPostboxUsers],
  ['transient', getFilesTransient],
  ['feedback', getNothing],
  ['feedback/user', getFilesFeedback],
])
