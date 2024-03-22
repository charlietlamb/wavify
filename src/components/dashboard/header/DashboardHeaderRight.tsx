import { UserAvatar } from '@/components/utils/UserAvatar'
import DashboardHeaderSearch from './DashboardHeaderSearch'
import { useUser } from '@/state/user/useUser'

export default function DashboardHeaderRight() {
  const user = useUser()
  return (
    <div className="flex items-center gap-x-2">
      <DashboardHeaderSearch />
      <UserAvatar user={user} />
    </div>
  )
}
