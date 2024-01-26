"use server";
import { redirect } from "next/navigation";
import getUser from "@/app/actions/getUser";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import CollectiveSidebar from "@/components/collective/CollectiveSidebar";

const CollectiveLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { unique: string };
}) => {
  const supabase = createServerComponentClient({ cookies });
  const user = await getUser();
  if (!user) {
    return redirect("/account");
  }
  let { data: collective, error } = await supabase
    .from("collectives")
    .select()
    .eq("unique", params.unique)
    .single();
  if (!collective) {
    if (Array.isArray(user.collectives)) {
      var updatedCollectives: Json = user.collectives.filter(
        (collective) =>
          collective &&
          typeof collective === "object" &&
          !Array.isArray(collective) &&
          collective.unique !== params.unique
      );
      if (user.collectives !== updatedCollectives) {
        await supabase
          .from("users")
          .update({ collectives: updatedCollectives })
          .eq("id", user.id);
      }
    }
    return redirect("/");
  }
  interface ColUser {
    id: string;
  }
  var colUser = null;

  if (
    collective.users &&
    collective.users.some((col_user: ColUser) => col_user.id === user.id)
  ) {
    colUser = collective.users.find(
      (col_user: ColUser) => col_user.id === user.id
    );
  } else {
    if (
      Array.isArray(user.collectives) &&
      user.collectives.some(
        (collectiveToCheck: Json) =>
          collectiveToCheck &&
          !Array.isArray(collectiveToCheck) &&
          typeof collectiveToCheck === "object" &&
          collective.id === collectiveToCheck.id
      )
    ) {
      const updatedCollectives = user?.collectives.filter(
        (collectiveToGo): collectiveToGo is Json => {
          return (
            collectiveToGo != null &&
            typeof collectiveToGo === "object" &&
            !Array.isArray(collectiveToGo) &&
            collective.id !== collectiveToGo.id
          );
        }
      );
      await supabase
        .from("users")
        .update({ collectives: updatedCollectives })
        .eq("id", user.id);
      return redirect("/");
    } else {
      if (collective.type === "public") {
        const defaultRole = collective.roles.find(
          (role: Role) => role.isDefault === true
        );
        var updateUsers = [
          ...collective.users,
          {
            id: user.id,
            role: defaultRole.name,
            roleId: defaultRole.id,
            username: user.username,
          },
        ];
        await supabase
          .from("collectives")
          .update({ users: updateUsers })
          .eq("id", collective.id);
        if (Array.isArray(user.collectives)) {
          await supabase
            .from("users")
            .update({
              collectives: [
                ...user.collectives,
                { id: collective.id, unique: params.unique },
              ],
            })
            .eq("id", user.id);
        } else {
          await supabase
            .from("users")
            .update({
              collectives: [{ id: collective.id, unique: params.unique }],
            })
            .eq("id", user.id);
        }
      } else {
        return redirect("/");
      }
    }
  }
  const userIds = collective.users.map((user: colUser) => user.id);
  const { data } = await supabase.from("users").select().in("id", userIds);
  const users: User[] = data as User[];
  return (
    <div className="flex flex-row h-full">
      <div className="flex-col hidden h-full md:flex w-60">
        <CollectiveSidebar
          unique={params.unique}
          user={user}
          collective={collective}
          colUser={colUser}
          userData={users}
        />
      </div>
      <main className="h-full">{children}</main>
    </div>
  );
};

export default CollectiveLayout;
