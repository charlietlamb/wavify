import isObject from "@/lib/isObject";
import {
  Award,
  MailSearch,
  MessageSquareOff,
  PencilRuler,
  Send,
  Settings,
  UserCog,
} from "lucide-react";
import { useRoleContext } from "./roles/context";
import { Checkbox } from "@nextui-org/react";

export default function RoleOptions() {
  const { permissions, setPermissions } = useRoleContext();
  if (!isObject(permissions)) return null;
  return (
    <div className="grid items-start grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <Checkbox
        radius="sm"
        defaultSelected={!!permissions.canInvite}
        onValueChange={(value) =>
          setPermissions((prev) =>
            isObject(prev) ? { ...prev, canInvite: value } : prev
          )
        }
        icon={<Send></Send>}
        className="mb-1 mr-1"
      >
        <span className="text-md">Can Invite Users?</span>
      </Checkbox>
      <Checkbox
        radius="sm"
        defaultSelected={!!permissions.canCreate}
        onValueChange={(value) =>
          setPermissions((prev) =>
            isObject(prev) ? { ...prev, canCreate: value } : prev
          )
        }
        icon={<PencilRuler></PencilRuler>}
        className="mb-1 mr-1"
      >
        <span className="text-md">Can Create Space?</span>
      </Checkbox>

      <Checkbox
        radius="sm"
        defaultSelected={!!permissions.canDelete}
        onValueChange={(value) =>
          setPermissions((prev) =>
            isObject(prev) ? { ...prev, canDelete: value } : prev
          )
        }
        icon={<MessageSquareOff></MessageSquareOff>}
        className="mb-1 mr-1"
      >
        <span className="text-md">Can Delete Spaces?</span>
      </Checkbox>

      <Checkbox
        radius="sm"
        defaultSelected={!!permissions.canMembers}
        onValueChange={(value) =>
          setPermissions((prev) =>
            isObject(prev) ? { ...prev, canMembers: value } : prev
          )
        }
        icon={<UserCog></UserCog>}
        className="mb-1 mr-1"
      >
        <span className="text-md">Can Manage Members?</span>
      </Checkbox>
      <Checkbox
        radius="sm"
        defaultSelected={!!permissions.canSettings}
        onValueChange={(value) =>
          setPermissions((prev) =>
            isObject(prev) ? { ...prev, canSettings: value } : prev
          )
        }
        icon={<Settings></Settings>}
        className="mb-1 mr-1"
      >
        <span className="text-md">Can Edit Settings?</span>
      </Checkbox>

      <Checkbox
        radius="sm"
        defaultSelected={!!permissions.canRoles}
        onValueChange={(value) =>
          setPermissions((prev) =>
            isObject(prev) ? { ...prev, canRoles: value } : prev
          )
        }
        icon={<Award></Award>}
        className="mb-1 mr-1"
      >
        <span className="text-md">Can Edit Roles?</span>
      </Checkbox>

      <Checkbox
        radius="sm"
        defaultSelected={!!permissions.canMessages}
        onValueChange={(value) =>
          setPermissions((prev) =>
            isObject(prev) ? { ...prev, canMessages: value } : prev
          )
        }
        icon={<MailSearch></MailSearch>}
        className="mb-1 mr-1"
      >
        <span className="text-md">Can Manage Messages?</span>
      </Checkbox>
    </div>
  );
}
