import { useUploadContext } from './context/context'

export default function ResourcesUploadTitle() {
  const { name } = useUploadContext()
  return <h2 className="text-3xl font-bold text-zinc-200">{name}</h2>
}
