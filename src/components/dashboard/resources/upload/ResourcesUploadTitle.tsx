import { useResourceUploadContext } from './context/context'

export default function ResourcesUploadTitle() {
  const { name } = useResourceUploadContext()
  return <h2 className="text-3xl font-bold text-zinc-200">{name}</h2>
}
