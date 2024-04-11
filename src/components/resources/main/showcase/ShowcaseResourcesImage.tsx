import Spinner from '@/components/utils/Spinner'
import WavifyCardEllipsis from '@/components/wavify/WavifyCardEllipsis'
import WavifyPreviewButton from '@/components/wavify/WavifyPreviewButton'
import Image from 'next/image'
import { useShowcaseResourceContext } from './context/showcaseResourceContext'

export default function ShowcaseResourcesImage() {
  const { file, loading, setLoading } = useShowcaseResourceContext()
  return (
    <div className="relative aspect-square h-32 w-32">
      <Image
        src="https://github.com/shadcn.png"
        alt={`Wavify showcase resource image`}
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 rounded-xl"
      />
      {!loading ? (
        <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-black/50 opacity-0 transition hover:opacity-100">
          {file && <WavifyPreviewButton file={file} setLoading={setLoading} />}

          <WavifyCardEllipsis ellipsisComponent={<></>} />
        </div>
      ) : (
        <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-black/50">
          <Spinner color="#E4E4E7" />
        </div>
      )}
    </div>
  )
}
