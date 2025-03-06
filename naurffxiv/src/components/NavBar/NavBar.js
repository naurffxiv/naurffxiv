import React from 'react';
import { Fragment } from 'react';
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

import { pages } from '@/app/constants.js';
import { ThemeSwitch } from '@/app/adaptive-theme.js';
import { useThemeMode } from '@/app/themeContext';

import MenuIcon from '@mui/icons-material/Menu';
import UltimateDropdown from './UltimateDropdown.js';


export default function NavBar() {

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const { isDarkMode, toggleTheme } = useThemeMode();  // TODO: Move this to footer when implemented
  return (
    <Fragment>
      <AppBar position="sticky" color="primary" elevation={0}>
        <Toolbar sx={{ px: 2, width: '100%', maxWidth: '100vw' }} disableGutters>
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

          {/* Desktop menu */}
          <Box sx={{display: { xs: 'none', md: 'flex' } }}>
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
              <UltimateDropdown name="Ultimates" />
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
          </Box>
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
          {/* Hamburger menu*/}
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
          {/* Button for dark/light theme is commented out for now as design decisions,
          needs to be completely removed along with the code supporting the functionality
          when the decision to remove the button is final */}
          {/* <Box sx={{ px: 1 }}>
            <ThemeSwitch checked={isDarkMode} onChange={toggleTheme} />
          </Box> */}
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
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography sx={{ width: '100%', textAlign: 'right'  }}>
                  <Link href="/">Home</Link>
                </Typography>
              </MenuItem>

              <MenuItem>
              <Box sx={{ width: '100%', textAlign: 'right' }}>
                <UltimateDropdown name="Ultimates" isMobile={true} />
              </Box>
            </MenuItem>
            <MenuItem>
              <Box sx={{ width: '100%', textAlign: 'right' }}>
                <UltimateDropdown name="Guides" isMobile={true}/>
              </Box>
            </MenuItem>

              {pages.map((page) => (
              <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                <Typography sx={{ width: '100%', textAlign: 'right' }}>
                  <Link href={page.link}>{page.name}</Link>
                </Typography>
              </MenuItem>
              ))}
            </Menu>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}
