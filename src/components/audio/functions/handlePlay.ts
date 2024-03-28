import {
  AudioState,
  setDuration,
  setFileData,
  setImageSrc,
  setIsPlaying,
  setProgress,
  setTimeRemaining,
  setUser,
} from '@/state/audio/audioSlice'
import { Dispatch as DispatchRedux } from '@reduxjs/toolkit'
import { Dispatch, SetStateAction } from 'react'

export function handlePlay(
  audio: AudioState,
  dispatch: DispatchRedux<any>,
  isPlaying: boolean,
  setIsPlayingSingle: Dispatch<SetStateAction<boolean>>,
  artist: User,
  fileData: FileData,
  progress: number,
  audioFile: HTMLAudioElement | undefined,
  imageSrc: string,
  timeRemaining: number,
  duration: number | undefined
) {
  if (!audioFile || !duration) return
  setIsPlayingSingle(!isPlaying)
  dispatch(setIsPlaying(!isPlaying))
  if (!isPlaying) {
    audioFile.play()
    if (audio.fileData?.id !== fileData.id) {
      dispatch(setUser(artist))
      dispatch(setFileData(fileData))
      dispatch(setProgress(progress))
      dispatch(setImageSrc(imageSrc))
      dispatch(setTimeRemaining(timeRemaining))
      dispatch(setDuration(duration))
    }
  } else {
    audioFile.pause()
  }
}
