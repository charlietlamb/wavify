import { RootState } from '../store'
import { useSelector } from 'react-redux'

export function useSpace() {
  const { saved } = useSelector((state: RootState) => state.space)
  return { saved }
}
