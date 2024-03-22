import { getFoldersChats } from '../functions/getFolders/getFoldersChats'
import { getFoldersChatsQuick } from '../functions/getFolders/getFoldersChatsQuick'
import { getFoldersCollective } from '../functions/getFolders/getFoldersCollective'
import { getFoldersCollectiveQuick } from '../functions/getFolders/getFoldersCollectiveQuick'
import { getFoldersCollectives } from '../functions/getFolders/getFoldersCollectives'
import { getFoldersCollectivesQuick } from '../functions/getFolders/getFoldersCollectivesQuick'
import { getFoldersFeedback } from '../functions/getFolders/getFoldersFeedback'
import { getFoldersFeedbackQuick } from '../functions/getFolders/getFoldersFeedbackQuick'
import { getFoldersFeedbackUsers } from '../functions/getFolders/getFoldersFeedbackUsers'
import { getFoldersFeedbackUsersQuick } from '../functions/getFolders/getFoldersFeedbackUsersQuick'
import { getFoldersLibrary } from '../functions/getFolders/getFoldersLibrary'
import { getFoldersLibraryQuick } from '../functions/getFolders/getFoldersLibraryQuick'
import { getFoldersLibraryUser } from '../functions/getFolders/getFoldersLibraryUser'
import { getFoldersLibraryUserQuick } from '../functions/getFolders/getFoldersLibraryUserQuick'
import { getFoldersPostbox } from '../functions/getFolders/getFoldersPostbox'
import { getFoldersPostboxQuick } from '../functions/getFolders/getFoldersPostboxQuick'
import { getFoldersPostboxUsers } from '../functions/getFolders/getFoldersPostboxUsers'
import { getFoldersPostboxUsersQuick } from '../functions/getFolders/getFoldersPostboxUsersQuick'
import { getFoldersSpace } from '../functions/getFolders/getFoldersSpace'
import { getFoldersSpaceQuick } from '../functions/getFolders/getFoldersSpaceQuick'
import { getFoldersTransient } from '../functions/getFolders/getFoldersTransient'
import { getFoldersTransientQuick } from '../functions/getFolders/getFoldersTransientQuick'

async function getNothing() {
  return []
}

export const folderFunctionMap = new Map<
  string,
  (
    path: Path[],
    schedule: Schedule | null | undefined
  ) => Promise<FolderAndSender[]>
>([
  ['library', getFoldersLibrary],
  ['postbox', getFoldersPostbox],
  ['postbox/user', getFoldersPostboxUsers],
  ['transient', getFoldersTransient],
  ['feedback', getFoldersFeedback],
  ['feedback/user', getFoldersFeedbackUsers],
  ['collectives', getFoldersCollectives],
  ['collectives/collective', getFoldersCollective],
  ['collectives/collective/space', getFoldersSpace],
  ['chats', getFoldersChats],
  ['chats/user', getNothing],
  ['library/user', getFoldersLibraryUser],
])
export const folderFunctionMapQuick = new Map<
  string,
  (
    path: Path[],
    schedule: Schedule | null | undefined
  ) => Promise<FolderAndSender[]>
>([
  ['library', getFoldersLibraryQuick],
  ['postbox', getFoldersPostboxQuick],
  ['postbox/user', getFoldersPostboxUsersQuick],
  ['transient', getFoldersTransientQuick],
  ['feedback', getFoldersFeedbackQuick],
  ['feedback/user', getFoldersFeedbackUsersQuick],
  ['collectives', getFoldersCollectivesQuick],
  ['collectives/collective', getFoldersCollectiveQuick],
  ['collectives/collective/space', getFoldersSpaceQuick],
  ['chats', getFoldersChatsQuick],
  ['chats/user', getNothing],
  ['library/user', getFoldersLibraryUserQuick],
])
