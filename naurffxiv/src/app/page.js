"use client";
import react from "react";
import { Container, ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import NavBar from "./navigation.js";


export default function Home() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <NavBar />
    </ThemeProvider>
  );
}
