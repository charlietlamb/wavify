import { Dispatch, SetStateAction, useEffect } from "react";

export function useRoleUpdateEffect(
  supabase: Supabase,
  collective: Collective,
  rolesAndAllowed: RoleAndAllowed[],
  setRolesAndAllowed: Dispatch<SetStateAction<RoleAndAllowed[]>>
) {
  useEffect(() => {
    if (!supabase || !collective) return;
    const channel = supabase
      .channel("roles" + collective.id)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "roles",
        },
        (payload) => {
          const newPayload = payload.new as Role;
          if (
            newPayload &&
            typeof newPayload === "object" &&
            payload.eventType === "INSERT" &&
            newPayload.collective === collective.id
          ) {
            const newRoleAndAllowed: RoleAndAllowed = {
              ...newPayload,
              allowed: false,
            };
            setRolesAndAllowed(
              [...rolesAndAllowed, newRoleAndAllowed].sort(
                (a, b) => a.authority - b.authority
              )
            );
          } else if (
            newPayload &&
            typeof newPayload === "object" &&
            payload.eventType === "UPDATE" &&
            newPayload.collective === collective.id
          ) {
            const newRoleAndAllowed: RoleAndAllowed = {
              ...newPayload,
              allowed: false,
            };
            setRolesAndAllowed(
              rolesAndAllowed
                .map((role) =>
                  role.id === newRoleAndAllowed.id ? newRoleAndAllowed : role
                )
                .sort((a, b) => a.authority - b.authority)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, collective, rolesAndAllowed, setRolesAndAllowed]);
}
