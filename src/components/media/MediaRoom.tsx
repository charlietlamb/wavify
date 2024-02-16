"use client";

import { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import MediaRoomSkeleton from "./MediaRoomSkeleton";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
  user: User;
  collective?: Collective;
  otherUser?: User;
}

export const MediaRoom = ({
  chatId,
  video,
  audio,
  user,
  collective,
  otherUser,
}: MediaRoomProps) => {
  const [token, setToken] = useState("");
  const router = useRouter();
  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(
          `/api/livekit?room=${chatId}&username=${user.username}`
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        throw e;
      }
    })();
  }, [user?.username, chatId]);

  return token === "" ? (
    <MediaRoomSkeleton />
  ) : (
    <div className="flex overflow-y-auto max-h-full">
      <LiveKitRoom
        data-lk-theme="default"
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        token={token}
        connect={true}
        video={video}
        audio={audio}
        onDisconnected={() => {
          router.push(
            collective
              ? `/collective/${collective?.unique}`
              : `/user/${otherUser?.username}`
          );
        }}
      >
        <VideoConference className=" lk-video-conference bg-background_content min-h-full" />
      </LiveKitRoom>
    </div>
  );
};
