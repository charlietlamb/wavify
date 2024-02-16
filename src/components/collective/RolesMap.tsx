import isObject from "@/lib/isObject";
import RoleItem from "./RoleItem";
import { Accordion } from "../ui/accordion";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { handleDragEnd } from "./roles/handleDragEnd";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useState } from "react";

export default function RolesMap({
  collective,
  roles,
  setRoles,
  colUser,
}: {
  collective: Collective;
  roles: Role[];
  setRoles: Dispatch<SetStateAction<Role[]>>;
  colUser: ColUserAndData;
}) {
  //pretty sure error is here, not displaying roles as I changed the implementation to get them from collectives
  if (!Array.isArray(roles)) return null;
  const [init, setInit] = useState(false);
  if (!init) {
    setRoles(roles.sort((a, b) => a.authority - b.authority));
    setInit(true);
  }
  return (
    <DragDropContext
      onDragEnd={(result) => handleDragEnd(result, roles, setRoles, colUser)}
    >
      <Accordion type="single" collapsible className="max-w-full space-y-2">
        <Droppable droppableId={"roles"}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={cn(
                "rounded-md max-w-full max-h-full overflow-clip",
                snapshot.isDraggingOver && "bg-secondary/5"
              )}
            >
              {Array.isArray(roles) &&
                roles.map((role: Role, index: number) => {
                  return (
                    (colUser.roles?.authority < role.authority ||
                      colUser.roles?.authority === 0) && (
                      <RoleItem
                        collective={collective}
                        roles={roles}
                        role={role}
                        setRoles={setRoles}
                        key={role.id}
                        index={index}
                        colUser={colUser}
                      />
                    )
                  );
                })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Accordion>
    </DragDropContext>
  );
}
