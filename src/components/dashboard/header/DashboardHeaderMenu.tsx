import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import { views } from '../data/data'
import { cn } from '@/lib/utils'

export default function DashboardHeaderMenu({
  vertical = false,
  onClose,
}: {
  vertical?: boolean
  onClose?: () => void
}) {
  const { view, mode } = useParams()
  const router = useRouter()

  const linkClassName = ''

  return (
    <div
      className={cn(
        'hidden gap-x-1 lg:flex',
        vertical && 'flex flex-col items-start gap-y-2 text-left lg:flex-col'
      )}
    >
      {views.map((v) => (
        <Button
          variant="zinc_link"
          className={cn(linkClassName, view === v && 'text-zinc-200 underline')}
          onClick={() => {
            view !== v && router.push(`/dashboard/${v}/${mode}`)
            if (onClose) onClose()
          }}
        >
          {v.slice(0, 1).toUpperCase() + v.slice(1).toLowerCase()}
        </Button>
      ))}
    </div>
  )
}
