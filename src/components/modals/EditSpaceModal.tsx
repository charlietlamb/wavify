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

const iconProps = {
  height: "40",
  width: "40",
  color: "hsl(var(--background-content))",
};

type SpaceType = "text" | "audio" | "video";
const spaceTypes: SpaceType[] = ["text", "audio", "video"];

export const EditSpaceModal = ({ user }: { user: User }) => {
  const { isOpen, onClose, type, data } = useModal();
  const { space } = data as {
    space: Json;
  };
  const [loading, setLoading] = useState(false);
  const [spaceName, setSpaceName] = useState<string>(
    space &&
      !Array.isArray(space) &&
      typeof space === "object" &&
      typeof space.name === "string"
      ? space.name
      : ""
  );
  const [spaceType, setSpaceType] = useState<SpaceType>(
    space &&
      !Array.isArray(space) &&
      typeof space === "object" &&
      spaceTypes.includes(space.type as SpaceType)
      ? (space.type as SpaceType)
      : "text"
  );
  const [username, setUsername] = useState<string>(
    space &&
      !Array.isArray(space) &&
      typeof space === "object" &&
      typeof space.slug === "string"
      ? space.slug
      : ""
  );
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const isModalOpen = isOpen && type === "editSpace";

  const { collective } = data as {
    collective: Collective;
  };

  useEffect(() => {
    if (space) {
      setUsername(
        !Array.isArray(space) &&
          typeof space === "object" &&
          typeof space.slug === "string"
          ? space.slug
          : ""
      );
      setSpaceName(
        !Array.isArray(space) &&
          typeof space === "object" &&
          typeof space.name === "string"
          ? space.name
          : ""
      );
      setSpaceType(
        !Array.isArray(space) &&
          typeof space === "object" &&
          spaceTypes.includes(space.type as SpaceType)
          ? (space.type as SpaceType)
          : "text"
      );
    }
  }, [isOpen]);

  async function submitSpaceDetails() {
    setLoading(true);
    if (spaceName !== "") {
      var newSpace: Json | null = null;
      var updatedSpaces;
      var newSpace: Json = {
        id:
          space && typeof space === "object" && !Array.isArray(space)
            ? space.id
            : uuidv4(),
        name: spaceName,
        type: spaceType,
        slug: username,
      };
      if (Array.isArray(collective.spaces)) {
        updatedSpaces = collective.spaces.map((space1) =>
          space1 &&
          !Array.isArray(space1) &&
          typeof space1 === "object" &&
          space &&
          !Array.isArray(space) &&
          typeof space === "object" &&
          space1.id === space.id
            ? newSpace
            : space1
        );
      }
      const { data, error } = await supabase
        .from("collectives")
        .update({
          spaces: !Array.isArray(collective.spaces)
            ? [newSpace]
            : updatedSpaces,
        })
        .eq("id", collective.id);
      if (error) {
        setErrorMessage("There was an error editing your space.");
      } else {
        setErrorMessage("");
        setSpaceName("");
        setUsername("");
        onClose();
        //router.refresh();
        //router.push(`/collective/${collective.unique}/${username}`);
      }
    } else {
      setErrorMessage("Please enter a valid spaceName.");
    }
    setLoading(false);
  }

  const isUsernameAvailable = async (usernameToCheck: string) => {
    if (usernameToCheck === "") {
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
    setSpaceType("text");
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
            Edit Space
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
              "Edit"
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
