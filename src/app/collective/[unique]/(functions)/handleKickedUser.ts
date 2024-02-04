import isObject from "@/lib/isObject";
import { deleteCollective } from "./deleteCollective";
import { redirect } from "next/navigation";

export async function handleKickedUser(
  user: User,
  collective: Collective,
  supabase: Supabase
) {
  if (
    Array.isArray(user.collectives) &&
    Array.isArray(collective.users) &&
    user.collectives.some(
      (collectiveToCheck: Json) =>
        isObject(collectiveToCheck) && collective.id === collectiveToCheck.id
    ) &&
    !collective.users.some(
      (userToCheck: Json) => isObject(userToCheck) && user.id === userToCheck.id
    )
  ) {
    await deleteCollective(user, collective, supabase);
    redirect("/");
  }
}
