import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  fallback: ["system-ui", "arial"],
  display: "swap",
});

export const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});
