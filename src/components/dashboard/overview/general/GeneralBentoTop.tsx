import { CreditCard, DollarSign, Download, UsersRound } from 'lucide-react'

const iconClassName = 'text-zinc-700'
const generalData = [
  {
    name: 'Total Revenue',
    amount: '$1,250,000',
    description: '+12% from last month',
    icon: <DollarSign className={iconClassName} />,
  },
  {
    name: 'Downloads',
    amount: '+777',
    description: '+40% from last month',
    icon: <Download className={iconClassName} />,
  },
  {
    name: 'Sales',
    amount: '+3,250',
    description: '+5% from last month',
    icon: <CreditCard className={iconClassName} />,
  },
  {
    name: 'Followers',
    amount: '+10,000',
    description: '+12% from last month',
    icon: <UsersRound className={iconClassName} />,
  },
]

export default function GeneralBentoTop() {
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
