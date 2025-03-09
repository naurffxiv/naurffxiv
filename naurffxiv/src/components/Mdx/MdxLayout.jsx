import "@/app/globals.css";
import { ThemeContextProvider } from '@/app/themeContext';
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ['300','400','500','700'],
  style: ['normal','italic'],
  subsets: ['latin'],
  display: 'swap',
})

export default function MdxLayout({ children }) {
  return (
    <div className={roboto.className}>
      <ThemeContextProvider>
        <NavBar />
        {children}
        <Footer />
      </ThemeContextProvider>
    </div>
  );
}