import { Button } from '@/components/ui/button'
import { useShowcaseResourceContext } from './context/showcaseResourceContext'

export default function ShowcaseResourcesButton() {
  const { resource } = useShowcaseResourceContext()
  return (
    <div className="relative z-10 w-full p-4 pt-2">
      <Button variant="zinc" className="w-full">
        More about {resource.name}
      </Button>
    </div>
  )
}
