import { RootState } from '../store'
import { useSelector } from 'react-redux'

interface CollectiveReturn {
  collective: Collective
  colUser: ColUserAndData
  colUsers: ColUserAndData[]
  roles: Role[]
  spaces: Space[]
}

export function useCollective(): CollectiveReturn {
  const collective = useSelector((state: RootState) => state.collective)
  if (!collective.collective)
    return {
      collective: {} as Collective,
      colUser: {} as ColUserAndData,
      colUsers: [] as ColUserAndData[],
      roles: [] as Role[],
      spaces: [] as Space[],
    }
  if (!collective.colUser) throw new Error('No colUser found')
  if (!collective.colUsers) throw new Error('No colUsers found')
  if (!collective.spaces) throw new Error('No spaces found')
  if (!collective.roles) throw new Error('No roles found')
  const collectiveToReturn: CollectiveReturn = {
    collective: collective.collective,
    colUser: collective.colUser,
    colUsers: collective.colUsers,
    roles: collective.roles,
    spaces: collective.spaces,
  }
  return collectiveToReturn
}
