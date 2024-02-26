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
      className="absolute left-0 top-1/2 z-50 -translate-y-1/2 transform rounded-r-lg bg-zinc-600 py-2"
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
