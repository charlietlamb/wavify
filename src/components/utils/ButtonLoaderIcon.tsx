import React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ButtonLoaderIconProps {
  onClick?: () => void
  isLoading?: boolean
  icon?: React.ReactNode
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
}

const ButtonLoaderIcon: React.FC<ButtonLoaderIconProps> = ({
  onClick,
  isLoading,
  icon,
  className,
  disabled,
  variant,
}) => {
  return (
    <Button
      onClick={onClick}
      className={cn('w-full', className)}
      variant={!variant ? 'default' : variant}
      disabled={disabled}
    >
      {isLoading ? (
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
      ) : (
        icon
      )}
    </Button>
  )
}

export default ButtonLoaderIcon
