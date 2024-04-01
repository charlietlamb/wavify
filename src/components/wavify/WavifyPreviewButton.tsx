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
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { cn } from '@/lib/utils'
import { useUser } from '@/state/user/useUser'
import { getUserFromUsername } from '../files/functions/getUserFromUsername'
interface FilePlayerProps {
  file: FileAndSender
  className?: string
}

export default function WavifyPreviewButton({
  file: initFile,
  className,
}: FilePlayerProps) {
  const audio: AudioState = useSelector((state: RootState) => state.audio)
  const file = initFile
    ? { ...initFile, id: 'pr:' + initFile.id }
    : initFile
      ? initFile
      : undefined
  //const audioFile = new Audio(file.fileUrl); add s3 to get file
  const user = useUser()
  const supabase = createClientComponentClient()
  const [audioFile, setAudioFile] = useState(new Audio('/audio.mp3'))
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(file ? file.preview : 0)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [mouseX, setMouseX] = useState(0)
  const progressRef = useRef<HTMLDivElement | null>(null)
  const dispatch = useDispatch()
  const [otherUser, setOtherUser] = useState<User>()

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
    if (!file) return
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
    if (!file) return
    audioFile.addEventListener('loadedmetadata', () => {
      setTimeRemaining(audioFile.duration)
      if (audio.fileData && audio.fileData.id === file.id) {
        dispatch(setTimeRemainingAction(audioFile.duration))
      }
    })
  }, [audioFile])

  useEffect(() => {
    if (!file) return
    const onCanPlayThrough = () => {
      audioFile.currentTime = audioFile.duration * (file.preview / 100)
      audioFile.removeEventListener('canplaythrough', onCanPlayThrough)
    }

    audioFile.addEventListener('canplaythrough', onCanPlayThrough)
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
      onClick={(e) => {
        e.stopPropagation()
        if (otherUser) {
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
      ) : !!file.preview ? (
        <FastForward className={cn('text-zinc-200', className)} />
      ) : (
        <Play className={cn('text-zinc-200', className)} />
      )}
    </button>
  )
}
