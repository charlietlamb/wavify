import { Dispatch, SetStateAction } from "react";

export async function updateRolesAndAllowed(
  supabase: Supabase,
  setRolesAndAllowed: Dispatch<SetStateAction<RoleAndAllowed[]>>,
  collective: Collective,
  space: Space
) {
  const { data: roles } = await supabase
    .from("roles")
    .select("*")
    .eq("collective", collective.id);

  roles &&
    setRolesAndAllowed(
      roles
        .map((role: RoleAndAllowed) => ({
          ...role,
          allowed: space.allowed.includes(role.id),
        }))
        .sort((a, b) => a.authority - b.authority)
    );
}
