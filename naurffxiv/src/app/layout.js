import { Roboto } from "next/font/google";
import "./globals.css";

const roboto  = Roboto({ 
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
          {children}
      </body>
    </html>
  );
}
