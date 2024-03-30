import Image from 'next/image'
import { useCollectionsCreateContext } from './context/collectionsCreateContext'
import { cn } from '@/lib/utils'

export default function CollectionsCreateItem({ item }: { item: Item }) {
  const { selected, setSelected, items, setItems } =
    useCollectionsCreateContext()
  const selectedItem = selected.some((item1) => item.id === item1.id)
  function handleSavedClick() {
    if (selectedItem) {
      setSelected(selected.filter((i) => i.id !== item.id))
      setItems([...items, item])
    } else {
      setSelected([...selected, item])
      setItems(items.filter((i) => i.id !== item.id))
    }
  }
  return (
    <div
      className={cn(
        'flex w-full max-w-full cursor-pointer gap-2 overflow-hidden overflow-ellipsis rounded-md'
      )}
      onClick={() => handleSavedClick()}
    >
      <div className="relative min-h-10 min-w-10 overflow-hidden rounded-md">
        <Image
          src="https://github.com/shadcn.png" //resource.imageUrl
          alt="collective preview image"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 rounded"
        />
      </div>
      <div className="flex flex-grow flex-col">
        <h3 className="min-w-0 overflow-hidden overflow-ellipsis whitespace-nowrap font-semibold text-zinc-200">
          {item.name}
        </h3>
        <p className="text-sm text-zinc-400">{item.text}</p>
      </div>
    </div>
  )
}
