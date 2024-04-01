import { cn } from '@/lib/utils'

export default function Wavify({
  className,
  fill = '#E4E4E7',
}: {
  className: string
  fill?: string
}) {
  return (
    <svg
      viewBox="0 0 200 107"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-auto w-auto', className)}
    >
      <path
        d="M111.1 66.0126L128.704 0H160L128.704 106.667H97.9951L80.1956 44.2767L62.0049 106.667H31.2958L0 0H31.2958L48.8998 66.0126L67.0905 0H92.9095L111.1 66.0126Z"
        fill={fill}
      />
      <path
        d="M151.1 66.0126L168.704 0H200L168.704 106.667H137.995L120.196 44.2767L102.005 106.667H71.2958L40 0H71.2958L88.8998 66.0126L107.09 0H132.91L151.1 66.0126Z"
        fill={fill}
      />
    </svg>
  )
}
