"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export async function saveRolesBackground(
  roles: Role[],
  colUser: ColUserAndData
) {
  const supabase = createServerComponentClient({ cookies });
  try {
    await Promise.all(
      roles.map(async (role, index) => {
        const { error } = await supabase
          .from("roles")
          .upsert({ ...role, authority: index });
        if (error) throw error;
      })
    );
  } catch (error) {
    console.error("Failed to save roles:", error);
  }
}
