"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModal } from "../../../hooks/use-modal-store";
import { EmojiPicker } from "../util/EmojiPicker";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import isObject from "@/lib/isObject";

interface ChatInputProps {
  type: "conversation" | "space";
  chat: Chat | null;
  user: User;
  name: string;
  collective?: Collective;
  space?: Json;
}

const formSchema = z.object({
  content: z.string().min(1),
});

export const ChatInput = ({
  user,
  name,
  type,
  chat,
  collective,
  space,
}: ChatInputProps) => {
  if (!chat) return redirect(`/`);
  const { onOpen } = useModal();
  const router = useRouter();
  const supabase = createClientComponentClient();
  const messageId = uuidv4();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (formData: { content: string }) => {
    try {
      var newMessage: Json = {
        id: messageId,
        author: user.id,
        content: formData.content,
        chat: chat?.id,
      };
      await supabase.from("messages").insert(newMessage);

      var newMessageArray: Json;
      var date = new Date().toISOString();
      if (Array.isArray(chat.messages)) {
        newMessageArray = [
          ...chat.messages,
          { id: messageId, createdAt: date },
        ];
      } else {
        newMessageArray = [{ id: messageId, createdAt: date }];
      }
      await supabase
        .from("chats")
        .update({ messages: newMessageArray })
        .eq("id", chat.id);
      form.reset();
      router.refresh();
    } catch (error) {
      throw new Error(String(error.message));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <button
                    type="button"
                    onClick={() => onOpen("messageFile", { user, chat })}
                    className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-800 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                  >
                    <Plus className="text-white dark:text-[#313338]" />
                  </button>
                  <Input
                    disabled={isLoading}
                    className="py-6 border-0 border-none px-14 bg-zinc-200/90 dark:bg-zinc-950 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                    placeholder={`Message ${
                      type === "conversation"
                        ? name
                        : "#" + space && isObject(space)
                        ? space.name
                        : ""
                    }`}
                    {...field}
                  />
                  {
                    <div className="absolute top-7 right-8">
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
  );
};
