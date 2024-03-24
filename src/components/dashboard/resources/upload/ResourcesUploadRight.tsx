import ResourcesUploadError from './ResourcesUploadError'
import ResourcesUploadInputs from './ResourcesUploadInputs'
import ResourcesUploadSubmit from './ResourcesUploadSubmit'
import ResourcesUploadTitle from './ResourcesUploadTitle'

export default function ResourcesUploadRight() {
  return (
    <div className="order-first flex h-full max-h-full w-full flex-grow flex-col gap-y-4 rounded-lg border border-zinc-700 p-4 transition hover:border-zinc-200 lg:order-none">
      <ResourcesUploadTitle />
      <ResourcesUploadInputs />
      <ResourcesUploadSubmit className="hidden lg:flex" />
      <ResourcesUploadError />
    </div>
  )
}
