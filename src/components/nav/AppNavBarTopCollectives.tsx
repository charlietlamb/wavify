"use client";

import { useState } from "react";
import { NavigationItem } from "./NavItem";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useUserCollectivesUpdateEffect } from "./hooks/useUserCollectivesUpdateEffect";
import { useGetCollectivesOnRefreshEffect } from "./hooks/useGetCollectivesOnRefreshEffect";

export default function AppNavBarTopCollectives({
  collectives: initCollectives,
  user,
}: {
  collectives: Collective[];
  user: User;
}) {
  const supabase = createClientComponentClient();
  const [collectives, setCollectives] = useState(initCollectives);
  useGetCollectivesOnRefreshEffect(supabase, user, setCollectives);
  useUserCollectivesUpdateEffect(
    supabase,
    collectives,
    setCollectives,
    user,
    "navbar"
  );

  return !!collectives.length ? (
    collectives.map((collective: Collective) => (
      <div key={collective.id} className="mr-1">
        <NavigationItem collective={collective} />
      </div>
    ))
  ) : (
    <div>no collectives</div>
  );
}
