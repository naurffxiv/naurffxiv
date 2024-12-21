"use client";
import react from "react";
import { useState } from 'react';
import { Container, ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import NavBar from "./navigation.js";
import Image from 'next/image';
import Button from '@mui/material/Button';
import Carousel from './carousel.js';

import { useTheme } from '@mui/material/styles';



export default function Home() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <NavBar />
      <div style={{ width: "auto", height: "500px", overflow: "hidden", position: "relative" }}>
        <Image fill src="/images/fru-server-header.png" alt="banner" />
      </div>
      <Carousel />
      <p>NA Ultimate Raiding (NAUR) is a Final Fantasy XIV Discord community centered around
      Ultimate Duties in North American Data Centers. Our goal is to provide a community that
      makes the experience of Ultimate Raiding the best it can be. Whether you're completely
      new or have a lot of experience in Ultimate raiding, we have somethong for everyone!</p>
    </ThemeProvider>
  );
}
