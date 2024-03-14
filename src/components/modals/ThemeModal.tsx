'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { useModal } from '../../../hooks/use-modal-store'
import ButtonLoader from '../utils/ButtonLoader'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { PopoverPicker } from '../utils/PopoverPicker'
import { hexToHSL } from '../nav/functions/hexToHSL'
import { isHSL } from '../nav/functions/isHSL'
import { setUserColor } from './functions/setUserColor'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { hslToHex } from '../nav/functions/hslToHex'
export default function ThemeModal() {
  const supabase = createClientComponentClient()
  const { onOpen, isOpen, onClose, type, data } = useModal()
  const isModalOpen = isOpen && type === 'theme'
  const { user } = data
  const [isLoading, setIsLoading] = useState(false)
  const [color, setColor] = useState(user ? user.color : '#facc15')
  const [hsl, setHsl] = useState(user ? user.color : '48 96% 53%')
  const [init, setInit] = useState(false)
  const swatches = [
    '48 96% 53%',
    '138 96% 53%',
    '183 96% 53%',
    '228 96% 53%',
    '273 96% 53%',
    '318 96% 53%',
    '363 96% 53%',
    '22 96% 53%',
  ]
  function onClick() {
    setIsLoading(true)
    if (isHSL(hsl)) {
      if (!user) return null
      setUserColor(supabase, user, hsl)
    }
    setIsLoading(false)
    handleClose(true)
  }

  function handleClose(changed: boolean) {
    if (!changed && user) {
      document.documentElement.style.setProperty('--primary', user.color)
    }
    onClose()
  }

  function swatchClick(swatch: string) {
    setHsl(swatch)
    document.documentElement.style.setProperty('--primary', swatch)
  }

  useEffect(() => {
    const hslColor = hexToHSL(color)
    if (!isHSL(hslColor)) return
    setHsl(hslColor)
    if (init) document.documentElement.style.setProperty('--primary', hslColor)
    setInit(true)
  }, [color])

  useEffect(() => {
    if (user && isModalOpen) {
      document.documentElement.style.setProperty('--primary', user.color)
      setColor(hslToHex(user.color))
    }
  }, [isModalOpen])

  return (
    <Dialog open={isModalOpen} onOpenChange={() => handleClose(false)}>
      <DialogContent className="overflow-hidden px-6 pt-4">
        <DialogHeader>
          <DialogTitle className="text-left text-2xl font-bold">
            Edit Theme
          </DialogTitle>
          <DialogDescription className="text-left text-zinc-400">
            Make Wavify your own.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-start gap-x-2">
          {swatches.map((swatch) => (
            <button
              key={swatch}
              className="flex min-h-10 min-w-10 justify-end rounded-md border-2 border-white"
              style={{ backgroundColor: hslToHex(swatch) }}
              onClick={() => swatchClick(swatch)}
            ></button>
          ))}
        </div>
        <div className="flex w-full items-center justify-start gap-x-4">
          <p className="text-lg font-semibold">Custom Theme:</p>
          <PopoverPicker
            color={color}
            onChange={setColor}
            className="border-2 border-zinc-300"
          />
        </div>
        <DialogFooter>
          <div className="flex w-full items-center justify-between gap-x-2">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <ButtonLoader
              isLoading={isLoading}
              onClick={onClick}
              text="Update Theme"
            ></ButtonLoader>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
