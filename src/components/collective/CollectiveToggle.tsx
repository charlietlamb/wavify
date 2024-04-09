'use client'

import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { setCollective } from '@/state/sidebar/sidebarSlice'
import { RootState } from '@/state/store'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function CollectiveToggle() {
  const dispatch = useAppDispatch()
  const { collective } = useAppSelector((state: RootState) => state.sidebar)
  const chevronClassName = 'text-zinc-200'
  return (
    <button
      className="absolute left-0 top-1/2 z-50 hidden -translate-y-1/2 transform rounded-r-lg bg-zinc-700 py-1 md:flex"
      onClick={() => dispatch(setCollective(!collective))}
    >
      {collective ? (
        <ChevronLeft className={chevronClassName} />
      ) : (
        <ChevronRight className={chevronClassName} />
      )}
    </button>
  )
}
