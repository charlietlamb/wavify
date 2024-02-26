'use client'

import { useUser } from '@/state/user/useUser'
import { FilesContext } from './state/context'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useRef, useState } from 'react'
import { FileMode, Filters, SortingType, View } from './data/data'
import { useFileUserUpdateEffect } from './hooks/useFileUserUpdateEffect'
import { useFilesFolderUpdateEffect } from './hooks/useFilesFolderUpdateEffect'
import { useFolderUpdateEffect } from './hooks/useFolderUpdateEffect'
import { useFolderChangeEffect } from './hooks/useFolderChangeEffect'
import { useFileChangeEffect } from './hooks/useFileChangeEffect'
import { usePathChangeEffect } from './hooks/usePathChangeEffect'

export default function FilesProvider({
  initSearchFiles,
  initFiles,
  initFolders,
  children,
}: {
  initSearchFiles: FileAndSender[]
  initFiles: FileAndSender[]
  initFolders: FolderAndSender[]
  children: React.ReactNode
}) {
  const user = useUser()
  const supabase = createClientComponentClient()
  const [mode, setMode] = useState<FileMode>('all')
  const [path, setPath] = useState<Path[]>([])
  const [sorting, setSorting] = useState<SortingType>('default')
  const [filterByMusic, setFilterByMusic] = useState<boolean>(false)
  const [parent, setParent] = useState<string | null>(null)
  const parentStore = useRef<string | null>(null)
  const [files, setFiles] = useState<FileAndSender[]>(initFiles)
  const [changeFiles, setChangeFiles] = useState<FileAndSender[]>(initFiles)
  const [view, setView] = useState<View>('grid')
  useFilesFolderUpdateEffect(
    supabase,
    user,
    parent,
    changeFiles,
    setChangeFiles
  )
  const [folders, setFolders] = useState<FolderAndSender[]>(initFolders)
  const [changeFolders, setChangeFolders] =
    useState<FolderAndSender[]>(initFolders)
  useFolderUpdateEffect(supabase, user, parent, changeFolders, setChangeFolders)
  const [searchFiles, setSearchFiles] =
    useState<FileAndSender[]>(initSearchFiles)
  useFileUserUpdateEffect(supabase, user, files, setSearchFiles)
  const filters: Filters = {
    music: filterByMusic,
  }
  useFolderChangeEffect(
    supabase,
    user,
    changeFolders,
    setFolders,
    filters,
    sorting,
    parent,
    parentStore
  )

  useFileChangeEffect(
    supabase,
    user,
    changeFiles,
    setFiles,
    filters,
    sorting,
    parent,
    parentStore
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
      }}
    >
      {children}
    </FilesContext.Provider>
  )
}
