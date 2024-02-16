import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Sidebar from "../nav/Sidebar";
import CollectiveMobileSidebar from "../collective/CollectiveMobileSidebar";

interface MobileToggleProps {
  user: User;
  collective?: Collective;
  colUser?: ColUserAndData;
}
//need to render nav sidebar
export const MobileToggle = ({
  user,
  collective,
  colUser,
}: MobileToggleProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex p-0 pl-4 bg-background_content">
        <Sidebar user={user} />

        {collective && colUser && (
          <div className="pr-12 w-full">
            <CollectiveMobileSidebar
              user={user}
              collective={collective}
              colUser={colUser}
            />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
