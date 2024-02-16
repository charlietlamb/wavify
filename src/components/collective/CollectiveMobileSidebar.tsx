"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import CollectiveSidebar from "./CollectiveSidebar";
import { cookies } from "next/headers";
import { getColUsers } from "../modals/functions/getColUsers";
import { getRoles } from "@/app/collective/[unique]/roles/(functions)/getRoles";
import { getAllSpaces } from "@/app/collective/[unique]/(functions)/getAllSpaces";
export default async function CollectiveMobileSidebar({
  user,
  collective,
  colUser,
}: {
  user: User;
  collective: Collective;
  colUser: ColUserAndData;
}) {
  const supabase = createServerComponentClient({ cookies });
  const colUsers = await getColUsers(supabase, collective);
  const roles = await getRoles(collective, supabase);
  const spaces = await getAllSpaces(collective, supabase);
  return (
    <CollectiveSidebar
      user={user}
      collective={collective}
      colUser={colUser}
      colUsers={colUsers}
      roles={roles}
      colSpaces={spaces}
    />
  );
}
