import ResourcesUploadError from './ResourcesUploadError'
import ResourcesUploadInputs from './ResourcesUploadInputs'
import ResourcesUploadSubmit from './ResourcesUploadSubmit'
import ResourcesUploadTitle from './ResourcesUploadTitle'

export default function ResourcesUploadRight() {
  return (
    <div className="order-first flex w-full flex-grow flex-col gap-4 lg:order-none lg:h-full  lg:max-h-full lg:overflow-y-auto lg:p-4">
      <ResourcesUploadTitle />
      <ResourcesUploadInputs />
      <ResourcesUploadSubmit className="hidden lg:flex" />
      <ResourcesUploadError />
    </div>
  )
}
