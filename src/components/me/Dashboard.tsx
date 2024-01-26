"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import DashboardAvatar from "./DashboardAvatar";
import { useRouter } from "next/navigation";


interface dashboardProps{
  user: User
}

export default function Dashboard({user}:dashboardProps) {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
    router.refresh()

  };
  return (
    <div className="flex flex-row account-wrap w-[100%] p-8">
        <div className="w-[20vw] flex flex-col bg-grey">
            <DashboardAvatar user={user}/>
            <button onClick={handleSignOut}> Sign Out </button>
        </div>
        <div className="flex flex-grow account-right">

        </div>
    </div>
  )
}
