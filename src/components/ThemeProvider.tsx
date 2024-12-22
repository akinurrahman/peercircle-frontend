"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true); // Set mounted to true once the client-side JS is ready
  }, []);

  if (!mounted) return null; // Return nothing during the server-side render to avoid hydration mismatch

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
