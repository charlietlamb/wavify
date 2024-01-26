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

export default async function AppNavBarTop({ user }: appNavBarTopProps) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  var hasCollectives = false;
  var collectives = [];
  if (!user.collectives) {
    console.log("no collectives found!");
  } else {
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
    <div className="flex flex-row items-center w-full space-x-4 text-primary bg-background min-h-[5vh] px-8">
      <div className="flex flex-row items-center justify-center navbar-left">
        <div className="navbar-heading-wrap">
          <Link href="/">
            <Image
              src="/w-logo.png"
              alt="Wavify"
              width={1024}
              height={1024}
              className="w-[2.5vw] min-w-[3rem] height-auto"
            />
          </Link>
        </div>
      </div>
      <NavigationAction></NavigationAction>
      <Separator className="w-[2px] bg-primary_light dark:bg-primary_dark rounded-md h-10 my-auto"></Separator>
      <ScrollArea className="flex-row flex-1 h-full">
        <div className="flex flex-row justify-start">
          {!!hasCollectives ? (
            <AppNavBarTopCollectives collectives={collectives} user={user} />
          ) : (
            <div>no collectives</div>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
