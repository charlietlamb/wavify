'use client'

import { Speaker, UserRound } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import FloatingAudio from './floating/FloatingAudio'
import { useSelector } from 'react-redux'
import { AudioState } from '@/state/audio/audioSlice'
import { RootState } from '@/state/store'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { FloatingState } from '@/state/floating/floatingSlice'
import { motion, AnimatePresence } from 'framer-motion'
import { floatingPopoverClassName } from './floating/floatingData'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { useRouter } from 'next/navigation'
import ButtonLoader from '../me/ButtonLoader'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useUser } from '@/state/user/useUser'

export default function FloatingMenu({
  position,
  childRef,
  posInit,
  ...rest
}: {
  position: { x: number; y: number }
  childRef: React.RefObject<HTMLDivElement>
  posInit: boolean
}) {
  const user = useUser()
  const router = useRouter()
  const supabase = createClientComponentClient()
  const audio: AudioState = useSelector((state: RootState) => state.audio)
  const floating: FloatingState = useSelector(
    (state: RootState) => state.floating
  )
  const [open, setOpen] = useState(floating.open)
  const [isPlaying, setIsPlaying] = useState(audio.isPlaying)
  useEffect(() => {
    setOpen(floating.open)
  }, [floating])

  useEffect(() => {
    console.log(posInit)
  }, [posInit])
  const [signOutLoading, setSignOutLoading] = useState(false)
  const menuButtonClassName = 'm-0 w-full p-0 h-8'
  return (
    <AnimatePresence>
      {!open ? null : (
        <motion.div
          className="pointer-events-auto absolute top-4 z-50 flex cursor-grab flex-col gap-y-2 rounded-xl border-2 border-zinc-400 bg-background p-2 shadow-md shadow-zinc-100/20 transition-all active:cursor-grabbing"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            posInit ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
          }
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
          style={{ left: `${position.x}px`, top: `${position.y}px` }}
          {...rest}
          ref={childRef}
        >
          <Popover>
            <PopoverTrigger className="flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-xl border-2 border-zinc-500 bg-zinc-950 p-2 text-zinc-400 shadow-md transition-all hover:rounded-lg hover:border-zinc-200 hover:text-zinc-200">
              <UserRound className="h-[1.5rem] w-[1.5rem] transition-all" />
            </PopoverTrigger>
            <PopoverContent side="left" className="mr-3">
              <Button
                variant="ghost"
                onClick={() => router.push('/dashboard')}
                className={menuButtonClassName}
              >
                Dashboard
              </Button>
              <Separator className="my-2" />
              <Button
                variant="ghost"
                onClick={() => router.push('/files')}
                className={menuButtonClassName}
              >
                Files
              </Button>
              <Separator className="my-2" />
              <ButtonLoader
                onClick={() => {
                  setSignOutLoading(true)
                  supabase.auth.signOut()
                  setSignOutLoading(false)
                }}
                className={menuButtonClassName}
                text="Log Out"
                isLoading={signOutLoading}
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger className="flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-xl border-2 border-zinc-500 bg-zinc-950 p-2 text-zinc-400 shadow-md transition-all hover:rounded-lg hover:border-zinc-200 hover:text-zinc-200">
              <Speaker
                className={cn(
                  'h-[1.5rem] w-[1.5rem] transition-all',
                  isPlaying && 'animate-colorChange animate-bounce'
                )}
              />
            </PopoverTrigger>
            <FloatingAudio
              audio={audio}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            ></FloatingAudio>
          </Popover>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
