import "./globals.css";

import AuthSessionProvider from "@auth/components/Gates/AuthSessionProvider";
import Footer from "@/components/Layout/Footer/Footer";
import MUITheme from "@/components/Providers/MUITheme";
import NavBar from "@/components/Layout/NavBar/NavBar";
import { Roboto } from "next/font/google";
import Script from "next/script";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  fallback: ["system-ui", "arial"],
  display: "swap",
});

export const metadata = {
  title: "NAUR",
  description: "NA Ultimate Raiding - FFXIV",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // Enables full-screen support on devices with notches
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="min-h-screen">
      <body
        className={`${roboto.className} min-h-screen flex flex-col`}
        style={{
          paddingTop: "env(safe-area-inset-top)", // Top safe-area for devices like iPhone
          paddingBottom: "env(safe-area-inset-bottom)", // Bottom safe-area for devices like iPhone
        }}
      >
        <AuthSessionProvider>
          <MUITheme>
            <NavBar />
            <main className="flex-grow">
              {children}
              <Script id="disable-preview-tracking">
                {/* Only load on production environment.*/}
                {`
              if (window.location.host !== 'naurffxiv.com')
                  window.goatcounter = {no_onload: true}
            `}
              </Script>
              <Script
                src="https://gc.zgo.at/count.js"
                strategy="afterInteractive"
                data-goatcounter="https://naur.goatcounter.com/count"
              />
            </main>
            <Footer />
          </MUITheme>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
