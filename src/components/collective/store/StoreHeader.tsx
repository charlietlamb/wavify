import { CircleDollarSign } from 'lucide-react'
import { useStoreContext } from './context/storeContext'

export default function StoreHeader() {
  const { space } = useStoreContext()
  return (
    <div className="flex items-center gap-2 p-[6px]">
      <CircleDollarSign />
      <h2 className="text-xl font-bold">{space.slug}</h2>
    </div>
  )
}
