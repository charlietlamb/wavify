import { useResourceUploadContext } from './context/context'

export default function ResourcesUploadError() {
  const { error } = useResourceUploadContext()
  if (!error) return null
  return <p className="text-md font-medium text-red-500">{error}</p>
}
