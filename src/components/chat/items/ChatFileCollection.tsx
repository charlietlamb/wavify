import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { useChatItemContext } from './context/chatItemContext'
import Image from 'next/image'
import { getCollectionFromId } from '@/components/saved/functions/getCollectionFromId'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import ChatExternalSkeleton from './ChatExternalSkeleton'

export default function ChatFileCollection() {
  const supabase = createClientComponentClient()
  const { message } = useChatItemContext()
  const [collection, setCollection] = useState<Collection | null>(null)
  const router = useRouter()
  useEffect(() => {
    async function getData() {
      if (!message.collection) return null
      setCollection(await getCollectionFromId(supabase, message.collection))
    }
    getData()
  })
  return collection ? (
    <div className="mt-2 flex w-full justify-between rounded-lg border border-zinc-700 p-4 hover:border-zinc-200">
      <div className="flex gap-2">
        <div className="relative h-12 min-h-12 w-12 min-w-12 flex-shrink-0">
          <Image
            alt={`${collection.name} image`}
            src={'https://github.com/shadcn.png'} //otherUser.imageUrl}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="rounded-sm"
          />
        </div>
        <div className="flex max-h-12 flex-col">
          <span className="overflow-hidden overflow-ellipsis whitespace-nowrap text-lg font-bold">
            {collection.name}
          </span>
          <span className="text-sm text-zinc-400">Collection</span>
        </div>
      </div>
      <Button
        variant="zinc"
        onClick={() => router.push(`/collection/${collection.id}`)}
        className="flex-shrink-0"
      >
        View
      </Button>
    </div>
  ) : (
    <ChatExternalSkeleton />
  )
}
