import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { colorVariants } from '@nextui-org/react'

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
        <svg
          width="100%" // Make the SVG the same width as the text
          height="24"
          stroke={!variant ? '#0f0f0f' : '#fff'}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="spinner"
        >
          <g>
            <circle
              cx="12"
              cy="12"
              r="9.5"
              fill="none"
              strokeWidth="3"
            ></circle>
          </g>
        </svg>
      )}
    </Button>
  )
}