import ShowcaseResourcesHeading from './ShowcaseResourcesHeading'
import ShowcaseResourcesImage from './ShowcaseResourcesImage'
import ShowcaseResourcesContentHeading from './ShowcaseResourcesContentHeading'
import ShowcaseResourcesContentDescription from './ShowcaseResourcesContentDescription'
import ShowcaseResourcesButton from './ShowcaseResourcesButton'
import SeparatorH1 from '@/components/util/SeparatorH1'

export default function ShowcaseResourcesContent() {
  return (
    <>
      <ShowcaseResourcesHeading />
      <div className="relative z-10 flex h-32 w-full gap-2 p-4 py-0">
        <ShowcaseResourcesImage />
        <div className="div flex h-full flex-col gap-2 overflow-hidden">
          {/* <ShowcaseResourcesContentHeading /> */}
          <ShowcaseResourcesContentDescription />
        </div>
      </div>
      <ShowcaseResourcesButton />
    </>
  )
}
