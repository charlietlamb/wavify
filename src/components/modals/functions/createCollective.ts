import { v4 as uuidv4 } from "uuid";

export async function createCollective(
  user: User,
  id: string,
  supabase: Supabase,
  username: string
) {
  var newCollective = null;
  var updatedCollectives;
  if (!Array.isArray(user.collectives)) {
    newCollective = [{ id, unique: username }];
  } else {
    updatedCollectives = [...user.collectives, { id, unique: username }];
  }
  const roleId = uuidv4();
  const roleId2 = uuidv4();
  const { error } = await supabase.from("collectives").insert({
    id,
    unique: username,
    users: [user.id],
    roles: [roleId, roleId2],
    founder: user.id,
  });
  const { error: roleError } = await supabase.from("roles").insert({
    id: roleId,
    name: "founder",
    authority: 0,
    canInvite: true,
    canSettings: true,
    canRoles: true,
    canMembers: true,
    canCreate: true,
    canDelete: true,
    canMessages: true,
    emoji: "👑",
    color: "#FFFFFF",
    collective: id,
  });
  if (roleError) throw roleError;

  const { data: roleData2, error: roleError2 } = await supabase
    .from("roles")
    .insert({
      id: roleId2,
      name: "new",
      authority: 1,
      canInvite: false,
      canSettings: false,
      canRoles: false,
      canMembers: true,
      canCreate: false,
      canDelete: false,
      canMessages: false,
      emoji: "👋",
      color: "#FFFFFF",
      collective: id,
    })
    .select();
  if (roleError) throw roleError;

  const { data: colUserData, error: colUserError } = await supabase
    .from("colUsers")
    .insert({
      id: uuidv4(),
      role: "founder",
      roleId: roleId,
      collective: id,
      user: user.id,
    })
    .select();
  if (colUserError) throw colUserError;

  const { data: userData, error: userError } = await supabase
    .from("users")
    .update({ collectives: updatedCollectives })
    .eq("id", user.id);

  if (userError) throw userError;

  return error || roleError || roleError2 || colUserError || userError;
}
