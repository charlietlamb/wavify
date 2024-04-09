import { PackageSearch, UsersRound } from 'lucide-react'
import StoreCreatePackage from './StoreCreatePackage'
import { CollectiveToggleMobile } from '@/components/util/CollectiveToggleMobile'

export default function StoreButtons() {
  return (
    <div className="flex items-center divide-x divide-zinc-700">
      <div className="h-full md:hidden">
        <CollectiveToggleMobile />
      </div>
      <StoreCreatePackage />
      <button className="flex w-full items-center gap-2 p-2 font-semibold transition hover:bg-zinc-900">
        <PackageSearch />
        Manage Packages
      </button>
      <button className="flex w-full items-center gap-2 p-2 font-semibold transition hover:bg-zinc-900">
        <UsersRound />
        Manage Subscriptions
      </button>
    </div>
  )
}
