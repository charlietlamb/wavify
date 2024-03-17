import { Separator } from '@/components/ui/separator'

export default function SeparatorText({ text }: { text: string }) {
  return (
    <div className="flex w-full gap-x-1">
      <Separator className="w-auto bg-zinc-700" />
      <p className="flex-grow whitespace-nowrap text-zinc-700">{text}</p>
      <Separator className="bg-zinc-700 " />
    </div>
  )
}
