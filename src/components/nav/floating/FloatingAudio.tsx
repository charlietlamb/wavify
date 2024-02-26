import { Button } from '@/components/ui/button'
import { PopoverContent } from '@/components/ui/popover'
import { AudioState, setMaster } from '@/state/audio/audioSlice'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { handleClickAudioNav } from '../functions/handleClickAudioNav'
import { Pause, Play } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import {
  setProgress as setProgressAction,
  setTimeRemaining as setTimeRemainingAction,
} from '@/state/audio/audioSlice'
import Marquee from 'react-fast-marquee'
import { floatingPopoverClassName } from './floatingData'

interface FloatingAudioProps {
  audio: AudioState
  isPlaying: boolean
  setIsPlaying: Dispatch<SetStateAction<boolean>>
}

export default function FloatingAudio({
  audio,
  isPlaying,
  setIsPlaying,
}: FloatingAudioProps) {
  const audioStore = useRef<AudioState>(audio)
  const [progress, setProgress] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const progressRef = useRef<HTMLDivElement | null>(null)
  const dispatch = useDispatch()
  const router = useRouter()
  useEffect(() => {
    //working on audio and rendering chat
    if (!audio.fileData) return
    setIsPlaying(audio.isPlaying)
    setTimeRemaining(audio.timeRemaining)
    setProgress(audio.progress)
    audioStore.current = audio
    if (
      (audioStore.current &&
        audioStore.current.fileData &&
        audio.fileData.id !== audioStore.current.fileData.id) ||
      !audioStore.current.fileData
    ) {
      //set user and pp
    }
  }, [audio])

  return (
    <PopoverContent side="left" className={floatingPopoverClassName}>
      {audio.fileData ? (
        <div className="flex flex-col gap-y-2 overflow-hidden">
          <div className="flex gap-x-2">
            <Image
              src={/*audio.imageSrc*/ 'https://github.com/shadcn.png'}
              alt="artist"
              width={1024}
              height={1024}
              className="h-[4rem] w-[4rem] rounded-lg hover:rounded-md"
            ></Image>
            <div className="items-left flex max-w-full flex-grow flex-col justify-center text-left">
              <Button
                variant="link"
                className="h-auto justify-start overflow-hidden whitespace-nowrap p-0 text-left text-zinc-400 "
                onClick={() => router.push(`/user/${audio.user?.username}`)}
              >
                @{audio.user?.username}
              </Button>
              <Marquee pauseOnHover direction={'left'}>
                <h3 className="text-m font-bold">
                  {audio.fileData.name}
                  <span className="text-zinc-500">{' \u00A0|\u00A0 '}</span>
                </h3>
              </Marquee>
            </div>
          </div>
          <div className="flex w-full items-center gap-x-2">
            <button
              onClick={() =>
                handleClickAudioNav(dispatch, isPlaying, setIsPlaying)
              }
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
              onClick={(e) => {
                if (!progressRef.current) return
                dispatch(setMaster(true))
                const rect = progressRef.current.getBoundingClientRect()
                const x = e.clientX - rect.left // x position within the element
                const width = rect.right - rect.left // width of the element
                const percentage = x / width // percentage of the clicked position in the element
                setProgress(percentage * 100)
                dispatch(setProgressAction(percentage * 100))
                setTimeRemaining(audio.duration - percentage * audio.duration)
                dispatch(
                  setTimeRemainingAction(
                    audio.duration - percentage * audio.duration
                  )
                )
              }}
              ref={progressRef}
              onMouseDown={() => setIsMouseDown(true)}
              onMouseUp={() => setIsMouseDown(false)}
              onMouseMove={(e) => {
                if (isMouseDown && progressRef.current) {
                  dispatch(setMaster(true))
                  const rect = progressRef.current.getBoundingClientRect()
                  const x = e.clientX - rect.left // x position within the element
                  const width = rect.right - rect.left // width of the element
                  const percentage = x / width // percentage of the clicked position in the element
                  setProgress(percentage * 100)
                  dispatch(setProgressAction(percentage * 100))
                  setTimeRemaining(audio.duration - percentage * audio.duration)
                  dispatch(
                    setTimeRemainingAction(
                      audio.duration - percentage * audio.duration
                    )
                  )
                }
              }}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
            ></Progress>
            <p className="min-w-12">
              {new Date(timeRemaining * 1000).toISOString().substr(14, 5)}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-y-2">
          <h3 className="text-md font-bold">
            Looks like you're not playing anything right now...
          </h3>
          <Button>Find Beats</Button>
        </div>
      )}
    </PopoverContent>
  )
}
