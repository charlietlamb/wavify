"use client";
import { AudioState } from "@/state/audio/audioSlice";
import { RootState } from "@/state/store";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Pause, Play } from "lucide-react";
import { Progress } from "../ui/progress";
import { handleClickAudioNav } from "./functions/handleClickAudioNav";

import {
  setProgress as setProgressAction,
  setTimeRemaining as setTimeRemainingAction,
} from "@/state/audio/audioSlice";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function AudioNav() {
  const audio: AudioState = useSelector((state: RootState) => state.audio);
  const audioStore = useRef<AudioState>(audio);
  const [isPlaying, setIsPlaying] = useState(audio.isPlaying);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (!audio.fileData) return;
    setIsPlaying(audio.isPlaying);
    setTimeRemaining(audio.timeRemaining);
    setProgress(audio.progress);
    audioStore.current = audio;
    if (
      (audioStore.current &&
        audioStore.current.fileData &&
        audio.fileData.fileId !== audioStore.current.fileData.fileId) ||
      !audioStore.current.fileData
    ) {
      //set user and pp
    }
  }, [audio]);

  if (!audio.fileData) return null;
  return (
    <div className="flex ">
      <button
        onClick={() => handleClickAudioNav(dispatch, isPlaying, setIsPlaying)}
      >
        {!isPlaying ? <Play fill="#FFF"></Play> : <Pause fill="#FFF"></Pause>}
      </button>
      <div className="flex rounded-sm hover:bg-zinc-800">
        <Popover>
          <PopoverTrigger className="flex gap-x-1">
            <p>{new Date(timeRemaining * 1000).toISOString().substr(14, 5)}</p>
            <Image
              src={audio.imageSrc}
              alt="Music Player Image"
              width={128}
              height={128}
              className="rounded-[0.5rem] hover:rounded[0.25-rem] w-[1.5rem] h-[1.5rem]"
            ></Image>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-y-2 pr-4">
              <div className="flex gap-x-2">
                <Image
                  src={/*audio.imageSrc*/ "https://github.com/shadcn.png"}
                  alt="artist"
                  width={1024}
                  height={1024}
                  className="w-[4rem] h-[4rem] rounded-lg hover:rounded-md"
                ></Image>
                <div className="flex flex-col text-left">
                  <Button
                    variant="link"
                    className="text-zinc-400 text-left p-0 justify-start h-auto"
                    onClick={() => router.push(`/user/${audio.user?.username}`)}
                  >
                    @{audio.user?.username}
                  </Button>
                  <h3 className="text-md font-bold">
                    {audio.fileData.fileName}
                  </h3>
                </div>
              </div>
              <div className="flex gap-x-2 w-full items-center">
                <button
                  onClick={() =>
                    handleClickAudioNav(dispatch, isPlaying, setIsPlaying)
                  }
                >
                  {!isPlaying ? (
                    <Play fill="#FFF"></Play>
                  ) : (
                    <Pause fill="#FFF"></Pause>
                  )}
                </button>
                <Progress
                  value={progress}
                  className="w-full bg-zinc-700 cursor-pointer"
                  foregroundClasses="bg-zinc-400"
                  onClick={(e) => {
                    if (!progressRef.current) return;
                    const rect = progressRef.current.getBoundingClientRect();
                    const x = e.clientX - rect.left; // x position within the element
                    const width = rect.right - rect.left; // width of the element
                    const percentage = x / width; // percentage of the clicked position in the element
                    setProgress(percentage * 100);
                    dispatch(setProgressAction(percentage * 100));
                    setTimeRemaining(
                      audio.duration - percentage * audio.duration
                    );
                    dispatch(
                      setTimeRemainingAction(
                        audio.duration - percentage * audio.duration
                      )
                    );
                  }}
                  ref={progressRef}
                  onMouseDown={() => setIsMouseDown(true)}
                  onMouseUp={() => setIsMouseDown(false)}
                  onMouseMove={(e) => {
                    if (isMouseDown && progressRef.current) {
                      const rect = progressRef.current.getBoundingClientRect();
                      const x = e.clientX - rect.left; // x position within the element
                      const width = rect.right - rect.left; // width of the element
                      const percentage = x / width; // percentage of the clicked position in the element
                      setProgress(percentage * 100);
                      dispatch(setProgressAction(percentage * 100));
                      setTimeRemaining(
                        audio.duration - percentage * audio.duration
                      );
                      dispatch(
                        setTimeRemainingAction(
                          audio.duration - percentage * audio.duration
                        )
                      );
                    }
                  }}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={() => setIsDragging(false)}
                ></Progress>
                <p>
                  {new Date(timeRemaining * 1000).toISOString().substr(14, 5)}
                </p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
