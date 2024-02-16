import {
  AudioState,
  setFileData,
  setIsPlaying,
  setProgress,
  setUser,
} from "@/state/audio/audioSlice";
import { Dispatch as DispatchRedux } from "@reduxjs/toolkit";
import { Dispatch, SetStateAction } from "react";

export function handlePlay(
  audio: AudioState,
  dispatch: DispatchRedux<any>,
  isPlaying: boolean,
  setIsPlayingSingle: Dispatch<SetStateAction<boolean>>,
  artist: User,
  fileData: FileData,
  progress: number,
  audioFile: HTMLAudioElement
) {
  setIsPlayingSingle(!isPlaying);
  dispatch(setIsPlaying(!isPlaying));
  if (!isPlaying) {
    audioFile.play();
    if (audio.fileData?.fileId !== fileData.fileId) {
      dispatch(setUser(artist));
      dispatch(setFileData(fileData));
      dispatch(setProgress(progress));
    }
  } else {
    audioFile.pause();
  }
}
