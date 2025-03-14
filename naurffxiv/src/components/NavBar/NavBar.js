'use client';
import React from 'react';
import { Fragment } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  MenuItem,
  MenuList,
  Menu,
  IconButton,
} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

import { pages } from '@/app/constants.js';
import MenuIcon from '@mui/icons-material/Menu';
import UltimateDropdown from './UltimateDropdown.js';
import { icons } from '@/app/assets.js';

export default function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Fragment>
      <AppBar position="sticky" sx={{ background: 'linear-gradient(to bottom, #28506E, #061A33)'}} elevation={0}>
        <Toolbar sx={{ px: 2, width: '100%', maxWidth: '100vw' }} disableGutters>
          <Typography sx={{ flexGrow: 1 }}>
            <IconButton size="small">
              <Link href="/">
                <Image
                  src={icons.Naur}
                  alt="NAUR icon"
                  height="40"
                  width="40"
                />
              </Link>
            </IconButton>
          </Typography>

          {/* Desktop menu */}
          <Box sx={{display: { xs: 'none', md: 'flex' } }}>
            <MenuList sx={{display: 'flex'}}>
              <li>
                <MenuItem component="a" href="/">
                  <Typography variant="h7" component="div" sx={{ textAlign: 'center' }}>
                      Home
                  </Typography>
                </MenuItem>
              </li>
                <UltimateDropdown name="Ultimates" />
                {pages.map((page) => (
                    <li key={page.name}>
                      <MenuItem component="a" href={page.link}>
                        <Typography sx={{ textAlign: 'center' }}>
                          {page.name}
                        </Typography>
                      </MenuItem>
                    </li>
                ))}
            </MenuList>
          </Box>
          <Box sx={{ px: 1 }}>
            <IconButton size="small">
              <Link href="https://discord.com/invite/naurffxiv">
                <Image
                  src={icons.Discord}
                  alt="Discord logo"
                  height="30"
                  width="30"
                />
              </Link>
            </IconButton>
          </Box>
          {/* Hamburger menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="icon-button"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          {/* Mobile menu */}
          <Menu
              disableScrollLock
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ 
                display: { xs: 'block', md: 'none' },
                '& .MuiMenuItem-root': {
                  justifyContent: 'flex-end', // Right aligns the menu items
                }
              }}
            >
              <li>
                <MenuItem onClick={handleCloseNavMenu} component="a" href="/">
                  <Typography sx={{ width: '100%', textAlign: 'left'  }}>
                    Home
                  </Typography>
                </MenuItem>
              </li>
              <MenuItem>
                <Box sx={{ width: '100%', textAlign: 'left' }}>
                  <UltimateDropdown name="Ultimates" isMobile={true} />
                </Box>
              </MenuItem>
              {pages.map((page) => (
                <li key={page.name}>
                  <MenuItem onClick={handleCloseNavMenu} component="a" href={page.link}>
                    <Typography sx={{ width: '100%', textAlign: 'left' }}>
                      {page.name}
                    </Typography>
                  </MenuItem>
                </li>
                ))}
          </Menu>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}
