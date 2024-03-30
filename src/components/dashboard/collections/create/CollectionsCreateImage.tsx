import { cn } from '@/lib/utils'
import { Upload } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useCollectionsCreateContext } from './context/collectionsCreateContext'

export default function CollectionsCreateImage() {
  const { image, setImage } = useCollectionsCreateContext()
  const [src, setSrc] = useState<string | null>(null)
  function onSelectFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file1 = event.target.files?.[0]
    if (file1) {
      setImage(file1)
      setSrc(URL.createObjectURL(file1))
    }
  }
  return (
    <div className="h-[200px] sm:h-[300px] sm:w-[300px]">
      <div
        className={cn(
          'group relative flex h-full w-full cursor-pointer flex-col items-center justify-center gap-y-1 rounded-lg border-2 border-zinc-700 hover:border-zinc-200',
          !(image && src) && 'border-dashed p-0'
        )}
      >
        {image && src ? (
          <>
            <Image
              src={src}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt="upload file image preview"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 opacity-0 transition group-hover:opacity-100">
              <p className="text-lg font-semibold text-white">Change Image</p>
              <Upload className="h-8 w-8" />
              <p className="text-zinc-400">Max File Size: 1MB</p>
            </div>
          </>
        ) : (
          <>
            <p className="text-lg font-semibold">Upload Collection Image</p>
            <Upload className="h-8 w-8" />
            <p className="text-zinc-400">Max File Size: 1MB</p>
          </>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </div>
    </div>
  )
}
