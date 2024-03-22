import { Separator } from '@/components/ui/separator'

export default function SeparatorText({ text }: { text: string }) {
  return (
    <div className="flex w-full items-center gap-x-1">
      <Separator className="w-auto flex-grow bg-zinc-700" />
      <p className=" whitespace-nowrap text-zinc-700">{text}</p>
      <Separator className="w-auto flex-grow bg-zinc-700" />
    </div>
  )
}
