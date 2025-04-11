import "@/app/globals.css";
import { Box } from "@mui/material";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { Roboto } from "next/font/google";
import MUITheme from "@/app/theme";

// note: this can be removed when MDX rendering is moved to @/app/ (NAUR-84)
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  fallback: ["system-ui", "arial"],
  display: "swap",
});

export default function MdxLayout({ children }) {
  return <div className={roboto.className}>{children}</div>;
}
