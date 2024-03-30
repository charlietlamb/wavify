import { useCollectionsCreateContext } from './context/collectionsCreateContext'

export default function CollectionsCreateError() {
  const { error } = useCollectionsCreateContext()
  if (!error) return null
  return <p className="text-md font-medium text-red-500">{error}</p>
}
