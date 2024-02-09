"use client";

import { NextUIProvider } from "@nextui-org/react";
/*
import { ThemeProvider as NextThemesProvider } from 'next-themes'
        <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        themes={['light','dark','modern']}>
            {children}
        </NextThemesProvider>
*/

export function NextProvider({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
