import { useEffect } from "react";
import { getColUserDataFromId } from "../(sidebar)/(functions)/getColUserDataFromId";
import { redirect } from "next/navigation";

export function useColUserUpdateEffect(
  supabase: Supabase,
  user: User,
  colUsers: ColUserAndData[],
  setColUsers: React.Dispatch<React.SetStateAction<ColUserAndData[]>>,
  collective: Collective,
  channelUnqiue: string
) {
  useEffect(() => {
    if (!collective) return;
    const channel = supabase
      .channel("colUsersUpdated" + channelUnqiue)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "colUsers",
        },
        async (payload) => {
          const newPayload = payload.new as { id: string; [key: string]: any };
          if (
            newPayload &&
            typeof newPayload === "object" &&
            collective.id === newPayload.collective &&
            payload.eventType !== "DELETE"
          ) {
            const changedColUser = await getColUserDataFromId(
              supabase,
              newPayload.id
            );
            if (!changedColUser) return;
            const newColUsers = [
              ...colUsers?.filter((cUser) => cUser.id !== newPayload.id),
              changedColUser,
            ];
            setColUsers(newColUsers);
          } else {
            if (payload.eventType === "DELETE") {
              const deletedId = payload.old.id;
              if (
                Array.isArray(colUsers) &&
                colUsers?.some((colUser) => colUser.id === deletedId)
              ) {
                setColUsers(
                  colUsers?.filter((colUser) => colUser.id !== deletedId)
                );
              }
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, collective]);
}
