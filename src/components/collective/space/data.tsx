import { Archive, Hash, Hourglass, LibraryBig, Mic, Video } from 'lucide-react'

export const iconMap = {
  ['text']: <Hash className="mr-2 h-4 w-4" />,
  ['audio']: <Mic className="mr-2 h-4 w-4" />,
  ['video']: <Video className="mr-2 h-4 w-4" />,
  ['library']: <LibraryBig className="mr-2 h-4 w-4" />,
  ['postbox']: <Archive className="mr-2 h-4 w-4" />,
  ['transient']: <Hourglass className="mr-2 h-4 w-4" />,
}
export const iconMapSidebar = {
  ['text']: (
    <Hash className="h-5 w-5 flex-shrink-0 text-zinc-500 dark:text-zinc-400" />
  ),
  ['audio']: (
    <Mic className="h-5 w-5 flex-shrink-0 text-zinc-500 dark:text-zinc-400" />
  ),
  ['video']: (
    <Video className="h-5 w-5 flex-shrink-0 text-zinc-500 dark:text-zinc-400" />
  ),
  ['library']: (
    <LibraryBig className="h-5 w-5 flex-shrink-0 text-zinc-500 dark:text-zinc-400" />
  ),
  ['postbox']: (
    <Archive className="h-5 w-5 flex-shrink-0 text-zinc-500 dark:text-zinc-400" />
  ),
  ['transient']: (
    <Hourglass className="h-5 w-5 flex-shrink-0 text-zinc-500 dark:text-zinc-400" />
  ),
}

export const spaceTypes: SpaceType[] = [
  'text',
  'audio',
  'video',
  'library',
  'postbox',
  'transient',
]
export const spaceLabels = [
  'Text Spaces',
  'Audio Spaces',
  'Video Spaces',
  'Libraries',
  'Postboxes',
  'Transients',
]
