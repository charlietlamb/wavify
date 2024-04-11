import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useUser } from '@/state/user/useUser'
import { cn } from '@/lib/utils'
import { useStoreContext } from './context/storeContext'
import { getStorePackages } from './functions/getStorePackages'
import { useResourceScroll } from '@/components/dashboard/resources/manage/hooks/useResourcesScroll'
import NothingFound from '@/components/collection/NothingFound'
import Package from './Package'
import WavifyCardSkeletons from '@/components/wavify/WavifyCardSkeletons'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { usePackageChangeEffect } from './hooks/usePackageChangeEffect'

export default function StorePackages() {
  const { packages, setPackages, space } = useStoreContext()
  const supabase = createClientComponentClient()
  const mainRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const {
    data: packagesPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['storePackages'],
    queryFn: ({ pageParam = 1 }) =>
      getStorePackages({
        pageParam,
        space,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length === 0) return undefined
      return allPages.length + 1
    },
  })
  useEffect(() => {
    if (status === 'success')
      setPackages((packagesPages?.pages?.flat() as PackageData[]) || [])
  }, [packagesPages])
  useEffect(() => {
    refetch()
  }, [space])

  usePackageChangeEffect(supabase, space, packages, refetch)

  useResourceScroll({
    resourceRef: mainRef,
    bottomRef,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    loadMore: fetchNextPage,
  })

  return (
    <div
      ref={mainRef}
      className={cn(
        'grid h-full w-full flex-grow grid-cols-1 gap-4 overflow-y-auto p-4 lg:grid-cols-2',
        !packages.length && status !== 'pending' && 'flex'
      )}
    >
      {!!packages.length ? (
        packages.map((storePackage) => (
          <Package package={storePackage} key={storePackage.id} />
        ))
      ) : status === 'pending' ? (
        <WavifyCardSkeletons />
      ) : (
        <NothingFound />
      )}
      <div className="h-px" ref={bottomRef}></div>
    </div>
  )
}
