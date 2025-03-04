import "@/app/globals.css";
import { ThemeContextProvider } from '@/app/themeContext';
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

export default function MdxLayout({ children }) {
  return (
      <ThemeContextProvider>
        <NavBar />
        {children}
        <Footer />
      </ThemeContextProvider>
  );
}