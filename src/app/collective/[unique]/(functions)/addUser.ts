import { v4 as uuidv4 } from "uuid";

export async function addUser(
  user: User,
  collective: Collective,
  supabase: Supabase,
  unique: string,
  defaultRole: Role
) {
  const newColUser = {
    id: uuidv4(),
    role: defaultRole.name,
    roleId: defaultRole.id,
    collective: collective.id,
    user: user.id,
  };
  const { data, error } = await supabase
    .from("colUsers")
    .insert(newColUser)
    .select("*,roles(*),users(*)");
  if (error) throw error;
  if (Array.isArray(data)) {
    return data[0] as unknown as ColUserAndData;
  } else {
    return data as unknown as ColUserAndData;
  }
}
