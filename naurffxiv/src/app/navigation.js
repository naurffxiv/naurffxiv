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
      <AppBar position="fixed" color="primary">
        <Toolbar sx={{ px: 2 }} disableGutters>
          <Typography sx={{ flexGrow: 1}}>
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
          </Typography>
          <MenuItem>
            <Typography variant="h7" component="div" sx={{ textAlign: 'center' }}>
              <Link href="/">
                  Home
              </Link>
            </Typography>
          </MenuItem>
          <Typography
            variant="h6"
            component="div"
            sx={{ display: { xs: 'flex', md: 'flex' }} }
          >
            <UltimateDropdown name="Resources" />
            <UltimateDropdown name="Guides" />
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
          <Box sx={{ px: 1 }}>
            <IconButton size="small">
              <Link href="/">
                <Image
                  src="/images/discordlogo.png"
                  alt="Discord logo"
                  height="30"
                  width="30"
                />
              </Link>
            </IconButton>
          </Box>
          <Box sx={{ px: 1 }}>
            <IconButton size="small">
              <Link href="/">
                <Image
                  src="/images/githublogo.png"
                  alt="GitHub Logo"
                  height="30"
                  width="30"
                />
              </Link>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
