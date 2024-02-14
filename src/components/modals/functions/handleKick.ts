import { kickColUser } from "./kickColUser";

export async function handleKick(
  supabase: Supabase,
  colUser: ColUserAndData,
  colUsers: ColUserAndData[],
  collective: Collective
) {
  const toKick = await kickColUser(colUser, supabase);
  const newColUsers = colUsers.filter(
    (colUser: ColUserAndData) => colUser.id !== toKick?.id
  );
  return newColUsers;
}
