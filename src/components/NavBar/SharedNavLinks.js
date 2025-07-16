'use client';
import React from 'react';
import { MenuItem, Typography, Box } from '@mui/material';
import ContentDropdown from './ContentDropdown';
import { ultimateList, savageList, extremeList } from '@/app/constants';

export default function SharedNavLinks({ isMobile, onClick }) {
  return (
    <>
      {/* Home Link */}
      <MenuItem component="a" href="/" onClick={onClick}>
        <Typography sx={{ width: '100%', textAlign: isMobile ? 'left' : 'center' }}>
          Home
        </Typography>
      </MenuItem>

      {/* Dropdowns */}
      <MenuItem disableRipple>
        <Box sx={{ width: '100%' }}>
          <ContentDropdown
            name="Ultimate"
            data={ultimateList}
            isMobile={isMobile}
            insideMobileMenu={isMobile}
          />
        </Box>
      </MenuItem>

      <MenuItem disableRipple>
        <Box sx={{ width: '100%' }}>
          <ContentDropdown
            name="Savage"
            data={savageList}
            isMobile={isMobile}
            insideMobileMenu={isMobile}
          />
        </Box>
      </MenuItem>

      <MenuItem disableRipple>
        <Box sx={{ width: '100%' }}>
          <ContentDropdown
            name="Extreme"
            data={extremeList}
            isMobile={isMobile}
            insideMobileMenu={isMobile}
          />
        </Box>
      </MenuItem>

      {/* External Link */}
      <MenuItem
        component="a"
        href="https://findingway.io"
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        <Typography sx={{ width: '100%', textAlign: isMobile ? 'left' : 'center' }}>
          Findingway
        </Typography>
      </MenuItem>
    </>
  );
}
