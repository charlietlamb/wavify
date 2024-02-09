import { Dispatch, SetStateAction } from "react";

export async function saveRoles(
  roles: Role[],
  supabase: Supabase,
  setSaveLoading: Dispatch<SetStateAction<boolean>>
) {
  setSaveLoading(true);
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
  } finally {
    setSaveLoading(false);
  }
}
