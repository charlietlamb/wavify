import React, { Dispatch } from "react";
import { isUsernameAvailable } from "./isUsernameAvailable";

const debounce = (func: (...args: any[]) => void, delay: number) => {
  let debounceTimer: NodeJS.Timeout;
  return function (this: any, ...args: any[]) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(this, args), delay);
  };
};

const debouncedCheckUsername = debounce(isUsernameAvailable, 100);

export function usernameHandler(
  e: React.ChangeEvent<HTMLInputElement>,
  setUsername: Dispatch<React.SetStateAction<string>>
) {
  const allowedChars = /^[a-z0-9._-]*$/;
  let inputValue = e.target.value;
  if (!allowedChars.test(inputValue)) {
    inputValue = inputValue.replace(/[^a-z0-9._-]/g, "");
  }
  setUsername(inputValue);
  debouncedCheckUsername(inputValue);
}
