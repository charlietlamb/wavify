"use client";

import { useEffect, useState } from "react";
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
import UploadDropZone from "../util/uploads/UploadDropZone";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AnimatedCheckIcon } from "../icons/check";
import { AnimatedXIcon } from "../icons/x";
import { uploadCollectiveImageToS3 } from "./modal-actions/createCollectiveActions";
import { useModal } from "../../../hooks/use-modal-store";

const iconProps = {
  height: "40",
  width: "40",
  color: "hsl(var(--primary))",
};

export const EditCollectiveModal = ({ user }: { user: User }) => {
  const [image, setImage] = useState<File[] | File | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const supabase = createClientComponentClient<Database>();
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "editCollective";
  const { collective } = data;

  //set collective values
  useEffect(() => {
    if (collective) {
      setUsername(collective.unique);
      setImgSrc("https://github.com/shadcn.png");
    }
  }, [collective]);

  const isUsernameAvailable = async (usernameToCheck: string) => {
    if (usernameToCheck === "") {
      setUsernameAvailable(false);
      return;
    }
    if (collective && usernameToCheck === collective.unique) {
      setUsernameAvailable(true);
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
    if (file !== null) {
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
      if (!!image || !!imgSrc) {
        if (!!image) {
          const base64Image = await fileToBase64(
            !Array.isArray(image) ? image : null
          );
          await uploadCollectiveImageToS3(
            base64Image ? base64Image : null,
            collective ? collective.id : "undefined"
          );
        }

        const { data, error } = await supabase
          .from("collectives")
          .update({
            unique: username,
          })
          .eq("id", collective ? collective.id : "");
        if (error) {
          setErrorMessage("There was an error creating your account.");
        } else {
          setErrorMessage("");
          setUsername("");
          setImage(undefined);
          onClose();
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
      <DialogContent className="p-0 pt-4 overflow-hidden bg-background_content flex flex-col items-center">
        <DialogHeader className="w-[90%]">
          <DialogTitle className="text-2xl font-bold text-left">
            Edit your collective
          </DialogTitle>
          <DialogDescription className="text-left text-zinc-500">
            Give your collective a personality with a name and an image. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>
        <div className="w-[90%] space-y-8">
          <UploadDropZone
            uploadFunction={setImage}
            imageUrl={imgSrc}
            color={"#FFFFFF"}
          />
          <div className="flex flex-row justify-between gap-x-4">
            <Input
              disabled={loading}
              className=" border-0 bg-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0"
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
        <DialogFooter className="flex flex-col w-[90%] py-4">
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
              "Save"
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
