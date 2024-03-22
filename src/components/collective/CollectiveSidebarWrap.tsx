'use client'

import { useAppSelector } from '@/state/hooks'
import CollectiveSidebar from './CollectiveSidebar'
import { RootState } from '@/state/store'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function CollectiveSidebarWrap() {
  const { collective } = useAppSelector((state: RootState) => state.sidebar)
  return (
    <motion.div
      animate={{ width: collective ? '0px' : '15rem' }}
      className={cn(
        'hidden h-full flex-col border-r border-zinc-700 md:flex',
        collective && 'border-0'
      )}
    >
      <CollectiveSidebar />
    </motion.div>
  )
}
