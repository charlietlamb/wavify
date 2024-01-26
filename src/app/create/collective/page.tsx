import getUser from "@/app/actions/getUser";
import Create from "@/components/collective/Create";
import { CreateCollective } from "@/components/modals/CreateCollective";
import { redirect } from "next/navigation";

export default async function page() {

  const user = await getUser();
  if(!user){
    redirect('/account')
  }

  return (
    <CreateCollective user={user}></CreateCollective>
  )
}
