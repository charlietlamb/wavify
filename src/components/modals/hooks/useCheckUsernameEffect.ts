import { Dispatch, SetStateAction, useEffect } from "react";
import { isUsernameAvailable } from "../functions/isUsernameAvailable";

export function useCheckUsernameEffect(
  username: string,
  setUsernameAvailable: Dispatch<SetStateAction<boolean>>,
  supabase: Supabase
) {
  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof setUsernameAvailable === "function") {
        isUsernameAvailable(username, setUsernameAvailable, supabase);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [username]);
}
