export default function ToolbarHeading({
  title,
  text,
  icon,
}: {
  title: string
  text: string
  icon: React.ReactNode
}) {
  return (
    <div className="flex flex-col p-3">
      <div className="flex w-full items-center justify-between  text-zinc-200">
        <h1 className="text-center text-2xl font-bold leading-none">{title}</h1>
        {icon}
      </div>
      <h3 className="text-zinc-400">{text}</h3>
    </div>
  )
}
