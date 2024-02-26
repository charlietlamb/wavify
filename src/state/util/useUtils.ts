import { useAppSelector } from '../hooks'
import { RootState } from '../store'

export function useUtils() {
  const { spaceDrag, spaceDragType } = useAppSelector(
    (state: RootState) => state.util
  )
  return { spaceDrag, spaceDragType }
}
