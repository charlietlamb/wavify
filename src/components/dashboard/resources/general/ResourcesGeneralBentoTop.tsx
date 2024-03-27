import { Bookmark, Download, Eye, Upload } from 'lucide-react'
import { useGeneralContext } from './context/context'

const iconClassName = 'text-zinc-700'

export default function ResourcesGeneralBentoTop() {
  const { downloads, uploads, views, saves } = useGeneralContext()
  const generalData = [
    {
      name: 'Downloads',
      amount: `+${downloads}`,
      description: '+X% from last month',
      icon: <Download className={iconClassName} />,
    },
    {
      name: 'Uploads',
      amount: `+${uploads}`,
      description: '+X% from last month',
      icon: <Upload className={iconClassName} />,
    },
    {
      name: 'Views',
      amount: `+${views}`,
      description: '+X% from last month',
      icon: <Eye className={iconClassName} />,
    },
    {
      name: 'Saves',
      amount: `+${saves}`,
      description: '+X% from last month',
      icon: <Bookmark className={iconClassName} />,
    },
  ]
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {generalData.map((data) => (
        <div className="flex flex-col rounded-md border border-zinc-700 p-4 transition hover:border-zinc-200">
          <div className="flex items-center justify-between">
            <p className="text-md text-zinc-400">{data.name}</p>
            {data.icon}
          </div>
          <p className="text-2xl font-bold leading-none">{data.amount}</p>
          <p className="text-sm text-zinc-400">{data.description}</p>
        </div>
      ))}
    </div>
  )
}
