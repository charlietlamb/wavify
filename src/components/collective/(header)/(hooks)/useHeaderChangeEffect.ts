import { SupabaseClient } from "@supabase/supabase-js";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useEffect } from "react";

export function useHeaderChangeEffect(
  supabase: SupabaseClient,
  user: User,
  collective: Collective,
  router: AppRouterInstance
) {
  useEffect(() => {
    const channel = supabase
      .channel("collectives_nav")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "collectives",
        },
        (payload) => {
          const newPayload = payload.new as { id: string; [key: string]: any };
          if (
            newPayload &&
            typeof newPayload === "object" &&
            newPayload.id === collective.id
          ) {
            router.refresh();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router, user.id]);
}
