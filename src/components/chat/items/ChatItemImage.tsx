import Image from 'next/image'
import { download } from '../functions/download'

export default function ChatItemImage({ file }: { file: FileData }) {
  return (
    <button
      onClick={() => {
        download(file.url, file.name)
      }}
      className="relative mt-2 flex aspect-square h-48 w-48 items-center justify-start overflow-hidden rounded-md border bg-secondary"
    >
      <Image
        src={
          typeof 'https://github.com/shadcn.png' === 'string'
            ? 'https://github.com/shadcn.png'
            : ''
        }
        alt={file.name}
        fill
        className="object-cover"
      />
    </button>
  )
}
