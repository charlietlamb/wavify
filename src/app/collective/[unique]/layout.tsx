"use server";
import { redirect } from "next/navigation";
import getUser from "@/app/actions/getUser";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import CollectiveSidebar from "@/components/collective/CollectiveSidebar";
import { getCollective } from "./[space_slug]/(functions)/getCollective";
import isObject from "@/lib/isObject";
import { removeCollective } from "./(functions)/removeCollective";
import { getColUser } from "./(functions)/getColUser";
import { handleNewUser } from "./(functions)/handleNewUser";
import { collectiveHasUser } from "./(functions)/collectiveHasUser";
import { getUserIds } from "./(functions)/getUserIds";
import { handleKickedUser } from "./(functions)/handleKickedUser";

const CollectiveLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { unique: string };
}) => {
  //redirects to / when user joins
  const supabase = createServerComponentClient({ cookies });
  const user = await getUser();
  if (!isObject(user)) return redirect("/account");
  const collective = await getCollective(supabase, params.unique);
  if (!collective) {
    removeCollective(user, params.unique, supabase);
    redirect("/");
  }
  if (!Array.isArray(collective.users) || !Array.isArray(collective.roles))
    return redirect("/");
  await handleKickedUser(user, collective, supabase);
  if (!collectiveHasUser(user, collective)) {
    const newUser = await handleNewUser(
      user,
      collective,
      supabase,
      params.unique
    );
    if (newUser) collective.users.push(newUser);
  }
  const userIds = getUserIds(collective);
  const { data } = await supabase.from("users").select().in("id", userIds);
  const users: User[] = data as User[];
  const colUser = getColUser(user, collective);
  if (!colUser) return redirect("/");
  return (
    <div className="flex flex-grow max-h-[80vh] min-h-[80vh]">
      <div className="flex-col hidden h-full md:flex w-60">
        <CollectiveSidebar
          unique={params.unique}
          user={user}
          collective={collective}
          colUser={colUser}
          userData={users}
        />
      </div>
      <div className="w-full h-full">{children}</div>
    </div>
  );
};

export default CollectiveLayout;
