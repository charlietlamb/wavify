import isObject from "@/lib/isObject";

export async function addUser(
  user: User,
  collective: Collective,
  supabase: Supabase,
  unique: string
) {
  const defaultRole = Array.isArray(collective.roles)
    ? collective.roles.find(
        (role: Json) => isObject(role) && role.isDefault === true
      )
    : [];
  const newUser = {
    id: isObject(user) ? user.id : "",
    role: isObject(defaultRole) ? defaultRole.name : "",
    roleId: isObject(defaultRole) ? defaultRole.id : "",
    username: user.username,
  };
  var updateUsers = Array.isArray(collective.users)
    ? [...collective.users, newUser]
    : [];
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
  return newUser;
}
