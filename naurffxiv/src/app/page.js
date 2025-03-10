'use client';
import React from 'react';
import { Box } from '@mui/material';

import NavBar from '@/components/NavBar/NavBar';
import Carousel from '@/components/Homepage/Carousel';
import HomepageContent from '@/components/Homepage/HomepageContent';
import Header from '@/components/Homepage/Header';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <Box>
      <Box sx={{ 
        minHeight: '100vh',
        width: '100%',
        paddingBottom: '5rem',
      }}>
        <NavBar />
        <Header />
        <Carousel />
        <HomepageContent />
      </Box>
      <Footer />
    </Box>
  );
}
