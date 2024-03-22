import { getFilesFeedback } from '../functions/getFiles/getFilesFeedback'
import { getFilesLibrary } from '../functions/getFiles/getFilesLibrary'
import { getFilesPostbox } from '../functions/getFiles/getFilesPostbox'
import { getFilesTransient } from '../functions/getFiles/getFilesTransient'
import { getFilesChat } from '../functions/getFiles/getFilesChat'
import { getFilesSpace } from '../functions/getFiles/getFilesSpace'
import { getFilesLibraryUser } from '../functions/getFiles/getFilesLibraryUser'

async function getNothing() {
  return []
}

export const fileFunctionMap = new Map<
  string,
  (
    path: Path[],
    schedule: Schedule | null | undefined
  ) => Promise<FileAndSender[]>
>([
  ['library', getFilesLibrary],
  ['postbox', getNothing],
  ['postbox/user', getFilesPostbox],
  ['transient', getFilesTransient],
  ['feedback', getNothing],
  ['feedback/user', getFilesFeedback],
  ['collectives', getNothing],
  ['collectives/collective', getNothing],
  ['collectives/collective/space', getFilesSpace],
  ['chats', getNothing],
  ['chats/user', getFilesChat],
  ['library/user', getFilesLibraryUser],
])
