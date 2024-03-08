import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog' // import Dialog components instead of Popover
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateTimePicker } from './timePicker/DateTimePicker'

export default function DTPopover({
  date,
  setDate,
  text,
}: {
  date: Date | undefined
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
  text?: string
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
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
            <span>{text ? text : 'Pick a date'}</span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
        <div className="border-t border-border p-3">
          <DateTimePicker setDate={setDate} date={date} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
