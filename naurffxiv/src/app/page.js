'use client';
import React, { useState } from 'react';
import { Box, Typography, Button, CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import NavBar from './navigation.js';
import Image from 'next/image';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    { id: 1, src: '/images/Ultima.png', alt: 'Ultima' },
    { id: 2, src: '/images/Bahamut.png', alt: 'Bahamut' },
    { id: 3, src: '/images/Alexander.png', alt: 'Alexander' },
    { id: 4, src: '/images/Thordan.png', alt: 'Thordan' },
    { id: 5, src: '/images/Omega.png', alt: 'Omega' },
    { id: 6, src: '/images/Pandora.png', alt: 'Pandora' },
  ];

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      {/* header image */}
      <div style={{ width: 'auto', height: '500px', overflow: 'hidden', position: 'relative' }}>
        <Image fill src='/images/fru-server-header.png' alt='banner' />
      </div>

      {/* carousel */}
      <Box sx={{
        maxWidth: { xs: '90%', md: '60%' },
        textAlign: 'center',
        flexWrap: 'wrap',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: '0 auto',
        gap: { xs: 2, md: 6 },
      }}>
        <Box sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
          {/* left arrow */}
          <Button
            color='inherit'
            onClick={handleBack}
            sx={{
              position: 'absolute',
              left: '-70px',
              zIndex: 1,
            }}
          >
            <ArrowBackIosNewIcon />
          </Button>

          <Box sx={{ position: 'relative', display: 'inline-block' }}>
            <Image
              src={slides[activeSlide].src}
              alt={`carousel-img-${activeSlide}`}
              width={1500}
              height={700}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />

            {/* gray transparent box */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '40%',
                height: '100%',
                backgroundColor: 'rgba(128, 128, 128, 0.6)',
              }}
            />
          </Box>

          {/* right arrow */}
          <Button
            color='inherit'
            onClick={handleNext}
            sx={{
              position: 'absolute',
              right: '-70px',
              zIndex: 1,
            }}
          >
            <ArrowForwardIosIcon />
          </Button>
        </Box>

        <Typography>
          NA Ultimate Raiding (NAUR) is a Final Fantasy XIV Discord community centered around
          Ultimate Duties in North American Data Centers. Our goal is to provide a community that
          makes the experience of Ultimate Raiding the best it can be. Whether you're completely
          new or have a lot of experience in Ultimate raiding, we have something for everyone!
        </Typography>

        <Box sx={{ display: { xs: 'flex', md: 'flex' }, justifyContent: 'space-between', gap: { xs: 1, md: 3 } }}>
          <Typography>Active staff<br />and discussion channels</Typography>
          <Typography>Party Finder-friendly strats<br />and resources</Typography>
          <Typography>Recruitment forums for<br />statics and Party Finder</Typography>
        </Box>

        <Box sx={{ width: '70%', display: { xs: 'flex', md: 'flex' }, justifyContent: 'space-between', margin: '0 auto' }}>
          <Typography>
            Discord bots to display Party Finder listings<br />and analyze your raiding<br />achievements
          </Typography>
          <Typography>
            Server events to help players<br />prog and clear Ultimate Duties
          </Typography>
        </Box>

        <Typography>
          If you are interested in Ultimate Raiding on NA Data Centers and what we have to offer, come be a part of our community!
        </Typography>
      </Box>
    </ThemeProvider>
  );
}
