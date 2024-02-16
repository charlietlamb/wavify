"use client";

import { useState } from "react";
import RoleButtons from "./RoleButtons";
import RolesMap from "./RolesMap";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function CollectiveRoles({
  collective,
  roles,
  colUser,
}: {
  collective: Collective;
  roles: Role[];
  colUser: ColUserAndData;
}) {
  const [roles1, setRoles1] = useState<Role[]>(roles);
  const supabase = createClientComponentClient();
  return (
    <div className="flex flex-col items-center w-full h-full py-4 space-y-2">
      <div className="flex w-full ">
        <h2 className="text-6xl font-semibold px-[4%]">Manage Roles</h2>
      </div>
      <div className="w-[92%] overflow-y-auto">
        <RolesMap
          roles={roles1}
          setRoles={setRoles1}
          collective={collective}
          colUser={colUser}
        ></RolesMap>
        <RoleButtons
          roles={roles1}
          setRoles={setRoles1}
          collective={collective}
          supabase={supabase}
          colUser={colUser}
        ></RoleButtons>
      </div>
    </div>
  );
}
