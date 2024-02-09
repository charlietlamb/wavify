import { RoleItemContext } from "./context";

export async function deleteRole(
  supabase: Supabase,
  context: RoleItemContext,
  setDeleteLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  setDeleteLoading(true);
  const newRoles: Role[] = context.roles.filter(
    (role) => role.id !== context.role.id
  );
  context.setRoles(newRoles);
  const { error } = await supabase
    .from("roles")
    .delete()
    .eq("id", context.role.id);
  if (error) throw error;
  setDeleteLoading(false);
}
