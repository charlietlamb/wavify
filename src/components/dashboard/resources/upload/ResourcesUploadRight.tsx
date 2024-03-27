import ResourcesUploadError from './ResourcesUploadError'
import ResourcesUploadInputs from './ResourcesUploadInputs'
import ResourcesUploadSubmit from './ResourcesUploadSubmit'
import ResourcesUploadTitle from './ResourcesUploadTitle'

export default function ResourcesUploadRight() {
  return (
    <div className="order-first w-full flex-grow rounded-lg border border-zinc-700 p-4 transition hover:border-zinc-200 lg:order-none lg:h-full lg:max-h-full lg:overflow-hidden">
      <div className="flex flex-col gap-y-4 lg:max-h-full lg:overflow-y-auto">
        <ResourcesUploadTitle />
        <ResourcesUploadInputs />
        <ResourcesUploadSubmit className="hidden lg:flex" />
        <ResourcesUploadError />
      </div>
    </div>
  )
}
