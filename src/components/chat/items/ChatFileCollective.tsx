import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { useChatItemContext } from './context/chatItemContext'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { getCollectiveFromId } from '@/components/nav/functions/getCollectiveFromId'
import ChatExternalSkeleton from './ChatExternalSkeleton'

export default function ChatFileCollective() {
  const supabase = createClientComponentClient()
  const { message } = useChatItemContext()
  const [collective, setCollective] = useState<Collective | null>(null)
  const router = useRouter()
  useEffect(() => {
    async function getData() {
      if (!message.collective) return null
      setCollective(await getCollectiveFromId(supabase, message.collective))
    }
    getData()
  })
  return collective ? (
    <div className="mt-2 flex w-full justify-between rounded-lg border border-zinc-700 p-4 hover:border-zinc-200">
      <div className="flex gap-2">
        <div className="relative h-12 min-h-12 w-12 min-w-12 flex-shrink-0">
          <Image
            alt={`${collective.unique} image`}
            src={'https://github.com/shadcn.png'} //otherUser.imageUrl}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="rounded-sm"
          />
        </div>
        <div className="flex max-h-12 flex-col">
          <span className="overflow-hidden overflow-ellipsis whitespace-nowrap text-lg font-bold">
            {collective.unique}
          </span>
          <span className="text-sm text-zinc-400">Collective</span>
        </div>
      </div>
      <Button
        variant="zinc"
        onClick={() => router.push(`/collective/${collective.unique}`)}
        className="flex-shrink-0"
      >
        View
      </Button>
    </div>
  ) : <ChatExternalSkeleton />
}
