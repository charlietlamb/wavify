"use client";

import { useEffect, useState } from "react";
import { CollectiveMember } from "./CollectiveMember";
import CollectiveSection from "./CollectiveSection";
import { useColUserUpdateEffect } from "./hooks/useColUserUpdateEffect";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

export default function CollectiveMemberMap({
  initColUsers,
  user,
  collective,
  roles,
}: {
  initColUsers: ColUserAndData[];
  user: User;
  collective: Collective;
  roles: Role[];
}) {
  const supabase = createClientComponentClient();
  const [colUsers, setColUsers] = useState<ColUserAndData[]>(initColUsers);
  const [colUser, setColUser] = useState<ColUserAndData | null>(null);
  useColUserUpdateEffect(
    supabase,
    user,
    colUsers,
    setColUsers,
    collective,
    "_memberMap"
  );

  useEffect(() => {
    const newColUser = colUsers.find(
      (colUser) => colUser.users?.id === user.id
    );
    if (!newColUser) redirect("/");
    setColUser(newColUser);
  }, [colUsers]);
  return (
    <div className="mb-2">
      <CollectiveSection
        sectionType="users"
        user={user}
        label="Members"
        collective={collective}
        colUser={colUser}
        colUsers={colUsers}
        roles={roles}
      />
      <div className="space-y-[2px]">
        {colUsers.map((colUser1) => {
          return (
            <CollectiveMember
              key={colUser1?.id}
              colUserAndData={colUser1}
              user={user}
            />
          );
        })}
      </div>
    </div>
  );
}
