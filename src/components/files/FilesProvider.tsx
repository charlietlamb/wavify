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
import { useTransientUpdateEffect } from '../collective/transient/hooks/useTransientUpdateEffect'
import { useTransientChangeEffect } from '../collective/transient/hooks/useTransientChangeEffect'
import { useSpaceUpdateEffect } from './hooks/useSpaceUpdateEffect'
import { useSchedulesUpdateEffect } from './hooks/useSchedulesUpdateEffect'
import { useSchedulesChangeEffect } from './hooks/useSchedulesChangeEffect'
import { useFeedbackUpdateEffect } from '../collective/feedback/hooks/useFeedbackUpdateEffect'
import { useFeedbackChangeEffect } from '../collective/feedback/hooks/useFeedbackChangeEffect'

export default function FilesProvider({
  initSearchFiles,
  initFiles,
  initFolders,
  space,
  postbox = false,
  postboxFoldersInit = [],
  transient = false,
  transientFoldersInit = [],
  initSchedules = [],
  feedback = false,
  feedbackFilesInit = [],
  feedbackFoldersInit = [],
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
  initSchedules?: Schedule[]
  feedback?: boolean
  feedbackFilesInit?: FileAndSender[]
  feedbackFoldersInit?: FolderAndSender[]
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
  const feedbackGet =
    space && colUser && feedback ? space.fGet.includes(colUser.roles.id) : false
  const feedbackGive =
    space && colUser && feedback
      ? space.fGive.includes(colUser.roles.id)
      : false
  const [mode, setMode] = useState<FileMode>('all')
  const [path, setPath] = useState<Path[]>([])
  const [sorting, setSorting] = useState<SortingType>('default')
  const [filterByMusic, setFilterByMusic] = useState<boolean>(false)
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
  const [transientFolders, setTransientFolders] = useState(transientFoldersInit)
  const filters: Filters = {
    music: filterByMusic,
  }

  const [spaceCurrent, setSpaceCurrent] = useState<Space | undefined>(space)
  const [schedule, setSchedule] = useState<Schedule | undefined>(
    initSchedules.find((schedule: Schedule) => {
      const now = new Date()
      const start = new Date(schedule.start)
      const end = new Date(schedule.end)
      return now >= start && now <= end
    })
  )
  const [schedules, setSchedules] = useState<Schedule[]>(initSchedules)

  const [feedbackFiles, setFeedbackFiles] =
    useState<FileAndSender[]>(feedbackFilesInit)
  const [feedbackFolders, setFeedbackFolders] =
    useState<FolderAndSender[]>(feedbackFoldersInit)

  useFolderUpdateEffect(
    supabase,
    user,
    folderStore,
    setChangeFolders,
    space,
    path
  )
  useFileUpdateEffect(supabase, user, files, setSearchFiles, space)
  useFilesFolderUpdateEffect(supabase, user, fileStore, space, path)

  usePostboxUpdateEffect(
    supabase,
    user,
    postboxFolders,
    setPostboxFolders,
    space,
    setPostboxLastFetched
  )
  useTransientUpdateEffect(
    supabase,
    user,
    transientFolders,
    setTransientFolders,
    space,
    schedule
  )

  useFeedbackUpdateEffect(
    supabase,
    user,
    feedbackFiles,
    setFeedbackFiles,
    feedbackFolders,
    setFeedbackFolders,
    space
  )

  useSpaceUpdateEffect(supabase, user, spaceCurrent, setSpaceCurrent)

  useSchedulesUpdateEffect(supabase, user, space, schedules, setSchedules)

  useFolderChangeEffect(
    supabase,
    user,
    changeFolders,
    setFolders,
    filters,
    sorting,
    folderStore,
    space,
    postbox,
    postboxFolders,
    postboxLastFetched,
    transient,
    transientFolders,
    schedule,
    feedback,
    feedbackFolders,
    path
  )

  useFileChangeEffect(
    supabase,
    user,
    setFiles,
    filters,
    sorting,
    fileStore,
    space,
    feedbackFiles,
    path
  )

  usePathChangeEffect(
    supabase,
    setPath,
    space,
    postbox,
    postboxFolders,
    postboxReceive,
    transient,
    transientFolders,
    feedback,
    feedbackFolders,
    feedbackGive
  )

  usePostboxChangeEffect(supabase, postbox, setPostboxFolders, space)
  useTransientChangeEffect(
    supabase,
    transient,
    setTransientFolders,
    space,
    schedule
  )
  useFeedbackChangeEffect(
    supabase,
    feedback,
    setFeedbackFolders,
    setFeedbackFiles,
    space
  )
  useSchedulesChangeEffect(schedules, setSchedule)
  if (postbox && !postboxSend && !postboxReceive) return
  return (
    <FilesContext.Provider
      value={{
        searchFiles,
        mode,
        setMode,
        path,
        setPath,
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
        space: spaceCurrent,
        postbox,
        postboxSend,
        postboxReceive,
        transient,
        transientPost,
        transientAccess,
        transientFolders,
        setTransientFolders,
        schedule,
        setSchedule,
        schedules,
        setSchedules,
        feedback,
        feedbackGet,
        feedbackGive,
        feedbackFolders,
        setFeedbackFolders,
        feedbackFiles,
        setFeedbackFiles,
      }}
    >
      {children}
    </FilesContext.Provider>
  )
}
