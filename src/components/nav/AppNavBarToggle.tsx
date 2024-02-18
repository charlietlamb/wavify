'use client'

import { FloatingState } from '@/state/floating/floatingSlice'
import { RootState } from '@/state/store'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setOpen as setOpenAction } from '@/state/floating/floatingSlice'
import { PackageOpen, Package } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AppNavBarToggle() {
  const floating: FloatingState = useSelector(
    (state: RootState) => state.floating
  )
  const dispatch = useDispatch()
  const [open, setOpen] = useState(floating.open)
  return (
    <button
      onClick={() => {
        setOpen(!open)
        dispatch(setOpenAction(!open))
      }}
      className="rounded-md p-1 text-zinc-300 transition-all hover:bg-zinc-800"
    >
      {open ? (
        <motion.div
          key="Package"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Package />
        </motion.div>
      ) : (
        <motion.div
          key="PackageOpen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PackageOpen />
        </motion.div>
      )}
    </button>
  )
}
