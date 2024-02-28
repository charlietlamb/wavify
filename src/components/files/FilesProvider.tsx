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

export default function FilesProvider({
  initSearchFiles,
  initFiles,
  initFolders,
  space,
  children,
}: {
  initSearchFiles: FileAndSender[]
  initFiles: FileAndSender[]
  initFolders: FolderAndSender[]
  space?: Space
  children: React.ReactNode
}) {
  const supabase = createClientComponentClient()
  const [mode, setMode] = useState<FileMode>('all')
  const [path, setPath] = useState<Path[]>([])
  const [sorting, setSorting] = useState<SortingType>('default')
  const [filterByMusic, setFilterByMusic] = useState<boolean>(false)
  const [parent, setParent] = useState<string | null>(null)
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
  const filters: Filters = {
    music: filterByMusic,
  }
  const user = useUser()
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
    space
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

  usePathChangeEffect(supabase, parent, setPath)

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
      }}
    >
      {children}
    </FilesContext.Provider>
  )
}
