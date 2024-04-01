'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { redirect, useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useModal } from '../../../hooks/use-modal-store'
import { EmojiPicker } from '../util/EmojiPicker'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import isObject from '@/lib/isObject'
import { useUser } from '@/state/user/useUser'

interface ChatInputProps {
  type: 'conversation' | 'space'
  chat: Chat | null
  name: string
  space?: Space
}

const formSchema = z.object({
  content: z.string().min(1),
})

export const ChatInput = ({ name, type, chat, space }: ChatInputProps) => {
  if (!chat) return redirect(`/`)
  const user = useUser()
  const { onOpen } = useModal()
  const router = useRouter()
  const supabase = createClientComponentClient()
  const messageId = uuidv4()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (formData: { content: string }) => {
    try {
      var newMessage: Json = {
        id: messageId,
        author: user.id,
        content: formData.content,
        chat: chat?.id,
        files: false,
      }
      const { error } = await supabase.from('messages').insert(newMessage)
      if (error) throw error
      const { error: chatError } = await supabase
        .from('chats')
        .update({ lastSent: new Date().toISOString() })
        .eq('id', chat.id)
      if (chatError) throw chatError
      form.reset()
      router.refresh()
    } catch (error) {
      throw error
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border-t border-zinc-700"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative flex items-center p-2">
                  <button
                    type="button"
                    onClick={() =>
                      onOpen('messageFile', { messageFileType: type, chat })
                    }
                    className="absolute left-8 top-5 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-zinc-200 p-1 transition hover:bg-zinc-100"
                  >
                    <Plus className="text-zinc-700" />
                  </button>
                  <Input
                    disabled={isLoading}
                    className="border border-zinc-700 bg-transparent px-14 py-6 text-zinc-200 transition focus-visible:border-zinc-200 focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder={`Message ${
                      type === 'conversation'
                        ? name
                        : '#' + space && isObject(space)
                          ? space.name
                          : ''
                    }`}
                    {...field}
                  />
                  {
                    <div className="absolute right-8 top-5">
                      <EmojiPicker
                        onChange={(emoji: string) =>
                          field.onChange(`${field.value} ${emoji}`)
                        }
                      />
                    </div>
                  }
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
