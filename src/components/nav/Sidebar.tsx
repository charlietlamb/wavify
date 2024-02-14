"use server";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import NavigationAction from "./NavAction";
import { Separator } from "../ui/separator";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Link from "next/link";
import Image from "next/image";
import AppNavBarTopCollectives from "./AppNavBarTopCollectives";
import { getUserCollectives } from "./functions/getUserCollectives";

interface appNavBarTopProps {
  user: User;
}

export default async function Sidebar({ user }: appNavBarTopProps) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const collectives = await getUserCollectives(supabase, user);
  return (
    <div className="flex flex-col items-center w-full h-full px-8 space-y-4 text-primary bg-background">
      <NavigationAction></NavigationAction>
      <Separator className="h-[2px] bg-primary_light dark:bg-primary_dark rounded-md w-10 mx-auto"></Separator>
      <ScrollArea className="flex-1 w-full">
        <div className="flex flex-col justify-start">
          {!!collectives.length ? (
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
