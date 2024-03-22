'use client'

import * as React from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { addDays, format } from 'date-fns'
import { DateRange } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function DashboardCalendar({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })

  return (
    <div className={cn('grid h-full gap-2', className)}>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            id="date"
            variant="zinc_outline"
            className={cn(
              'h-full w-auto justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="h-6 w-6 lg:mr-2 lg:h-5 lg:w-5" />
            <div className="hidden lg:flex">
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'LLL dd, y')} -{' '}
                    {format(date.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(date.from, 'LLL dd, y')
                )
              ) : (
                <span>Pick a date</span>
              )}
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="w-auto max-w-none p-0">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            classNames={{
              day_selected:
                'bg-zinc-200 hover:text-zinc-950 hover:bg-zinc-100 text-zinc-950',
            }}
            style={{ width: '100%' }}
          />
        </DialogContent>
        <DialogClose hidden />
      </Dialog>
    </div>
  )
}
