import { Roboto } from "next/font/google";
import "./globals.css";

import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';

const roboto = Roboto({
  weight: ['300','400','500','700'],
  style: ['normal','italic'],
  subsets: ["latin"] });

export const metadata = {
  title: "NAUR",
  description: "NA Ultimate Raiding - FFXIV",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
          <NavBar />
          <main>
            {children}
          </main>
          <Footer />
      </body>
    </html>
  );
}
