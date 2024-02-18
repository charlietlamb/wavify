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

export default function FloatingMenu({ user }: { user: User }) {
  const audio: AudioState = useSelector((state: RootState) => state.audio)
  const floating: FloatingState = useSelector(
    (state: RootState) => state.floating
  )
  const [open, setOpen] = useState(floating.open)
  const [isPlaying, setIsPlaying] = useState(audio.isPlaying)
  useEffect(() => {
    setOpen(floating.open)
  }, [floating])

  return (
    <AnimatePresence>
      {!open ? null : (
        <motion.div
          className="absolute right-4 top-4 z-50 flex flex-col gap-y-2 rounded-xl border-2 border-zinc-400 bg-background p-2 shadow-md shadow-zinc-100/20 transition-all"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <Popover>
            <PopoverTrigger className="flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-xl border-2 border-zinc-500 bg-zinc-950 p-2 text-zinc-400 shadow-md transition-all hover:rounded-lg hover:border-zinc-200 hover:text-zinc-200">
              <UserRound className="h-[1.5rem] w-[1.5rem] transition-all" />
            </PopoverTrigger>
            <PopoverContent side="left"></PopoverContent>
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
