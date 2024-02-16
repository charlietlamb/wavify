import isObject from "@/lib/isObject";
import { Dispatch, SetStateAction, useState } from "react";
import { AccordionTrigger, AccordionItem } from "../ui/accordion";
import { RoleContext } from "./roles/context";
import RoleEdit from "./RoleEdit";
import { Draggable } from "@hello-pangea/dnd";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RoleItem({
  roles,
  role,
  index,
  collective,
  setRoles,
  colUser,
}: {
  roles: Role[];
  role: Role;
  index: number;
  collective: Collective;
  setRoles: Dispatch<SetStateAction<Role[]>>;
  colUser: ColUserAndData;
}) {
  const [emoji, setEmoji] = useState<string>(role.emoji ? role.emoji : "");
  const [name, setName] = useState<string>(role.name ? role.name : "");
  const [color, setColor] = useState<string>(role.color ? role.color : "");
  const [permissions, setPermissions] = useState<Json>({
    canInvite: typeof role.canInvite === "boolean" ? role.canInvite : false,
    canCreate: typeof role.canCreate === "boolean" ? role.canCreate : false,
    canDelete: typeof role.canDelete === "boolean" ? role.canDelete : false,
    canMembers: typeof role.canMembers === "boolean" ? role.canMembers : false,
    canSettings:
      typeof role.canSettings === "boolean" ? role.canSettings : false,
    canRoles: typeof role.canRoles === "boolean" ? role.canRoles : false,
    canMessages:
      typeof role.canMessages === "boolean" ? role.canMessages : false,
  });

  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Draggable
      draggableId={isObject(role) && typeof role.id === "string" ? role.id : ""}
      index={index}
    >
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={cn(
              "rounded-md flex-grow max-w-full max-h-full",
              snapshot.isDragging && "bg-primary/5"
            )}
          >
            <AccordionItem
              className="pt-2 border-b-2 border-grey-400"
              value={typeof role.id === "string" ? role.id : ""}
            >
              <div className="px-4">
                <AccordionTrigger className="flex items-center justify-between w-full py-0 gap-x-4 hover:no-underline">
                  <div {...provided.dragHandleProps}>
                    <GripVertical className="cursor-grab active:cursor-grabbing"></GripVertical>
                  </div>
                  <div className="flex justify-center w-4 text-zinc-600">
                    {roles.findIndex(
                      (role1) => isObject(role1) && role1.id === role.id
                    ) + 1}
                  </div>
                  <div className="flex items-center justify-between flex-grow w-full py-2">
                    <div className="flex space-x-2 text-xl">
                      <div>
                        <span
                          className="no-underline"
                          role="img"
                          aria-label="emoji"
                        >
                          {emoji}
                        </span>
                      </div>
                      <div style={{ color: `${color}` }}>{name}</div>
                    </div>
                  </div>
                </AccordionTrigger>
              </div>
              <RoleContext.Provider
                value={{
                  collective,
                  roles,
                  setRoles,
                  role,
                  emoji,
                  setEmoji,
                  name,
                  setName,
                  permissions,
                  setPermissions,
                  loading,
                  setLoading,
                  color,
                  setColor,
                  colUser,
                }}
              >
                <RoleEdit></RoleEdit>
              </RoleContext.Provider>
            </AccordionItem>
          </div>
        );
      }}
    </Draggable>
  );
}
