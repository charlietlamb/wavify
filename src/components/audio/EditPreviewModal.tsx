import { useEffect, useRef, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import ButtonLoader from '@/components/utils/ButtonLoader'
import { useModal } from '../../../hooks/use-modal-store'
import { Progress } from '../ui/progress'
import { AudioState, setMaster } from '@/state/audio/audioSlice'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import Marquee from 'react-fast-marquee'
import { handlePlay } from './functions/handlePlay'
import { Pause, Play } from 'lucide-react'
import { getUserFromUsername } from '../files/functions/getUserFromUsername'
import { handleProgressClick } from './functions/handleProgressClick'
import {
  setTimeRemaining as setTimeRemainingAction,
  setProgress as setProgressAction,
} from '@/state/audio/audioSlice'
import { handleExternalProgressClick } from './functions/handleExternalProgressClick'

export const EditPreviewModal = () => {
  const audio: AudioState = useAppSelector((state: RootState) => state.audio)

  const { isOpen, onClose, type, data } = useModal()
  const [loading, setLoading] = useState(false)
  const supabase = createClientComponentClient()
  const [error, setError] = useState<string | null>(null)
  const { file: initFile } = data
  const file = initFile ? { ...initFile, id: 'p:' + initFile.id } : undefined
  const [otherUser, setOtherUser] = useState<User>()
  const [fileName, setFileName] = useState(file ? file.name : '')
  const isModalOpen = isOpen && type === 'editPreview'
  //const audioFile = new Audio(file.fileUrl); add s3 to get file
  const [audioFile, setAudioFile] = useState(new Audio('/audio.mp3'))
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [mouseX, setMouseX] = useState(0)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const progressRef = useRef<HTMLDivElement | null>(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function getUser() {
      if (file && file.user) {
        setProgress(file.preview)
        if (file.users.username)
          setOtherUser(await getUserFromUsername(supabase, file.users.username))
      }
    }
    getUser()
  }, [isModalOpen])

  useEffect(() => {
    setFileName(file ? file.name : '')
  }, [file])

  const handleClose = () => {
    onClose()
  }

  const onSubmit = async () => {
    setLoading(true)
    try {
      if (!file) throw new Error('File not found')
      const { error } = await supabase
        .from('files')
        .update({ preview: progress })
        .eq('id', file.id.split(':')[1])
      if (error) throw error
    } catch (error) {
      console.error(error)
    } finally {
      handleClose()
      setLoading(false)
    }
  }

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
  }, [isDragging, file])

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
  }, [audio, file])

  useEffect(() => {
    if (!file) return
    audioFile.addEventListener('loadedmetadata', () => {
      setTimeRemaining(audioFile.duration)
      if (audio.fileData && audio.fileData.id === file.id) {
        dispatch(setTimeRemainingAction(audioFile.duration))
      }
    })
  }, [audioFile, file])

  useEffect(() => {
    if (!file) return
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
  if (!file) return null
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-hidden p-0">
        <DialogHeader className="px-6 pt-4">
          <DialogTitle className="text-left text-2xl font-bold">
            Edit File Preview
          </DialogTitle>
          <DialogDescription className="text-left text-zinc-400">
            Edit your file preview start time and click save to update. Wherever
            you leave the progress bar is where the preview will start.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-2 px-6">
          <Marquee pauseOnHover direction={'left'}>
            <h3 className="text-m font-bold">
              {file.name}
              <span className="text-zinc-500">{' \u00A0|\u00A0 '}</span>
            </h3>
          </Marquee>
          <div className="flex items-center gap-x-1">
            <button
              onClick={() => {
                if (otherUser)
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
              {!isPlaying ? (
                <Play fill="#FFF"></Play>
              ) : (
                <Pause fill="#FFF"></Pause>
              )}
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
            <p className="min-w-12 font-bold">
              {typeof audioFile.currentTime === 'number'
                ? new Date(audioFile.currentTime * 1000)
                    .toISOString()
                    .substr(14, 5)
                : '00:00'}
            </p>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <DialogFooter className="px-6 py-4 ">
          <ButtonLoader
            disabled={loading}
            onClick={onSubmit}
            isLoading={loading}
            text="Save"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
