import { useEffect } from "react";
import { getUserCollectives } from "../functions/getUserCollectives";

export function useGetCollectivesOnRefreshEffect(
  supabase: Supabase,
  user: User,
  setCollectives: React.Dispatch<React.SetStateAction<Collective[]>>
) {
  useEffect(() => {
    const fetchCollectives = async () => {
      const newCollectives = await getUserCollectives(supabase, user);
      setCollectives(newCollectives);
    };

    fetchCollectives();
  }, []);
}
