import { Roboto } from "next/font/google";
import MUITheme from "./theme";
import "./globals.css";

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
            {children}
          </MUITheme>
      </body>
    </html>
  );
}
