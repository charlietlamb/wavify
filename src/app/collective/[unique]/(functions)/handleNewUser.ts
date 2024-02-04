import { redirect } from "next/navigation";
import { addUser } from "./addUser";

export async function handleNewUser(
  user: User,
  collective: Collective,
  supabase: Supabase,
  unique: string
) {
  if (collective.type === "public") {
    return await addUser(user, collective, supabase, unique);
  } else {
    redirect("/");
    return undefined;
  }
}
