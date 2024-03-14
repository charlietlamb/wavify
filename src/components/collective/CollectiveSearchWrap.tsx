'use client'

import { useEffect, useState } from 'react'
import { getData } from './(sidebar)/(functions)/getData'
import CollectiveSearch from './CollectiveSearch'
import { useCollective } from '@/state/collective/useCollective'
import { useUser } from '@/state/user/useUser'

export default function CollectiveSearchWrap({ small }: { small?: boolean }) {
  const user = useUser()
  const { spaces, colUsers, colUser, collective } = useCollective()
  const [filteredSpaces, setFilteredSpaces] = useState<Space[] | null>(
    collective.founder === user.id
      ? spaces
      : spaces.filter(
          (space: Space) =>
            space.allowed.includes(colUser.roles?.id) || space.open
        )
  )
  useEffect(() => {
    setFilteredSpaces(
      collective.founder === user.id
        ? spaces
        : spaces.filter(
            (space: Space) =>
              space.allowed.includes(colUser.roles?.id) || space.open
          )
    )
  }, [spaces])
  const newData = filteredSpaces
    ? (getData(filteredSpaces, colUsers) as unknown as SearchData)
    : ([] as unknown as SearchData)
  const [data, setData] = useState<SearchData>(newData)
  useEffect(() => {
    const newData = filteredSpaces
      ? (getData(filteredSpaces, colUsers) as unknown as SearchData)
      : ([] as unknown as SearchData)
    setData(newData)
  }, [colUsers])
  return (
    <CollectiveSearch
      data={filteredSpaces ? data : ([] as unknown as SearchData)}
      small={small}
    />
  )
}
