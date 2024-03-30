import { Button } from '@/components/ui/button'
import { Bookmark, BookmarkCheck, BookmarkMinus, Plus } from 'lucide-react'
import { ActionTooltip } from '../util/ActionTooltip'
import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useUser } from '@/state/user/useUser'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { useCollectionContext } from './context/collectionContext'
import CollectionSingleSend from './CollectionSingleSend'
import CollectionSingleCollection from './CollectionSingleCollection'
import { getCollectionSaved } from './functions/getCollectionSaved'
import { getCollectionActionSaved } from './functions/getCollectionActionSaved'

export default function CollectionSingleButtons({
  bottom = false,
}: {
  bottom?: boolean
}) {
  const supabase = createClientComponentClient()
  const user = useUser()
  const { collection } = useCollectionContext()
  const [saved, setSaved] = useState(false)
  useEffect(() => {
    async function setData() {
      setSaved(await getCollectionSaved(supabase, user, collection))
    }
    setData()
  }, [])

  async function handleSavedClick() {
    if (saved) {
      const { error } = await supabase
        .from('saves')
        .delete()
        .eq('user', user.id)
        .eq('collection', collection.id)
      if (error) throw error
      toast('Collection successfully unsaved.', {
        icon: <BookmarkMinus />,
        description: 'The creators will no longer be notified.',
      })
    } else {
      const { error } = await supabase.from('saves').insert({
        user: user.id,
        collection: collection.id,
        name: collection.name,
      })
      if (error) throw error
      let description = 'You have previously saved this collection.'
      if (!(await getCollectionActionSaved(supabase, user, collection))) {
        const { error } = await supabase
          .from('actions')
          .insert({ child: user.id, collection: collection.id, action: 'save' })
        if (error) throw error
        description = 'The creators will be notified.'
      }
      toast('Collection successfully saved.', {
        icon: <BookmarkCheck />,
        description,
      })
    }
    setSaved(!saved)
  }
  return (
    <>
      <div
        className={cn(
          'hidden gap-2 sm:flex',
          bottom && 'flex w-full gap-4 sm:hidden'
        )}
      >
        <ActionTooltip label="Send Collection">
          <CollectionSingleSend bottom={bottom} />
        </ActionTooltip>
        <ActionTooltip label="Add To Collection">
          <CollectionSingleCollection bottom={bottom} />
        </ActionTooltip>
        <ActionTooltip label={saved ? 'Unsave Collection' : 'Save Collection'}>
          <Button
            variant="zinc_outline"
            onClick={() => handleSavedClick()}
            className={bottom ? 'w-full' : ''}
          >
            <Bookmark fill={saved ? '#E4E4E7' : undefined} />
          </Button>
        </ActionTooltip>
      </div>
    </>
  )
}
