import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Sorting } from '@/components/dashboard/resources/manage/data/data'
import { WavifyType } from '../data/wavifyTypes'
import { getUserFromId } from '@/components/files/functions/getUserFromId'
import { getCollectiveFromId } from '@/components/nav/functions/getCollectiveFromId'
import { getSpaceFromId } from './getSpaceFromId'
import { getProductFromId } from './getProductFromId'
import { getResourceFromId } from './getResourceFromId'
import { getCollectionFromId } from './getCollectionFromId'

export const getSavedItems = async ({
  pageParam,
  user,
  type,
  sorting,
  searchQuery,
  selectedIds = '',
  collection = null,
}: {
  pageParam: number | undefined
  user: User
  type: WavifyType | null
  sorting: Sorting
  searchQuery: string
  selectedIds?: string
  collection?: string | null
}) => {
  if (pageParam === undefined) throw new Error('No page param')
  const supabase = createClientComponentClient()
  const startIndex = (pageParam - 1) * 16
  const endIndex = startIndex + 16
  let query = supabase.from('saves').select().eq('user', user.id)
  if (collection) query = query.eq('collection', collection)
  if (type) query = query.not(type, 'is', null)
  if (searchQuery !== '') query = query.ilike('name', `%${searchQuery}%`)
  if (!!selectedIds.length) query = query.not('id', 'in', selectedIds)

  if (sorting === 'newest') {
    query = query.order('createdAt', { ascending: false })
  } else if (sorting === 'oldest') {
    query = query.order('createdAt', { ascending: true })
  } else if (sorting === 'popular') {
    query = query.order('downloads', { ascending: false })
  } else if (sorting === 'unpopular') {
    query = query.order('downloads', { ascending: true })
  } else if (sorting === 'largest') {
    query = query.order('size', { ascending: false })
  } else if (sorting === 'smallest') {
    query = query.order('size', { ascending: true })
  }
  query = query.range(startIndex, endIndex)
  const { data, error } = await query
  if (error) throw error
  const toReturn = []
  for (const initItem of data) {
    if (initItem.collective) {
      const collective = await getCollectiveFromId(
        supabase,
        initItem.collective
      )
      const colUser = await getUserFromId(supabase, collective.founder)
      toReturn.push({
        id: collective.id,
        name: collective.unique,
        text: 'Collective',
        href: `/collective/${collective.unique}`,
        user: colUser.id,
        imageUrl: collective.imageUrl,
        saved: initItem.id,
        users: colUser,
      } as ItemAndUser)
    } else if (initItem.space) {
      const space = await getSpaceFromId(supabase, initItem.space)
      const collective = await getCollectiveFromId(supabase, space.collective)
      if (!collective) return
      const spaceUser = await getUserFromId(supabase, collective.founder || '')
      if (!spaceUser) return
      toReturn.push({
        id: space.id,
        name: `${collective.unique}/${space.slug}`,
        text: 'Space',
        href: `/collective/${collective?.unique}/${space.slug}`,
        user: spaceUser.id,
        imageUrl: collective.imageUrl,
        saved: initItem.id,
        users: spaceUser,
      } as ItemAndUser)
    } else if (initItem.product) {
      const product = await getProductFromId(supabase, initItem.product)
      const prodUser = await getUserFromId(supabase, product.user)
      toReturn.push({
        id: product.id,
        name: product.name,
        text: 'Product',
        href: `/product/${product.id}`,
        user: prodUser.id,
        imageUrl: product.imageUrl,
        saved: initItem.id,
        users: prodUser,
      } as ItemAndUser)
    } else if (initItem.resource) {
      const resource = await getResourceFromId(supabase, initItem.resource)
      const resUser = await getUserFromId(supabase, resource.user)
      toReturn.push({
        id: resource.id,
        name: resource.name,
        text: 'Resource',
        href: `/resource/${resource.id}`,
        user: resUser.id,
        imageUrl: resource.imageUrl,
        saved: initItem.id,
        users: resUser,
      } as ItemAndUser)
    } else if (initItem.collection) {
      const collection = await getCollectionFromId(
        supabase,
        initItem.collection
      )
      const colUser = await getUserFromId(supabase, collection.user)
      toReturn.push({
        id: collection.id,
        name: collection.name,
        text: 'Collection',
        href: `/collection/${collection.id}`,
        user: colUser.id,
        imageUrl: collection.imageUrl,
        users: colUser,
        saved: initItem.id,
      } as ItemAndUser)
    } else if (initItem.member) {
      const memUser = await getUserFromId(supabase, initItem.members.id)
      toReturn.push({
        id: memUser.id,
        name: memUser.username,
        text: 'Member',
        href: `/user/${memUser.username}`,
        user: memUser.id,
        imageUrl: memUser.imageUrl,
        saved: initItem.id,
        users: memUser,
      } as ItemAndUser)
    }
  }
  return toReturn as ItemAndUser[]
}
