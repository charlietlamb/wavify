import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { colorVariants } from '@nextui-org/react'
import Spinner from './Spinner'

export default function ButtonLoader({
  isLoading,
  onClick,
  text,
  className,
  disabled,
  variant,
}: {
  isLoading: boolean
  onClick: () => void
  text: string
  className?: string
  disabled?: boolean
  variant?:
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'primary'
    | 'zinc'
    | 'zinc_outline'
    | null
    | undefined
}) {
  return (
    <Button
      onClick={onClick}
      className={cn('w-full', className)}
      variant={!variant ? 'default' : variant}
      disabled={disabled}
    >
      {!isLoading ? (
        `${text}`
      ) : (
        <Spinner color={variant === 'zinc' ? '#09090B' : '#E4E4E7'} />
      )}
    </Button>
  )
}
