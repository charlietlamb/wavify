import {
  Archive,
  CircleDollarSign,
  Hash,
  Hourglass,
  LibraryBig,
  MessageCircleQuestion,
  Mic,
  Video,
} from 'lucide-react'

export const iconMap = {
  ['text']: <Hash className="mr-2 h-4 w-4" />,
  ['audio']: <Mic className="mr-2 h-4 w-4" />,
  ['video']: <Video className="mr-2 h-4 w-4" />,
  ['library']: <LibraryBig className="mr-2 h-4 w-4" />,
  ['postbox']: <Archive className="mr-2 h-4 w-4" />,
  ['transient']: <Hourglass className="mr-2 h-4 w-4" />,
  ['feedback']: <MessageCircleQuestion className="mr-2 h-4 w-4" />,
  ['store']: <CircleDollarSign className="mr-2 h-4 w-4" />,
}
export const iconMapSidebar = {
  ['text']: (
    <Hash className="h-5 w-5 flex-shrink-0 text-zinc-400 group-hover:text-zinc-200" />
  ),
  ['audio']: (
    <Mic className="h-5 w-5 flex-shrink-0 text-zinc-400 group-hover:text-zinc-200" />
  ),
  ['video']: (
    <Video className="h-5 w-5 flex-shrink-0 text-zinc-400 group-hover:text-zinc-200" />
  ),
  ['library']: (
    <LibraryBig className="h-5 w-5 flex-shrink-0 text-zinc-400 group-hover:text-zinc-200" />
  ),
  ['postbox']: (
    <Archive className="h-5 w-5 flex-shrink-0 text-zinc-400 group-hover:text-zinc-200" />
  ),
  ['transient']: (
    <Hourglass className="h-5 w-5 flex-shrink-0 text-zinc-400 group-hover:text-zinc-200" />
  ),
  ['feedback']: (
    <MessageCircleQuestion className="h-5 w-5 flex-shrink-0 text-zinc-400 group-hover:text-zinc-200" />
  ),
  ['store']: (
    <CircleDollarSign className="h-5 w-5 flex-shrink-0 text-zinc-400 group-hover:text-zinc-200" />
  ),
}

export const spaceTypes: SpaceType[] = [
  'text',
  'audio',
  'video',
  'library',
  'postbox',
  'transient',
  'feedback',
  'store',
]
export const spaceLabels = [
  'Text Spaces',
  'Audio Spaces',
  'Video Spaces',
  'Libraries',
  'Postboxes',
  'Transients',
  'Feedback Spaces',
  'Stores',
]
