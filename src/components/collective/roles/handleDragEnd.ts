import isObject from "@/lib/isObject";
import { DropResult } from "@hello-pangea/dnd";
import { Dispatch, SetStateAction } from "react";
import { saveRoles } from "./saveRoles";
import { saveRolesBackground } from "./saveRolesBackground";

export function handleDragEnd(
  result: DropResult,
  roles: Role[],
  setRoles: Dispatch<SetStateAction<Role[]>>
) {
  const { destination, source, draggableId } = result;
  if (!destination) return;
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  )
    return;
  const newRoles = Array.from(roles);
  const filteredRoles = newRoles.filter(
    (role) => isObject(role) && role.id !== draggableId
  );
  const roleToInsert = newRoles.find(
    (role) => isObject(role) && role.id === draggableId
  );
  if (!isObject(roleToInsert)) return;
  const rolesToUpdate = [
    ...filteredRoles.slice(0, destination.index),
    roleToInsert,
    ...filteredRoles.slice(destination.index),
  ];
  setRoles(rolesToUpdate);
  saveRolesBackground(rolesToUpdate);
}
