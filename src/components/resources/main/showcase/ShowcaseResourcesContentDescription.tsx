import React from 'react'
import { useShowcaseResourceContext } from './context/showcaseResourceContext'

export default function ShowcaseResourcesContentDescription() {
  const { file, resource } = useShowcaseResourceContext()
  if (!file) return null
  return (
    <div className="flex-grow overflow-y-auto">
      <p className="text-zinc-400">{resource.description}</p>
    </div>
  )
}
