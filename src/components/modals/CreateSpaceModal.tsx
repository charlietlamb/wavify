"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useModal } from "../../../hooks/use-modal-store";
import { AnimatedCheckIcon } from "../icons/check";
import { AnimatedXIcon } from "../icons/x";
import { Label } from "../ui/label";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
const iconProps = {
  height: "40",
  width: "40",
  color: "hsl(var(--background-content))",
};

type SpaceType = "text" | "audio" | "video";
const spaceTypes: SpaceType[] = ["text", "audio", "video"];

export const CreateSpaceModal = ({ user }: { user: User }) => {
  const [loading, setLoading] = useState(false);
  const [spaceName, setSpaceName] = useState("");
  const { isOpen, onClose, type, data } = useModal();
  const { spaceType: theSpaceType } = data as {
    spaceType: SpaceType;
  };
  const [spaceType, setSpaceType] = useState<SpaceType>("audio");
  const [username, setUsername] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const isModalOpen = isOpen && type === "createSpace";

  const { collective } = data as {
    collective: Collective;
  };

  useEffect(() => {
    if (theSpaceType && spaceTypes.includes(theSpaceType)) {
      setSpaceType(theSpaceType);
    }
  }, [theSpaceType]);

  async function submitSpaceDetails() {
    setLoading(true);
    if (spaceName !== "" && spaceName !== "roles") {
      const id = uuidv4();
      const space: Json = {
        id,
        name: spaceName,
        type: spaceType,
        slug: username,
      };
      const { error } = await supabase.from("spaces").insert({
        id: typeof space.id === "string" ? space.id : "",
        name: typeof space.name === "string" ? space.name : "",
        type: typeof space.type === "string" ? space.type : "",
        slug: typeof space.slug === "string" ? space.slug : "",
        collective: typeof collective.id === "string" ? collective.id : "",
        open: true,
      });
      if (error) {
        throw error;
        setErrorMessage("There was an error creating space.");
      } else {
        setErrorMessage("");
        setSpaceName("");
        setUsername("");
        onClose();
        router.refresh();
      }
    } else {
      setErrorMessage("Please enter a valid spaceName.");
    }
    setLoading(false);
  }

  const isUsernameAvailable = async (usernameToCheck: string) => {
    if (usernameToCheck === "" || usernameToCheck === "roles") {
      setUsernameAvailable(false);
      return;
    }
    if (Array.isArray(collective.spaces)) {
      setUsernameAvailable(
        collective.spaces.every(
          (space: Json) =>
            space &&
            typeof space === "object" &&
            !Array.isArray(space) &&
            space.slug !== usernameToCheck
        )
      );
    } else {
      setUsernameAvailable(true);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      isUsernameAvailable(username);
    }, 1000);

    return () => clearInterval(interval);
  }, [username]);

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let debounceTimer: NodeJS.Timeout;
    return function (this: any, ...args: any[]) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const debouncedCheckUsername = debounce(isUsernameAvailable, 100);

  const usernameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const allowedChars = /^[a-z0-9._-]*$/;
    let inputValue = e.target.value;
    if (!allowedChars.test(inputValue)) {
      inputValue = inputValue.replace(/[^a-z0-9._-]/g, "");
    }
    setUsername(inputValue);
    debouncedCheckUsername(inputValue);
  };

  const handleClose = () => {
    setErrorMessage("");
    setSpaceName("");
    setUsername("");
    //setSpaceType("text");
    onClose();
  };

  function isSpaceType(str: string): str is SpaceType {
    return spaceTypes.includes(str as SpaceType);
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="p-0 overflow-hidden bg-white text-background_content">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl font-bold text-center text-background_content">
            Create Space
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 space-y-4">
          <div>
            <Label>Space Name</Label>
            <div className="flex flex-row justify-between gap-x-4">
              <Input
                disabled={loading}
                className="text-black border-0 bg-zinc-300/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Enter space name"
                value={spaceName}
                onChange={(e) => setSpaceName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label>Space Slug</Label>
            <div className="flex flex-row justify-between gap-x-4">
              <Input
                disabled={loading}
                className="text-black border-0 bg-zinc-300/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder={`wavify.io/${
                  collective ? collective.unique : "your-collective"
                }/`}
                value={username}
                onChange={usernameHandler}
              />
              {usernameAvailable ? (
                <AnimatedCheckIcon {...iconProps} />
              ) : (
                <AnimatedXIcon {...iconProps} />
              )}
            </div>
          </div>
          <div>
            <Label>Space Type</Label>
            <Select
              disabled={loading}
              onValueChange={(e) => setSpaceType(isSpaceType(e) ? e : "text")}
              value={spaceType}
              defaultValue={spaceType}
            >
              <SelectTrigger className="text-black capitalize border-0 outline-none bg-zinc-300/50 focus:ring-0 ring-offset-0 focus:ring-offset-0">
                <SelectValue placeholder="Select a channel type" />
              </SelectTrigger>
              <SelectContent>
                {spaceTypes.map((type) => (
                  <SelectItem key={type} value={type} className="capitalize">
                    {type.toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="flex flex-col px-6 py-4 bg-gray-100">
          <Button type="submit" className="w-full" onClick={submitSpaceDetails}>
            {loading ? (
              <svg
                width="24"
                height="24"
                stroke="#0f0f0f"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="spinner"
              >
                <g>
                  <circle
                    cx="12"
                    cy="12"
                    r="9.5"
                    fill="none"
                    strokeWidth="3"
                  ></circle>
                </g>
              </svg>
            ) : (
              "Create"
            )}
          </Button>
          {!!errorMessage && (
            <p className="w-full mt-2 text-sm text-center text-red-500 text-muted-foreground">
              {errorMessage}
            </p>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
