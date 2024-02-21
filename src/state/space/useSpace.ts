import { RootState } from '../store'
import { useSelector } from 'react-redux'

export function useSpace() {
  const { space } = useSelector((state: RootState) => state.space)
  if (!space) throw new Error('No space found')
  return space
}
