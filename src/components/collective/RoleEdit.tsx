import Picker from '@emoji-mart/react'
import { AccordionContent } from '../ui/accordion'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import RoleOptions from './RoleOptions'
import { updateRole } from './roles/updateRole'
import { useTheme } from 'next-themes'
import { useRoleContext } from './roles/context'
import { Input } from '../ui/input'
import data from '@emoji-mart/data'
import isObject from '@/lib/isObject'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { PopoverPicker } from '../me/PopoverPicker'
import ButtonLoader from '../me/ButtonLoader'
import { deleteRole } from './roles/deleteRole'
import { useState } from 'react'
import { useModal } from '../../../hooks/use-modal-store'

export default function RoleEdit() {
  const { resolvedTheme } = useTheme()
  const context = useRoleContext()
  const { emoji, setEmoji, name, setName, color, setColor, loading } = context
  const supabase = createClientComponentClient()
  const { onOpen } = useModal()
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
  return (
    <AccordionContent>
      <div className="flex-col space-y-2 border-t-2 border-primary px-4">
        <div className="mx-1 flex space-x-4 py-2">
          <Popover>
            <PopoverTrigger>
              <span className="text-4xl" role="img" aria-label="emoji">
                {emoji}
              </span>
            </PopoverTrigger>
            <PopoverContent
              side="right"
              sideOffset={40}
              className="mb-16 border-none bg-transparent shadow-none drop-shadow-none"
            >
              <Picker
                theme={resolvedTheme}
                data={data}
                onEmojiSelect={(emoji: Json) =>
                  isObject(emoji) &&
                  setEmoji(typeof emoji.native === 'string' ? emoji.native : '')
                }
                previewPosition="none"
                skinTonePosition="search"
              />
            </PopoverContent>
          </Popover>
          <Input value={name} onChange={(e) => setName(e.target.value)}></Input>
          <PopoverPicker color={color} onChange={setColor} />
        </div>
        <RoleOptions></RoleOptions>
        <div className="flex justify-end space-x-4">
          <ButtonLoader
            isLoading={deleteLoading}
            text="Delete Role"
            onClick={() => onOpen('deleteRole', { roleContext: context })}
          ></ButtonLoader>
          <ButtonLoader
            isLoading={loading}
            text="Update Role"
            onClick={() => updateRole(supabase, context)}
          ></ButtonLoader>
        </div>
      </div>
    </AccordionContent>
  )
}
