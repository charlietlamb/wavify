'use client'

import SeparatorH1 from '@/components/util/SeparatorH1'
import FeaturedResources from './featured/FeaturedResources'
import HottestResources from './hottest/HottestResources'
import ResourcesOptions from './options/ResourcesOptions'
import ShowcaseResources from './showcase/ShowcaseResources'
import ResourcesHero from './hero/ResourcesHero'
import { ResourcesMainContext } from './context/resourcesMainContext'
import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getShowcaseResources } from './functions/getShowcaseResources'
import { useAnimate } from 'framer-motion'

export default function Resources() {
  const supabase = createClientComponentClient()
  const [query, setQuery] = useState('')
  const [showcaseResources, setShowcaseResources] = useState<ResourceAndUser[]>(
    []
  )
  const [showcaseIndex, setShowcaseIndex] = useState(0)

  useEffect(() => {
    async function getData() {
      setShowcaseResources(await getShowcaseResources(supabase))
    }
    getData()
  })

  const [scope, animate] = useAnimate()

  useEffect(() => {
    const interval = setInterval(async () => {
      await animate('.wavify-card', { opacity: 0 }, { duration: 2 })
      setShowcaseIndex((showcaseIndex + 1) % showcaseResources.length)
      await animate('.wavify-card', { opacity: 1 }, { duration: 2 })
    }, 10000) //10 seconds
    return () => clearInterval(interval)
  }, [showcaseResources.length])
  return (
    <ResourcesMainContext.Provider
      value={{
        query,
        setQuery,
        showcaseResources,
        showcaseIndex,
        setShowcaseIndex,
      }}
    >
      <div
        className="flex w-full flex-col items-center overflow-y-auto bg-gradient-to-br from-zinc-950 to-zinc-900"
        ref={scope}
      >
        <ResourcesHero />
        <ShowcaseResources />
        <FeaturedResources />
        <HottestResources />
        <ResourcesOptions />
      </div>
    </ResourcesMainContext.Provider>
  )
}
