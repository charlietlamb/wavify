'use client'

import { useEffect, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import ButtonLoader from '@/components/utils/ButtonLoader'
import { useModal } from '../../../../hooks/use-modal-store'
import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format, set } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateTimePicker } from './timePicker/DateTimePicker'
import { updateTransientTimer } from './functions/updateTransientTimer'

export const UpdateTimerModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const isModalOpen = isOpen && type === 'updateTimer'
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState<Date>()
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()
  const { space, schedule } = data
  const onClick = async () => {
    if (date && space) {
      setIsLoading(true)
      await updateTransientTimer(
        supabase,
        undefined,
        undefined,
        undefined,
        undefined,
        setError
      )
      setIsLoading(false)
      onClose()
    }
  }

  useEffect(() => {
    if (isModalOpen && schedule) {
      setDate(new Date(schedule.end)) // Convert string to Date object
    }
  }, [isModalOpen])

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden p-0 ">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-left text-2xl font-bold">
            Update Transient Timer
          </DialogTitle>
          <DialogDescription className="text-left text-zinc-400">
            You can change this at any time, content will not be accessible when
            the timer is up.
          </DialogDescription>
          {/* add a timer and a date where they can see when the transient will expire */}
          <div className="flex flex-col">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    format(date, 'PPP HH:mm:ss')
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" side="left">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
                <div className="border-t border-border p-3">
                  <DateTimePicker setDate={setDate} date={date} />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </DialogHeader>
        <DialogFooter className="px-6 py-4 ">
          <div className="flex w-full items-center justify-between">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <ButtonLoader
              isLoading={isLoading}
              onClick={onClick}
              text="Confirm"
            ></ButtonLoader>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
