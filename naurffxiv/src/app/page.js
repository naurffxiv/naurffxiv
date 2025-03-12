'use client';
import React from 'react';
import { Box } from '@mui/material';

import Carousel from '@/components/Homepage/Carousel';
import HomepageContent from '@/components/Homepage/HomepageContent';
import Header from '@/components/Homepage/Header';

export default function Home() {
  return (
    <Box>
      <Box sx={{ 
        minHeight: '100vh',
        width: '100%',
      }}>
        <Header />
        <Carousel />
        <HomepageContent />
      </Box>
    </Box>
  );
}
