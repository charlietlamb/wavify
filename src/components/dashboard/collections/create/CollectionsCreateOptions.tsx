import { Checkbox } from '@nextui-org/react'
import { Bookmark, Download, UserPlus, UsersRound } from 'lucide-react'
import { useCollectionsCreateContext } from './context/collectionsCreateContext'

export default function CollectionsCreateOptions() {
  const { options, setOptions } = useCollectionsCreateContext()
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <Checkbox
        icon={<UsersRound />}
        checked={options.friendsOnly}
        onChange={() =>
          setOptions({ ...options, friendsOnly: !options.friendsOnly })
        }
      >
        Friends Only
      </Checkbox>
      <Checkbox
        icon={<UserPlus />}
        checked={options.mustFollow}
        onChange={() =>
          setOptions({ ...options, mustFollow: !options.mustFollow })
        }
      >
        Must Follow
      </Checkbox>
      <Checkbox
        icon={<Bookmark />}
        checked={options.allowSave}
        onChange={() =>
          setOptions({ ...options, allowSave: !options.allowSave })
        }
      >
        Allow Save
      </Checkbox>
      <Checkbox
        icon={<Download />}
        checked={options.allowDownload}
        onChange={() =>
          setOptions({ ...options, allowDownload: !options.allowDownload })
        }
        // classNames={{ wrapper: 'bg-zinc-200' }}
      >
        Allow Download
      </Checkbox>
    </div>
  )
}
