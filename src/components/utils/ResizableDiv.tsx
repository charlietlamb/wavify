import { useMeasure } from "react-use";
import { motion, AnimatePresence } from "framer-motion";
export default function ResizableDiv({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  let [ref, { height }] = useMeasure();

  return (
    <motion.div
      animate={{ height: height || "auto" }}
      className="relative overflow-hidden"
    >
      <AnimatePresence initial={false}>
        <motion.div ref={ref as unknown as React.RefObject<HTMLDivElement>}>
          <div
            className={`${"relative"} flex flex-col justify-center items-center h-full ${className}`}
            key={JSON.stringify(children, ignoreCircularReferences())}
          >
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

const ignoreCircularReferences = () => {
  const seen = new WeakSet();
  return (key: string, value: WeakKey | null) => {
    if (key.startsWith("_")) return; // Don't compare React's internal props.
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) return;
      seen.add(value);
    }
    return value;
  };
};
