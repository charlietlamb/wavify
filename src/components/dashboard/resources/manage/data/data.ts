export const visibilities = ['all', 'public', 'draft']
export type Visibility = (typeof visibilities)[number]
export const sortingValues = [
  'newest',
  'oldest',
  'popular',
  'unpopular',
  'largest',
  'smallest',
]
export type Sorting = (typeof sortingValues)[number]
