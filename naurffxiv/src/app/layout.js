import { Roboto } from "next/font/google";
import MUITheme from "./theme";
import "./globals.css";
import Script from "next/script";

import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';

const roboto = Roboto({
  weight: ['300','400','500','700'],
  style: ['normal','italic'],
  subsets: ["latin"],
  fallback: ['system-ui', 'arial'],
  display: 'swap',
});

export const metadata = {
  title: "NAUR",
  description: "NA Ultimate Raiding - FFXIV",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <MUITheme>
          <NavBar />
          <main>
            {children}
            <Script
              src="https://gc.zgo.at/count.js"
              strategy="afterInteractive"
              data-goatcounter="https://naur.goatcounter.com/count"
            />
          </main>
          <Footer />
        </MUITheme>
      </body>
    </html>
  );
}
