import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import CollectiveSidebar from "../collective/CollectiveSidebar";
import Sidebar from "../nav/Sidebar";

interface MobileToggleProps {
  user: User;
  collective?: Collective;
  colUser?: Json;
  userData?: User[];
}
//need to render nav sidebar
export const MobileToggle = ({
  user,
  collective,
  colUser,
  userData,
}: MobileToggleProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex gap-0 p-0">
        <div className="w-[72px]">
          <Sidebar user={user} />
        </div>
        {collective && colUser && userData && (
          <CollectiveSidebar
            user={user}
            collective={collective}
            colUser={colUser}
            userData={userData}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
