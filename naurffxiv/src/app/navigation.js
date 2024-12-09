import React from 'react';
import { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  MenuItem,
  Menu,
  IconButton,
  TextField,
} from '@mui/material';

import Link from 'next/link';
import Image from 'next/image';
import { pages } from './constants.js';
import UltimateDropdown from './dropdown.js';
import { ThemeSwitch } from './adaptive-theme.js';


export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar disableGutters>
          <IconButton size="small">
            <Link href="/">
              <Image
                src="/images/naur_icon.png"
                alt="NAUR icon"
                height="40"
                width="40"
              />
            </Link>
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }} }
          >
            <UltimateDropdown />
            {pages.map((page) => (
                <MenuItem key={page.name}>
                  <Link href={page.link}>
                    <Typography sx={{ textAlign: 'center' }}>
                      {page.name}
                    </Typography>
                  </Link>
                </MenuItem>
            ))}
          </Typography>
          <ThemeSwitch/>
          <TextField
            id="standard-search"
            label="Search Documentation"
            type="Search"
            variant="standard"
          />
          <MenuItem>
            <Typography variant="h7" component="div" sx={{ textAlign: 'center' }}>
              <Link href="/login">
                Login
              </Link>
            </Typography>
          </MenuItem>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
