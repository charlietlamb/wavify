import { Dispatch, SetStateAction } from "react";
import SpaceRole from "./SpaceRole";

export default function SpaceRoles({
  rolesAndAllowed,
  setRolesAndAllowed,
}: {
  rolesAndAllowed: RoleAndAllowed[];
  setRolesAndAllowed: Dispatch<SetStateAction<RoleAndAllowed[]>>;
}) {
  return (
    <div className="flex gap-x-2 gap-y-2 flex-wrap">
      {rolesAndAllowed?.map((role) => (
        <SpaceRole
          key={role.id}
          roleAndAllowed={role}
          setRolesAndAllowed={setRolesAndAllowed}
        />
      ))}
    </div>
  );
}
