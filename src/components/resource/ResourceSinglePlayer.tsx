import { ArrowDownToLine, Pause, Play } from 'lucide-react'
import { Progress } from '../ui/progress'
import isObject from '@/lib/isObject'
import { download } from '../chat/functions/download'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/state/store'
import { useEffect, useRef, useState } from 'react'
import { AudioState, setMaster } from '@/state/audio/audioSlice'
import {
  setTimeRemaining as setTimeRemainingAction,
  setProgress as setProgressAction,
} from '@/state/audio/audioSlice'
import { handleExternalProgressClick } from '../audio/functions/handleExternalProgressClick'
import { handlePlay } from '../audio/functions/handlePlay'
import { handleProgressClick } from '../audio/functions/handleProgressClick'
import { getFileFromId } from '../dashboard/resources/manage/functions/getFileFromId'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getUserFromId } from '../files/functions/getUserFromId'
import { useResourceContext } from './context/resourceContext'
interface ResourceSinglePlayerProps {
  resource: Resource
}

export default function ResourceSinglePlayer() {
  const { resource } = useResourceContext()
  const audio: AudioState = useSelector((state: RootState) => state.audio)
  //const audioFile = new Audio(file.fileUrl); add s3 to get file
  const supabase = createClientComponentClient()
  const [audioFile, setAudioFile] = useState<HTMLAudioElement>()
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [mouseX, setMouseX] = useState(0)
  const [file, setFile] = useState<FileData | null>(null)
  const [otherUser, setOtherUser] = useState<User | null>(null)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const progressRef = useRef<HTMLDivElement | null>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!audioFile) setAudioFile(new Audio('/audio.mp3'))
  }, [])

  useEffect(() => {
    async function setData() {
      if (resource.previewId)
        setFile(await getFileFromId(supabase, resource.previewId))
      if (resource.user)
        setOtherUser(await getUserFromId(supabase, resource.user))
    }
    setData()
  }, [])

  useEffect(() => {
    while (isDragging) {
      if (progressRef.current) {
        const rect = progressRef.current.getBoundingClientRect()
        const x = mouseX - rect.left // x position within the element
        const width = rect.right - rect.left // width of the element
        const percentage = x / width // percentage of the clicked position in the element
        setProgress(percentage * 100)
      }
    }
  }, [isDragging])

  useEffect(() => {
    if (!file || !audioFile) return
    if (audio.fileData && audio.fileData.id !== file.id) {
      audioFile.pause()
      setIsPlaying(false)
    } else if (audio.fileData && audio.fileData.id === file.id) {
      setIsPlaying(audio.isPlaying)
      if (
        (audio.progress - progress > 5 || audio.progress - progress < -5) &&
        audio.master
      ) {
        handleExternalProgressClick(audioFile, audio.progress)
      }
      setProgress(audio.progress)
      setTimeRemaining(audio.timeRemaining)
      if (audio.isPlaying) {
        audioFile.play()
      } else {
        audioFile.pause()
      }
    }
  }, [audio, file])

  useEffect(() => {
    if (!file || !audioFile) return
    audioFile.addEventListener('loadedmetadata', () => {
      setTimeRemaining(audioFile.duration)
      if (audio.fileData && audio.fileData.id === file.id) {
        dispatch(setTimeRemainingAction(audioFile.duration))
      }
    })
  }, [audioFile, file])

  useEffect(() => {
    if (!file || !audioFile) return
    audioFile.addEventListener('timeupdate', () => {
      setProgress((audioFile.currentTime / audioFile.duration) * 100)
      setTimeRemaining(audioFile.duration - audioFile.currentTime)
      if (audio.fileData && audio.fileData.id === file.id) {
        dispatch(
          setProgressAction((audioFile.currentTime / audioFile.duration) * 100)
        )
        dispatch(
          setTimeRemainingAction(audioFile.duration - audioFile.currentTime)
        )
      }

      if (audioFile.currentTime === audioFile.duration) {
        setIsPlaying(false)
        audioFile.pause()
        audioFile.currentTime = 0
      }
    })
  }, [file])

  if (
    !isObject(file) ||
    !resource.previewUrl ||
    !resource.previewId ||
    !otherUser
  )
    return null
  return (
    <div className="flex w-full items-center gap-x-2">
      <button
        onClick={() => {
          handlePlay(
            audio,
            dispatch,
            isPlaying,
            setIsPlaying,
            otherUser,
            file,
            progress,
            audioFile,
            'https://github.com/shadcn.png', //user.imageUrl
            timeRemaining,
            audioFile ? audioFile.duration : undefined
          )
        }}
      >
        {!isPlaying ? <Play fill="#FFF"></Play> : <Pause fill="#FFF"></Pause>}
      </button>
      <Progress
        value={progress}
        className="w-full cursor-pointer bg-zinc-700"
        foregroundClasses="bg-zinc-400"
        onClick={(e) =>
          handleProgressClick(e, audioFile, progressRef, dispatch)
        }
        ref={progressRef}
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}
        onMouseMove={(e) => {
          if (isMouseDown && progressRef.current) {
            dispatch(setMaster(false))
            const rect = progressRef.current.getBoundingClientRect()
            const x = e.clientX - rect.left // x position within the element
            const width = rect.right - rect.left // width of the element
            const percentage = x / width // percentage of the clicked position in the element
            setProgress(percentage * 100)
          }
        }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
      ></Progress>
      <p className="min-w-12">
        {typeof timeRemaining === 'number'
          ? new Date(timeRemaining * 1000).toISOString().substr(14, 5)
          : '00:00'}
      </p>
    </div>
  )
}
