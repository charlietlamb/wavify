import isObject from "@/lib/isObject";
import { v4 as uuidv4 } from "uuid";

export async function addUser(
  user: User,
  collective: Collective,
  supabase: Supabase,
  unique: string,
  defaultRole: Role
) {
  var updateUsers = [...collective.users, user.id];
  const { error } = await supabase
    .from("collectives")
    .update({ users: updateUsers })
    .eq("id", collective.id);
  if (error) throw error;
  const { error: error2 } = await supabase
    .from("users")
    .update({
      collectives: Array.isArray(user.collectives)
        ? [...user.collectives, { id: collective.id, unique }]
        : [{ id: collective.id, unique }],
    })
    .eq("id", user.id);
  if (error2) throw error2;
  /*currently just changed the way colUsers work by adding users to be foreign key and giving each colUser a unique id
    so now just fixing that implementaion */
  const { error: error3 } = await supabase
    .from("colUsers")
    .insert({
      id: uuidv4(),
      role: defaultRole.name,
      roleId: defaultRole.id,
      collective: collective.id,
      user: user.id,
    })
    .select();
  if (error3) throw error3;
  return updateUsers;
}
