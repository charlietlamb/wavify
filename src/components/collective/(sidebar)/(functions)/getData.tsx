import { v4 as uuidv4 } from 'uuid'
import { getSpaceData } from './getSpaceData'
import { getUserData } from './getUserData'
import { iconMap } from '../../space/data'
import { spaceTypes, spaceLabels } from '../../space/data'

export function getData(spaces: Space[], colUsers: ColUserAndData[]) {
  return [
    ...spaceTypes.map((spaceType, index) => {
      return {
        key: uuidv4(),
        label: spaceLabels[index],
        type: 'space' as const,
        data: getSpaceData(
          spaces.filter((space) => space.type === spaceType),
          iconMap
        ),
      }
    }),
    {
      key: uuidv4(),
      label: 'Users',
      type: 'user' as const,
      data: getUserData(colUsers),
    },
  ]
}
