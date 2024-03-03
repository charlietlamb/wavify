'use client'

import { useUser } from '@/state/user/useUser'
import { FilesContext } from './state/context'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRef, useState } from 'react'
import { FileMode, Filters, SortingType, View } from './data/data'
import { useFileUpdateEffect } from './hooks/useFileUpdateEffect'
import { useFilesFolderUpdateEffect } from './hooks/useFilesFolderUpdateEffect'
import { useFolderUpdateEffect } from './hooks/useFolderUpdateEffect'
import { useFolderChangeEffect } from './hooks/useFolderChangeEffect'
import { useFileChangeEffect } from './hooks/useFileChangeEffect'
import { usePathChangeEffect } from './hooks/usePathChangeEffect'
import { useCollective } from '@/state/collective/useCollective'
import { usePostboxUpdateEffect } from './postbox/hooks/usePostboxUpdateEffect'
import { usePostboxChangeEffect } from './hooks/usePostboxChangeEffect'

export default function FilesProvider({
  initSearchFiles,
  initFiles,
  initFolders,
  space,
  postbox = false,
  postboxFoldersInit = [],
  transient = false,
  transientFoldersInit = [],
  children,
}: {
  initSearchFiles: FileAndSender[]
  initFiles: FileAndSender[]
  initFolders: FolderAndSender[]
  space?: Space
  postbox?: boolean
  postboxFoldersInit?: FolderAndSender[]
  transient?: boolean
  transientFoldersInit?: FolderAndSender[]
  children: React.ReactNode
}) {
  const user = useUser()
  const supabase = createClientComponentClient()
  const colUser = space ? useCollective().colUser : null
  const postboxSend =
    space && colUser && postbox
      ? space.pbSend.includes(colUser.roles.id)
      : false
  const postboxReceive =
    space && colUser && postbox
      ? space.pbReceive.includes(colUser.roles.id)
      : false
  const transientPost =
    space && colUser && transient
      ? space.tPost.includes(colUser.roles.id)
      : false
  const transientAccess =
    space && colUser && transient
      ? space.tAccess.includes(colUser.roles.id)
      : false
  const [mode, setMode] = useState<FileMode>('all')
  const [path, setPath] = useState<Path[]>([])
  const [sorting, setSorting] = useState<SortingType>('default')
  const [filterByMusic, setFilterByMusic] = useState<boolean>(false)
  const [parent, setParent] = useState<string | null>(
    postboxReceive
      ? 'pb'
      : postboxSend
        ? 'u:' + user.id
        : transient
          ? 't'
          : null
  )
  const parentStore = useRef<string | null>(null)
  const [files, setFiles] = useState<FileAndSender[]>(initFiles)
  const fileStore = useRef<FileAndSender[]>(initFiles)
  const [view, setView] = useState<View>('grid')
  const [folders, setFolders] = useState<FolderAndSender[]>(initFolders)
  const folderStore = useRef<FolderAndSender[]>(initFolders)
  const [changeFolders, setChangeFolders] =
    useState<FolderAndSender[]>(initFolders)
  const [searchFiles, setSearchFiles] =
    useState<FileAndSender[]>(initSearchFiles)
  const [postboxFolders, setPostboxFolders] = useState(postboxFoldersInit)
  const [postboxLastFetched, setPostboxLastFetched] = useState<string>(
    new Date().toISOString()
  )
  const filters: Filters = {
    music: filterByMusic,
  }

  useFolderUpdateEffect(
    supabase,
    user,
    parent,
    folderStore,
    setChangeFolders,
    space
  )
  useFileUpdateEffect(supabase, user, files, setSearchFiles, space)
  useFilesFolderUpdateEffect(supabase, user, parent, fileStore, space)

  usePostboxUpdateEffect(
    supabase,
    user,
    postboxFolders,
    setPostboxFolders,
    space,
    setPostboxLastFetched
  )

  useFolderChangeEffect(
    supabase,
    user,
    changeFolders,
    setFolders,
    filters,
    sorting,
    parent,
    parentStore,
    folderStore,
    space,
    postbox,
    postboxFolders,
    postboxLastFetched,
    transient
  )

  useFileChangeEffect(
    supabase,
    user,
    setFiles,
    filters,
    sorting,
    parent,
    parentStore,
    fileStore,
    space
  )

  usePathChangeEffect(
    supabase,
    parent,
    setPath,
    space,
    postbox,
    postboxFolders,
    postboxReceive
  )

  usePostboxChangeEffect(supabase, postbox, setPostboxFolders, space, parent)
  if (postbox && !postboxSend && !postboxReceive) return
  return (
    <FilesContext.Provider
      value={{
        searchFiles,
        mode,
        setMode,
        path,
        setPath,
        parent,
        setParent,
        sorting,
        setSorting,
        filterByMusic,
        setFilterByMusic,
        files,
        setFiles,
        folders,
        setFolders,
        view,
        setView,
        space,
        postbox,
        postboxSend,
        postboxReceive,
        transient,
        transientPost,
        transientAccess,
      }}
    >
      {children}
    </FilesContext.Provider>
  )
}
