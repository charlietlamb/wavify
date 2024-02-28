'use client'

import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import FilesSidebar from './FilesSidebar'
import { useFilesContext } from '../state/context'

export default function FilesSidebarWrap() {
  const { space } = useFilesContext()
  const { files: filesState } = useAppSelector(
    (state: RootState) => state.sidebar
  )
  if (space) return null
  return (
    <motion.div
      animate={{ width: filesState ? '0px' : '15rem' }}
      className={cn(
        'hidden h-full flex-col border-r-2 border-zinc-600 md:flex',
        filesState && 'border-0'
      )}
    >
      <FilesSidebar />
    </motion.div>
  )
}
