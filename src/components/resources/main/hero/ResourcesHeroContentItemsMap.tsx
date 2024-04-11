import WavifyCard from '@/components/wavify/WavifyCard'
import { useResourcesMainContext } from '../context/resourcesMainContext'
import { getFileSizeString } from '@/components/files/functions/getFileSizeString'
import { motion, AnimatePresence } from 'framer-motion'

export default function ResourcesHeroContentItemsMap() {
  const { showcaseResources, showcaseIndex, setShowcaseIndex } =
    useResourcesMainContext()

  const reorderedShowcaseResources = [
    ...showcaseResources.slice(showcaseIndex),
    ...showcaseResources.slice(0, showcaseIndex),
  ]

  return (
    <div className="flex gap-2">
      {reorderedShowcaseResources.map(
        (resource: ResourceAndUser, index: number) => {
          if (index === showcaseIndex) return null
          return (
            <AnimatePresence key={resource.id}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, delay: index * 0.5 }}
              >
                <WavifyCard
                  user={resource.users}
                  name={resource.name}
                  text={getFileSizeString(resource.size)}
                  imageUrl={resource.imageUrl}
                  onClick={() => setShowcaseIndex(index)}
                  preview={resource.previewId}
                  ellipsisComponent={<></>}
                  className="wavify-card w-48 min-w-48 transition-opacity duration-500 ease-in-out"
                />
              </motion.div>
            </AnimatePresence>
          )
        }
      )}
    </div>
  )
}
