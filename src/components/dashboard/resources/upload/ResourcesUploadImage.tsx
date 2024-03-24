import { cn } from '@/lib/utils'
import { Upload } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function ResourcesUploadImage() {
  const [file, setFile] = useState<File | null>(null)
  const [src, setSrc] = useState<string | null>(null)
  function onSelectFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file1 = event.target.files?.[0]
    if (file1) {
      setFile(file1)
      setSrc(URL.createObjectURL(file1))
    }
  }
  return (
    <div
      className={cn(
        'group relative flex h-[300px] w-full cursor-pointer flex-col items-center justify-center gap-y-1 rounded-lg border-2 border-zinc-700 p-4 hover:border-zinc-200 lg:w-[300px]',
        !(file && src) && 'border-dashed p-0'
      )}
    >
      {file && src ? (
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
          <p className="text-lg font-semibold">Upload Resource Image</p>
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
  )
}
