"use server";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function getUser(): Promise<User | null> {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return null;
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (error) {
      throw error;
      return null;
    }

    return user;
  } catch (err) {
    console.error("Error in getUser:", err);
    return null;
  }
}
