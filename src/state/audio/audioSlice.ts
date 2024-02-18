import { createSlice } from "@reduxjs/toolkit";

export interface AudioState {
  fileData: FileData | null;
  user: User | null;
  isPlaying: boolean;
  progress: number;
  imageSrc: string;
  timeRemaining: number;
  duration: number;
}

const initialState: AudioState = {
  fileData: null,
  user: null,
  isPlaying: false,
  progress: 0,
  imageSrc: "",
  timeRemaining: 0,
  duration: 0,
};

const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    setFileData: (state, action) => {
      state.fileData = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    setImageSrc: (state, action) => {
      state.imageSrc = action.payload;
    },
    setTimeRemaining: (state, action) => {
      state.timeRemaining = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
  },
});

export const {
  setFileData,
  setUser,
  setIsPlaying,
  setProgress,
  setImageSrc,
  setTimeRemaining,
  setDuration,
} = audioSlice.actions;

export default audioSlice.reducer;
