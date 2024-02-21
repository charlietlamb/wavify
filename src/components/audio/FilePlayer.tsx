import { ArrowDownToLine, Pause, Play } from 'lucide-react'
import { Progress } from '../ui/progress'
import isObject from '@/lib/isObject'
import { download } from '../chat/functions/download'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/state/store'
import { handlePlay } from './functions/handlePlay'
import { useEffect, useRef, useState } from 'react'
import { AudioState, setMaster } from '@/state/audio/audioSlice'
import { handleProgressClick } from './functions/handleProgressClick'
import {
  setTimeRemaining as setTimeRemainingAction,
  setProgress as setProgressAction,
} from '@/state/audio/audioSlice'
import { handleExternalProgressClick } from './functions/handleExternalProgressClick'
interface FilePlayerProps {
  file: FileData
  otherUser: User
}

export default function FilePlayer({ file, otherUser }: FilePlayerProps) {
  const audio: AudioState = useSelector((state: RootState) => state.audio)
  //const audioFile = new Audio(file.fileUrl); add s3 to get file
  const [audioFile, setAudioFile] = useState(new Audio('/audio.mp3'))
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [mouseX, setMouseX] = useState(0)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const progressRef = useRef<HTMLDivElement | null>(null)
  const dispatch = useDispatch()

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
    if (audio.fileData && audio.fileData.fileId !== file.fileId) {
      audioFile.pause()
      setIsPlaying(false)
    } else if (audio.fileData && audio.fileData.fileId === file.fileId) {
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
    audioFile.addEventListener('loadedmetadata', () => {
      setTimeRemaining(audioFile.duration)
      if (audio.fileData && audio.fileData.fileId === file.fileId) {
        dispatch(setTimeRemainingAction(audioFile.duration))
      }
    })
  }, [audioFile])

  useEffect(() => {
    audioFile.addEventListener('timeupdate', () => {
      setProgress((audioFile.currentTime / audioFile.duration) * 100)
      setTimeRemaining(audioFile.duration - audioFile.currentTime)
      if (audio.fileData && audio.fileData.fileId === file.fileId) {
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
    <div className="flex flex-col gap-y-2 pr-4">
      <div>
        <div className="flex justify-between">
          <h3 className="text-lg font-bold">{file.fileName}</h3>
          <button
            onClick={() => {
              download(file.fileUrl, file.fileName)
            }}
          >
            <ArrowDownToLine></ArrowDownToLine>
          </button>
        </div>
        <p className="text-sm">{file.fileSize.toFixed(2) + ' MB'}</p>
      </div>
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
              'https://github.com/shadcn.png', //user.profile_pic_url
              timeRemaining,
              audioFile.duration
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
    </div>
  )
}
