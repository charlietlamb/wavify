'use client'

import { useEffect, useRef, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import ButtonLoader from '@/components/me/ButtonLoader'
import { useModal } from '../../../../hooks/use-modal-store'
import {
  ArrowBigLeftDash,
  CheckIcon,
  MoreHorizontal,
  Plus,
  Trash2,
} from 'lucide-react'
import { updateTransientTimer } from './functions/updateTransientTimer'
import TransientPost from './functions/transientPost'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import DTPopover from './DTPopover'
import { createScheduleFunction } from './functions/createScheduleFunction'
import { deleteSchedule } from './functions/deleteSchedule'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'

const timeFrames = [
  {
    name: 'custom',
    value: -1,
  },
  {
    name: 'day',
    value: 86400,
  },
  {
    name: 'week',
    value: 604800,
  },
  {
    name: 'month',
    value: 2592000,
  },
]

export const ScheduleModal = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal()
  const isModalOpen = isOpen && type === 'schedule'
  const [isLoading, setIsLoading] = useState(false)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [currentStartDate, setCurrentStartDate] = useState<Date>()
  const [currentEndDate, setCurrentEndDate] = useState<Date>()
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [mainError, setMainError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [scheduleId, setScheduleId] = useState('')
  const supabase = createClientComponentClient()
  const { space, schedule, schedules, setSchedules } = data
  const [currentSchedule, setCurrentSchedule] = useState(schedule)
  const [open, setOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const [timeFrameValue, setTimeFrameValue] = useState(-1)
  const [timeFrameOpen, setTimeFrameOpen] = useState(false)

  const onClick = async () => {
    if (currentEndDate && space) {
      setIsLoading(true)
      const success = await updateTransientTimer(
        supabase,
        currentStartDate,
        currentEndDate,
        currentSchedule,
        schedules,
        setMainError
      )
      setIsLoading(false)
      if (success) onClose()
    }
  }

  useEffect(() => {
    if (scheduleId) {
      const schedule = schedules?.find((schedule) => schedule.id === scheduleId)
      if (schedule) {
        setCurrentSchedule(schedule)
        setCurrentStartDate(new Date(schedule.start))
        setCurrentEndDate(new Date(schedule.end))
        setStartDate(new Date(schedule.start))
        setEndDate(new Date(schedule.end))
      }
    }
  }, [scheduleId])

  useEffect(() => {
    if (isModalOpen && schedule) {
      setStartDate(new Date(schedule.start))
      setEndDate(new Date(schedule.end))
      setCurrentStartDate(new Date(schedule.start))
      setCurrentEndDate(new Date(schedule.end))
      setCurrentSchedule(schedule)
    }
  }, [isModalOpen])

  useEffect(() => {
    if (startDate && timeFrameValue !== -1) {
      const date = new Date(startDate.getTime())
      if (timeFrameValue === 2592000) {
        const expectedMonth = (date.getMonth() + 1) % 12
        date.setMonth(date.getMonth() + 1)
        if (date.getMonth() !== expectedMonth) {
          date.setDate(0) // Set the date to the last day of the previous month
        }
      } else {
        date.setSeconds(date.getSeconds() + timeFrameValue)
      }
      setEndDate(date)
    }
  }, [timeFrameValue, startDate])

  function setStartRecent() {
    const recent = schedules?.reduce((prev, current) => {
      return prev.end > current.end ? prev : current
    })
    if (recent) {
      let date = new Date(recent.end)
      date.setSeconds(date.getSeconds() + 1)
      setStartDate(date)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden p-0 ">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-left text-2xl font-bold">
            Update Transient Schedules
          </DialogTitle>
          <DialogDescription className="text-left text-zinc-400">
            You can change this at any time, content will not be accessible when
            the timer is up.
          </DialogDescription>
          {/* add a timer and a date where they can see when the transient will expire */}
          <div className="flex flex-col gap-y-2">
            <div className="flex gap-x-2">
              <Select
                onValueChange={(e) => setScheduleId(e)}
                defaultValue={schedule?.id}
              >
                <SelectTrigger className="flex-grow">
                  <SelectValue placeholder="Schedule..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Array.isArray(schedules) ? (
                      schedules?.map((schedule) => {
                        return (
                          <SelectItem key={schedule.id} value={schedule.id}>
                            {schedule.name}
                          </SelectItem>
                        )
                      })
                    ) : (
                      <SelectLabel>No Schedules Created...</SelectLabel>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="text-zinc-200" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="flex min-w-[20rem] flex-col gap-y-4">
                  <Label className="text-left text-xl font-semibold">
                    Create a new schedule
                  </Label>
                  <Input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div className="flex gap-x-2">
                    <DTPopover
                      setDate={setStartDate}
                      date={startDate}
                      text="Set Start Date"
                    />
                    {schedules && !!schedules.length && (
                      <Button
                        variant="outline"
                        onClick={() => setStartRecent()}
                      >
                        <ArrowBigLeftDash className="text-zinc-200" />
                      </Button>
                    )}
                  </div>
                  <div className="flex gap-x-2">
                    <DTPopover
                      setDate={setEndDate}
                      date={endDate}
                      text="Set End Date"
                    />
                    {schedules && !!schedules.length && (
                      <Popover
                        open={timeFrameOpen}
                        onOpenChange={setTimeFrameOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={timeFrameOpen}
                          >
                            <MoreHorizontal className="text-zinc-200" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                              {timeFrames.map((timeFrame) => (
                                <CommandItem
                                  key={timeFrame.value}
                                  value={
                                    typeof timeFrame.value === 'number'
                                      ? timeFrame.value.toString()
                                      : ''
                                  }
                                  onSelect={(currentValue) => {
                                    setTimeFrameValue(Number(currentValue))
                                    setTimeFrameOpen(false)
                                  }}
                                >
                                  {timeFrame.name}
                                  <CheckIcon
                                    className={cn(
                                      'ml-auto h-4 w-4 transition-all',
                                      timeFrameValue === timeFrame.value
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    )}
                  </div>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <ButtonLoader
                    onClick={async () => {
                      const success = await createScheduleFunction(
                        supabase,
                        name,
                        startDate,
                        endDate,
                        space,
                        schedules,
                        setError,
                        setLoading
                      )
                      setOpen(!success)
                    }}
                    text="Create Schedule"
                    isLoading={loading}
                  />
                </DialogContent>
              </Dialog>
            </div>
            {space && currentSchedule && (
              <TransientPost spaceProp={space} scheduleProp={currentSchedule} />
            )}
            {currentSchedule && (
              <>
                <DTPopover
                  setDate={setCurrentStartDate}
                  date={currentStartDate}
                  text="Set Start Date"
                />
                <DTPopover
                  setDate={setCurrentEndDate}
                  date={currentEndDate}
                  text="Set End Date"
                />
                <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                  <Button
                    variant={'outline'}
                    className="group w-full justify-start text-left font-normal transition-all"
                    onClick={() => setDeleteOpen(true)}
                  >
                    <Trash2 className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                    <p className="group-hover:text-red-500">Delete Schedule</p>
                  </Button>
                  <DialogContent className="overflow-hidden p-0">
                    <DialogHeader className="px-6 pt-4">
                      <DialogTitle className="text-left text-2xl font-bold">
                        Delete Schedule
                      </DialogTitle>
                      <DialogDescription className="text-left text-zinc-400">
                        Are you sure you want to do this? This schedule will be
                        removed for all users
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="px-6 py-4">
                      <div className="flex w-full items-center justify-between gap-x-4">
                        <Button
                          disabled={isDeleteLoading}
                          onClick={onClose}
                          variant="ghost"
                          className="focus-visible:ring-0"
                        >
                          Cancel
                        </Button>
                        <ButtonLoader
                          disabled={isDeleteLoading}
                          onClick={() =>
                            deleteSchedule(
                              supabase,
                              currentSchedule,
                              schedules,
                              setSchedules,
                              setDeleteOpen,
                              setIsDeleteLoading
                            )
                          }
                          isLoading={isDeleteLoading}
                          text="Confirm"
                        />
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
          {mainError && <p className="text-sm text-red-500">{mainError}</p>}
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
