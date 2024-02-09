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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import UploadDropZone from "../util/UploadDropZone";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AnimatedCheckIcon } from "../icons/check";
import { AnimatedXIcon } from "../icons/x";
import { uploadCollectiveImageToS3 } from "./modal-actions/createCollectiveActions";
import { useModal } from "../../../hooks/use-modal-store";
import { createCollective } from "./functions/createCollective";

const iconProps = {
  height: "40",
  width: "40",
  color: "hsl(var(--background-content))",
};

export const CreateCollectiveModal = ({ user }: { user: User }) => {
  const [image, setImage] = useState<File | undefined | File[]>(undefined);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const supabase = createClientComponentClient<Database>();
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "createCollective";

  const isUsernameAvailable = async (usernameToCheck: string) => {
    if (usernameToCheck === "") {
      setUsernameAvailable(false);
      return;
    }
    const { data, error } = await supabase
      .from("collectives")
      .select("unique")
      .eq("unique", usernameToCheck);

    if (error) {
      console.error("Error checking username:", error);
      setUsernameAvailable(false);
    } else {
      setUsernameAvailable(data.length === 0);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      isUsernameAvailable(username);
    }, 1000);

    return () => clearInterval(interval);
  }, [username]);

  function fileToBase64(file: File | null): Promise<string> | null {
    if (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            resolve(reader.result);
          } else {
            reject(new Error("FileReader did not return a string."));
          }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    } else {
      return null;
    }
  }

  async function submitCollectiveDetails() {
    setLoading(true);
    if (usernameAvailable) {
      if (!!image) {
        const id = uuidv4();
        const base64Image = await fileToBase64(
          !Array.isArray(image) ? image : null
        );
        await uploadCollectiveImageToS3(base64Image ? base64Image : null, id);
        const error = await createCollective(user, id, supabase, username);

        if (error) {
          setErrorMessage("There was an error creating your collective.");
        } else {
          setErrorMessage("");
          setUsername("");
          setImage(undefined);
          onClose();
          router.push(`/collective/${username}`);
        }
      } else {
        setErrorMessage("Please upload a collective image.");
      }
    } else {
      setErrorMessage("Please enter a valid username.");
    }
    setLoading(false);
  }

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
    setUsername("");
    setImage(undefined);
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="p-0 overflow-hidden bg-white text-background_content">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl font-bold text-center text-background_content">
            Create your collective
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give your collective a personality with a name and an image. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 space-y-8">
          <UploadDropZone uploadFunction={setImage} />
          <div className="flex flex-row justify-between gap-x-4">
            <Input
              disabled={loading}
              className="text-black border-0 bg-zinc-300/50 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Enter collective unique"
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
        <DialogFooter className="flex flex-col px-6 py-4 bg-gray-100">
          <Button
            type="submit"
            className="w-full"
            onClick={submitCollectiveDetails}
          >
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
