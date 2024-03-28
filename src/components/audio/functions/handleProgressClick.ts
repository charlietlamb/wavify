import { setMaster } from '@/state/audio/audioSlice'
import { Dispatch } from '@reduxjs/toolkit'

export function handleProgressClick(
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  audioFile: HTMLAudioElement | undefined,
  progressRef: React.RefObject<HTMLDivElement>,
  dispatch: Dispatch<any>
) {
  if (!audioFile) return
  dispatch(setMaster(false))
  if (!progressRef.current) return
  const rect = progressRef.current.getBoundingClientRect()
  const x = e.clientX - rect.left // x position within the element
  const width = rect.right - rect.left // width of the element
  const percentage = x / width // percentage of the clicked position in the element
  audioFile.currentTime = percentage * audioFile.duration
}
