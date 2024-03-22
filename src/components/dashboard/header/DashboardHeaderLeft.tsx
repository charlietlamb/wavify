import DashboardHeaderMenu from './DashboardHeaderMenu'
import DashboardHeaderMobile from './DashboardHeaderMobile'
import DashboardHeaderSelect from './DashboardHeaderSelect'

export default function DashboardHeaderLeft() {
  return (
    <div className="flex items-center gap-x-2">
      <DashboardHeaderMobile />
      <DashboardHeaderSelect />
      <DashboardHeaderMenu />
    </div>
  )
}
