import { getCollective } from "@/app/collective/[unique]/[space_slug]/(functions)/getCollective";
import isObject from "@/lib/isObject";
import { useEffect } from "react";
import { getCollectiveFromId } from "../functions/getCollectiveFromId";
import { getUpdatedCollectives } from "../functions/getUpdatedCollectives";

export function useUserCollectivesUpdateEffect(
  supabase: Supabase,
  collectives: Collective[],
  setCollectives: React.Dispatch<React.SetStateAction<Collective[]>>,
  user: User,
  channelUnqiue: string
) {
  useEffect(() => {
    const channel = supabase
      .channel("colUsersUpdated" + channelUnqiue)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "users",
        },
        async (payload) => {
          const newPayload = payload.new as { id: string; [key: string]: any };
          if (isObject(newPayload) && user.id === newPayload.id) {
            const newCollectives = await getUpdatedCollectives(
              supabase,
              newPayload
            );
            setCollectives(newCollectives);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, user]);
}
