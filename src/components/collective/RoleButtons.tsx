import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ButtonLoader from "../me/ButtonLoader";
import { createRole } from "./roles/createRole";
import { saveRoles } from "./roles/saveRoles";

export default function RoleButtons({
  roles,
  setRoles,
  collective,
  supabase,
}: {
  roles: Role[];
  setRoles: Dispatch<SetStateAction<Role[]>>;
  collective: Collective;
  supabase: Supabase;
}) {
  const [createLoading, setCreateLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  /*
        <ButtonLoader
          onClick={() => saveRoles(roles, supabase, setSaveLoading)}
          isLoading={saveLoading}
          text="Save Roles"
        ></ButtonLoader>
         */
  return (
    <div className="flex justify-end w-full mt-4">
      <div className="flex space-x-4">
        <ButtonLoader
          onClick={() =>
            createRole(roles, setRoles, setCreateLoading, collective)
          }
          isLoading={createLoading}
          text="Create Role"
        ></ButtonLoader>
      </div>
    </div>
  );
}
