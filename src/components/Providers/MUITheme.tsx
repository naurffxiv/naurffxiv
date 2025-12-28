"use client";

import type { ChildrenProps } from "@/types/common";
import type { ReactElement } from "react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/config/theme";

export default function MUITheme({ children }: ChildrenProps): ReactElement {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
