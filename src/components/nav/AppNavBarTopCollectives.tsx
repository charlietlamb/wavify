"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Corrected import
import { NavigationItem } from "./NavItem";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AppNavBarTopCollectives({
  collectives,
  user,
}: {
  collectives: Collective[];
  user: User;
}) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  useEffect(() => {
    const channel = supabase
      .channel("collectives_nav")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "users",
        },
        (payload) => {
          const newPayload = payload.new as { id: string; [key: string]: any };
          if (
            newPayload &&
            typeof newPayload === "object" &&
            newPayload.id === user.id
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

  return collectives.map((collective: Collective) => (
    <div key={collective.id} className="mr-1">
      <NavigationItem id={collective.id} name={collective["unique"]} />
    </div>
  ));
}
