import { Separator } from '@/components/ui/separator'

export default function SeparatorText({ text }: { text: string }) {
  return (
    <div className="flex w-full items-center gap-x-1">
      <Separator className="w-auto flex-grow bg-zinc-400" />
      <p className=" whitespace-nowrap text-zinc-400">{text}</p>
      <Separator className="w-auto flex-grow bg-zinc-400" />
    </div>
  )
}
