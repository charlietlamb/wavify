import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import {default as DashboardComponent} from "@/components/me/Dashboard";
import { redirect } from 'next/navigation';
import SetupUser from "@/components/me/SetupUser";
import { Database } from "../types/supabase";
import getUser from "../actions/getUser";

type User = Database['public']['Tables']['users']['Row']

export default async function Dashboard() {
  const user = await getUser();
  if(!user){
    redirect('/account');
  }
  return (
    <>
      {user.setup_complete ? <DashboardComponent user={user} /> : <SetupUser user={user}/>}
    </>
  );
}
