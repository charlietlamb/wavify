import { useUploadContext } from './context/context'

export default function ResourcesUploadError() {
  const { error } = useUploadContext()
  if (!error) return null
  return <p className="text-md font-medium text-red-500">{error}</p>
}
