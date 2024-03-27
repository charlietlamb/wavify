import { Button } from '@/components/ui/button'
import { Bookmark, BookmarkCheck, BookmarkMinus, Plus } from 'lucide-react'
import { ActionTooltip } from '../util/ActionTooltip'
import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useUser } from '@/state/user/useUser'
import { useResourceContext } from './context/resourceContext'
import { getResourceSaved } from './functions/getResourceSaved'
import { cn } from '@/lib/utils'
import { getResourceActionSaved } from './functions/getResourceActionSaved'
import { toast } from 'sonner'
import ResourceSingleCollection from './ResourceSingleCollection'
import ResourceSingleSend from './ResourceSingleSend'

export default function ResourceSingleButtons({
  bottom = false,
}: {
  bottom?: boolean
}) {
  const supabase = createClientComponentClient()
  const user = useUser()
  const { resource } = useResourceContext()
  const [saved, setSaved] = useState(false)
  useEffect(() => {
    async function setData() {
      setSaved(await getResourceSaved(supabase, user, resource))
    }
    setData()
  }, [])

  async function handleSavedClick() {
    if (saved) {
      const { error } = await supabase
        .from('saves')
        .delete()
        .eq('user', user.id)
        .eq('resource', resource.id)
      if (error) throw error
      toast('Resource successfully unsaved.', {
        icon: <BookmarkMinus />,
        description: 'The creators will no longer be notified.',
      })
    } else {
      const { error } = await supabase
        .from('saves')
        .insert({ user: user.id, resource: resource.id })
      if (error) throw error
      let description = 'You have previously saved this resource.'
      if (!(await getResourceActionSaved(supabase, user, resource))) {
        const { error } = await supabase
          .from('actions')
          .insert({ child: user.id, resource: resource.id, action: 'save' })
        if (error) throw error
        description = 'The creators will be notified.'
      }
      toast('Resource successfully saved.', {
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
          'hidden gap-2 md:flex',
          bottom && 'flex w-full md:hidden'
        )}
      >
        <ActionTooltip label="Send Resource">
          <ResourceSingleSend />
        </ActionTooltip>
        <ActionTooltip label="Add To Collection">
          <ResourceSingleCollection />
        </ActionTooltip>
        <ActionTooltip label={saved ? 'Unsave Resource' : 'Save Resource'}>
          <Button variant="zinc_outline" onClick={() => handleSavedClick()}>
            <Bookmark fill={saved ? '#E4E4E7' : undefined} />
          </Button>
        </ActionTooltip>
      </div>
    </>
  )
}
