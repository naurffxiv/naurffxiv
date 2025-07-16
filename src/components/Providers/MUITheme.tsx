"use client";

import { ThemeProvider } from "@emotion/react";
import { theme } from "@/config/theme";
import type { JSX } from "react";

export default function MUITheme({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
