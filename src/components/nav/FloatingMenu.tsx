'use client'

import { Speaker, UserRound } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import FloatingAudio from './floating/FloatingAudio'
import { useSelector } from 'react-redux'
import { AudioState } from '@/state/audio/audioSlice'
import { RootState } from '@/state/store'
import { MutableRefObject, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { FloatingState } from '@/state/floating/floatingSlice'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { useRouter } from 'next/navigation'
import ButtonLoader from '../me/ButtonLoader'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function FloatingMenu({
  constraintsRef,
}: {
  constraintsRef: MutableRefObject<HTMLDivElement | null>
}) {
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
  const [signOutLoading, setSignOutLoading] = useState(false)
  const menuButtonClassName: string = 'm-0 w-full p-0 h-auto'
  return (
    <AnimatePresence>
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragMomentum={false}
        whileDrag={{ scale: 1.1 }}
        className={cn(
          'pointer-events-auto absolute right-4 top-4 z-50 flex cursor-grab flex-col gap-y-2 rounded-xl border-2 border-zinc-400 bg-background p-2 shadow-md shadow-zinc-100/20 transition-all active:cursor-grabbing',
          !open && 'pointer-events-none'
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        exit={{ opacity: 0 }}
        style={{ touchAction: 'none' }}
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
            <Separator className="my-1" />
            <Button
              variant="ghost"
              onClick={() => router.push('/files')}
              className={menuButtonClassName}
            >
              Files
            </Button>
            <Separator className="my-1" />
            <ButtonLoader
              onClick={() => {
                setSignOutLoading(true)
                supabase.auth.signOut()
                setSignOutLoading(false)
              }}
              className="m-0 h-8 w-full p-0"
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
    </AnimatePresence>
  )
}
