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

export default async function AppNavBarTop({ user }: { user: User }) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const collectives: Collective[] = await getUserCollectives(supabase, user);
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
          <AppNavBarTopCollectives collectives={collectives} user={user} />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
