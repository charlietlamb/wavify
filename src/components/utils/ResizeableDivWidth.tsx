import { useMeasure } from 'react-use'
import { motion, AnimatePresence } from 'framer-motion'
export default function ResizableDivWidth({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  let [ref, { width }] = useMeasure()

  return (
    <motion.div
      animate={{ width: width || 'auto' }}
      className="relative overflow-hidden"
    >
      <AnimatePresence initial={false}>
        <motion.div ref={ref as unknown as React.RefObject<HTMLDivElement>}>
          <div
            className={`${'relative'} flex h-full flex-col items-center justify-center ${className}`}
            key={JSON.stringify(children, ignoreCircularReferences())}
          >
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

const ignoreCircularReferences = () => {
  const seen = new WeakSet()
  return (key: string, value: WeakKey | null) => {
    if (key.startsWith('_')) return // Don't compare React's internal props.
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return
      seen.add(value)
    }
    return value
  }
}
