"use client";

import { useState } from "react";
import RoleButtons from "./RoleButtons";
import RolesMap from "./RolesMap";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function CollectiveRoles({
  collective,
  roles,
}: {
  collective: Collective;
  roles: Role[];
}) {
  const [roles1, setRoles1] = useState<Role[]>(roles);
  const supabase = createClientComponentClient();
  return (
    <div className="flex flex-col items-center w-full h-full py-4 space-y-2 overflow-clip">
      <div className="flex w-full ">
        <h2 className="text-6xl font-semibold px-[4%]">Manage Roles</h2>
      </div>
      <div className="w-[92%]">
        <RolesMap
          roles={roles1}
          setRoles={setRoles1}
          collective={collective}
        ></RolesMap>
        <RoleButtons
          roles={roles1}
          setRoles={setRoles1}
          collective={collective}
          supabase={supabase}
        ></RoleButtons>
      </div>
    </div>
  );
}
