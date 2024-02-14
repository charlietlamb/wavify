import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Dispatch, SetStateAction } from "react";

export async function isUsernameAvailable(
  usernameToCheck: string,
  setUsernameAvailable: Dispatch<SetStateAction<boolean>>,
  supabase: Supabase
) {
  if (!setUsernameAvailable || !supabase) return;
  if (usernameToCheck === "") {
    setUsernameAvailable(false);
    return;
  }
  const { data, error } = await supabase
    .from("collectives")
    .select("unique")
    .eq("unique", usernameToCheck);

  if (error) {
    console.error("Error checking username:", error);
    setUsernameAvailable(false);
  } else {
    setUsernameAvailable(data.length === 0);
  }
}
