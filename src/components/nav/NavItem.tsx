"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/util/ActionTooltip";

interface NavigationItemProps {
  collective: Collective;
}

export const NavigationItem = ({ collective }: NavigationItemProps) => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/collective/${collective.unique}`);
  };

  return (
    <ActionTooltip side="bottom" align="center" label={collective.unique}>
      <button onClick={onClick} className="relative flex items-center group">
        <div
          className={cn(
            "absolute top-0 bg-primary rounded-r-full transition-all h-[4px]",
            params?.unique !== collective.id && "group-hover:h-[20px]",
            params?.unique === collective.id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-1 h-[2rem] w-[2rem] rounded-full group-hover:rounded-[16px] transition-all overflow-hidden",
            params?.unique === collective.id &&
              "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image
            fill
            //src={process.env.NEXT_PUBLIC_WASABI_COLLECTIVE_BUCKET_LINK+`${id}/images/main_pic.jpg`}
            src="https://github.com/shadcn.png"
            alt="Collective"
          />
        </div>
      </button>
    </ActionTooltip>
  );
};
