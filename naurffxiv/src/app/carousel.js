import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { Box, Button, Stepper, Step, StepLabel, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "./globals.css";

export default function Carousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    { id: 1, src: "/images/discordlogo.png", alt: "Slide 1" },
    { id: 2, src: "/images/githublogo.png", alt: "Slide 2" },
    { id: 3, src: "/images/naur_icon.png", alt: "Slide 3" },
  ]

  const handleNext = () => {
    if (activeSlide === slides.length - 1) {
      setActiveSlide(0);
    } else {
      setActiveSlide(activeSlide + 1);
    }
  }

  const handleBack = () => {
    if (activeSlide === 0) {
      setActiveSlide(slides.length - 1)
    } else {
      setActiveSlide(activeSlide - 1)
    }
  }


  return (
    <Box sx={{ width: '80%', display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
      <Button
        color="inherit"
        onClick={handleBack}
        sx={{ mr : 1 }}
      >
        <ArrowBackIosNewIcon />
      </Button>

      <Image
        src={slides[activeSlide].src}
        alt={`carousel-img-${activeSlide}`}
        width={1000}
        height={2000}
      />

      <Button
        color="inherit"
        onClick={handleNext}
        sx={{ mr: 1 }}
      >
        <ArrowForwardIosIcon />
      </Button>
    </Box>
  );
};
