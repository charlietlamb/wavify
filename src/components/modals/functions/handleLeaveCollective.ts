import { getUpdatedCollectivesLeave } from "./getUpdatedCollectivesLeave";
import { getUpdatedUsers } from "./getUpdatedUsers";
import { getUserToLeave } from "./getUserToLeave";
import { updateUserCollectivesLeave } from "./updateUserCollectivesLeave";
import { updateUsersLeave } from "./updateUsersLeave";

export async function handleLeaveCollective(
  user: User,
  collective: Collective,
  supabase: Supabase
) {
  const updatedUsers = getUpdatedUsers(user, collective);
  await updateUsersLeave(supabase, updatedUsers, collective);
  const userToGo = await getUserToLeave(supabase, user);
  const updatedCollectives = getUpdatedCollectivesLeave(userToGo, collective);
  await updateUserCollectivesLeave(supabase, userToGo, updatedCollectives);
  collective.users = updatedUsers;
}
