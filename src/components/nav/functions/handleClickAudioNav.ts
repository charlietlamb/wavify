import { Dispatch, SetStateAction } from "react";
import { setIsPlaying } from "@/state/audio/audioSlice";
import { Dispatch as DispatchRedux } from "@reduxjs/toolkit";
export function handleClickAudioNav(
  dispatch: DispatchRedux<any>,
  isPlaying: boolean,
  setIsPlayingSingle: Dispatch<SetStateAction<boolean>>
) {
  setIsPlayingSingle(!isPlaying);
  dispatch(setIsPlaying(!isPlaying));
}
