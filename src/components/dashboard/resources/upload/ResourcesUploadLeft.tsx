import ResourcesUploadImage from './ResourcesUploadImage'
import ResourcesUploadProduct from './ResourcesUploadProduct'

export default function ResourcesUploadLeft() {
  return (
    <div className="flex flex-col gap-y-4">
      <ResourcesUploadImage />
      <ResourcesUploadProduct />
    </div>
  )
}
