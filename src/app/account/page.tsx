import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import Unauthenticated from "@/components/me/Unauthenticated";
import { redirect } from 'next/navigation';

export default async function Account() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const {data: {session}} = await supabase.auth.getSession()

  if(session){
    redirect('/dashboard')
  }
  return (
    <>
      {<Unauthenticated />}
    </>
  );
}
