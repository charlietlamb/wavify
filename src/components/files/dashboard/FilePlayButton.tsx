import { FastForward, Pause, Play } from 'lucide-react'
import isObject from '@/lib/isObject'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/state/store'
import { useEffect, useRef, useState } from 'react'
import { AudioState } from '@/state/audio/audioSlice'
import {
  setTimeRemaining as setTimeRemainingAction,
  setProgress as setProgressAction,
} from '@/state/audio/audioSlice'
import { handleExternalProgressClick } from '@/components/audio/functions/handleExternalProgressClick'
import { handlePlay } from '@/components/audio/functions/handlePlay'
import { getUserFromUsername } from '../functions/getUserFromUsername'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { cn } from '@/lib/utils'
import { useUser } from '@/state/user/useUser'
import getFileUrlS3 from '../functions/getFileUrlS3'
interface FilePlayerProps {
  file: FileAndSender
  className?: string
  preview?: boolean
}

export default function FilePlayButton({
  file: initFile,
  className,
  preview = false,
}: FilePlayerProps) {
  const audio: AudioState = useSelector((state: RootState) => state.audio)
  const file =
    initFile && preview
      ? { ...initFile, id: 'pr:' + initFile.id }
      : initFile
        ? initFile
        : undefined
  //const audioFile = new Audio(file.fileUrl); add s3 to get file
  const user = useUser()
  const supabase = createClientComponentClient()
  const [audioFile, setAudioFile] = useState<HTMLAudioElement>()
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(preview && file ? file.preview : 0)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [mouseX, setMouseX] = useState(0)
  const progressRef = useRef<HTMLDivElement | null>(null)
  const dispatch = useDispatch()
  const [otherUser, setOtherUser] = useState<User>()

  useEffect(() => {
    async function getData() {
      if (!file) return
      if (!audioFile) setAudioFile(new Audio(await getFileUrlS3(file.url)))
    }
    getData()
  }, [])

  useEffect(() => {
    async function getUser() {
      if (file && file.users && file.users.username) {
        setOtherUser(await getUserFromUsername(supabase, file.users.username))
      } else {
        setOtherUser(user)
      }
    }
    getUser()
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
  }, [audio])

  useEffect(() => {
    if (!file || !audioFile) return
    audioFile.addEventListener('loadedmetadata', () => {
      setTimeRemaining(audioFile.duration)
      if (audio.fileData && audio.fileData.id === file.id) {
        dispatch(setTimeRemainingAction(audioFile.duration))
      }
    })
  }, [audioFile])

  useEffect(() => {
    if (!file || !audioFile) return
    if (preview) {
      const onCanPlayThrough = () => {
        audioFile.currentTime = audioFile.duration * (file.preview / 100)
        audioFile.removeEventListener('canplaythrough', onCanPlayThrough)
      }

      audioFile.addEventListener('canplaythrough', onCanPlayThrough)
    }
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
  })

  if (!isObject(file)) return null
  return (
    <button
      onClick={() => {
        if (otherUser) {
          audioFile &&
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
              audioFile.duration
            )
        }
      }}
    >
      {isPlaying ? (
        <Pause className={cn('text-zinc-200', className)} />
      ) : !!file.preview && preview ? (
        <FastForward className={cn('text-zinc-200', className)} />
      ) : (
        <Play className={cn('text-zinc-200', className)} />
      )}
    </button>
  )
}
