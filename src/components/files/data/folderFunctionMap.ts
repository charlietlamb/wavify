import { getFoldersFeedback } from '../functions/getFolders/getFoldersFeedback'
import { getFoldersFeedbackQuick } from '../functions/getFolders/getFoldersFeedbackQuick'
import { getFoldersFeedbackUsers } from '../functions/getFolders/getFoldersFeedbackUsers'
import { getFoldersFeedbackUsersQuick } from '../functions/getFolders/getFoldersFeedbackUsersQuick'
import { getFoldersLibrary } from '../functions/getFolders/getFoldersLibrary'
import { getFoldersLibraryQuick } from '../functions/getFolders/getFoldersLibraryQuick'
import { getFoldersPostbox } from '../functions/getFolders/getFoldersPostbox'
import { getFoldersPostboxQuick } from '../functions/getFolders/getFoldersPostboxQuick'
import { getFoldersPostboxUsers } from '../functions/getFolders/getFoldersPostboxUsers'
import { getFoldersPostboxUsersQuick } from '../functions/getFolders/getFoldersPostboxUsersQuick'
import { getFoldersTransient } from '../functions/getFolders/getFoldersTransient'
import { getFoldersTransientQuick } from '../functions/getFolders/getFoldersTransientQuick'

export const folderFunctionMap = new Map<
  string,
  () => Promise<FolderAndSender[]>
>([
  ['library', getFoldersLibrary],
  ['postbox', getFoldersPostbox],
  ['postbox/user', getFoldersPostboxUsers],
  ['transient', getFoldersTransient],
  ['feedback', getFoldersFeedback],
  ['feedback/user', getFoldersFeedbackUsers],
])
export const folderFunctionMapQuick = new Map<
  string,
  () => Promise<FolderAndSender[]>
>([
  ['library', getFoldersLibraryQuick],
  ['postbox', getFoldersPostboxQuick],
  ['postbox/user', getFoldersPostboxUsersQuick],
  ['transient', getFoldersTransientQuick],
  ['feedback', getFoldersFeedbackQuick],
  ['feedback/user', getFoldersFeedbackUsersQuick],
])
