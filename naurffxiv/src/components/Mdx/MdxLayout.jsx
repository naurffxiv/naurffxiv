import "@/app/globals.css";
import { Box } from "@mui/material";
import { ThemeContextProvider } from '@/app/themeContext';
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

export default function MdxLayout({ children }) {
  return (
      <ThemeContextProvider>
        <NavBar />
        <Box>
          {children}
        </Box>
        <Footer />
      </ThemeContextProvider>
  );
}