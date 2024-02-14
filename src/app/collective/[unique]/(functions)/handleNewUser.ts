import { redirect } from "next/navigation";
import { addUser } from "./addUser";

export async function handleNewUser(
  user: User,
  collective: Collective,
  supabase: Supabase,
  unique: string,
  defaultRole: Role
) {
  if (collective.type === "public") {
    return (await addUser(
      user,
      collective,
      supabase,
      unique,
      defaultRole
    )) as unknown as ColUserAndData;
  } else {
    redirect("/");
  }
}
