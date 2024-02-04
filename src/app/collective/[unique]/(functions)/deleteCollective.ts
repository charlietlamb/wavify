import isObject from "@/lib/isObject";

export async function deleteCollective(
  user: User,
  collective: Collective,
  supabase: Supabase
) {
  const updatedCollectives = Array.isArray(user.collectives)
    ? user?.collectives.filter((collectiveToGo): collectiveToGo is Json => {
        return isObject(collectiveToGo) && collective.id !== collectiveToGo.id;
      })
    : [];
  await supabase
    .from("users")
    .update({ collectives: updatedCollectives })
    .eq("id", user.id);
}
