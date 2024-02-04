"use server";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import NavigationAction from "./NavAction";
import { Separator } from "../ui/separator";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Link from "next/link";
import Image from "next/image";
import AppNavBarTopCollectives from "./AppNavBarTopCollectives";

interface appNavBarTopProps {
  user: User;
}

type UserCollective = {
  id: string;
  unique: string;
};

export default async function Sidebar({ user }: appNavBarTopProps) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  var hasCollectives = false;
  var collectives = [];
  if (user.collectives) {
    var collectiveIds;
    if (Array.isArray(user.collectives)) {
      collectiveIds = user.collectives.map(
        (col) => col && typeof col === "object" && !Array.isArray(col) && col.id
      );
    }
    const { data } = await supabase
      .from("collectives")
      .select("*")
      .in("id", Array.isArray(collectiveIds) ? collectiveIds : []);
    if (data) {
      hasCollectives = true;
      collectives = Array.isArray(data) ? data : [data];
    }
  }
  return (
    <div className="flex flex-col items-center w-full h-full px-8 space-y-4 text-primary bg-background">
      <NavigationAction></NavigationAction>
      <Separator className="h-[2px] bg-primary_light dark:bg-primary_dark rounded-md w-10 mx-auto"></Separator>
      <ScrollArea className="flex-1 w-full">
        <div className="flex flex-col justify-start">
          {!!hasCollectives ? (
            <AppNavBarTopCollectives collectives={collectives} user={user} />
          ) : (
            <div>no collectives</div>
          )}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
}
