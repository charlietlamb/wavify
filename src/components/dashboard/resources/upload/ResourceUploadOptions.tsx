import { Checkbox } from '@nextui-org/react'
import { useUploadContext } from './context/context'
import { Bookmark, Download, UserPlus, UsersRound } from 'lucide-react'

export default function ResourceUploadOptions() {
  const { options, setOptions } = useUploadContext()
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
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
