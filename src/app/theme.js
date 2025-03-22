"use client";
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300','400','500','700'],
  style: ['normal','italic'],
  subsets: ["latin"],
  fallback: ['system-ui', 'arial'],
  display: 'swap',
});

const theme = createTheme({
    typography: {
        fontFamily: roboto.style.fontFamily
    }
});

export default function MUITheme({children}) {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}