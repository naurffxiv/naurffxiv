import * as React from 'react';
import { Container, Grid, AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from "@mui/material";
import Link from 'next/link';
import DropDown from "./dropdown.js";
import { ultimateList } from "./constants.js";

// import MenuIcon from '@mui/icons-material/Menu';
// adding dropdown functionality to links in nav bar & moving href links to respective menu
// replace NAUR with correct favicon
// create placeholder for EW ultimate raid

export default function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container disableGutters maxWidth={false}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 0 }}
          />
          <Grid container >
            <Grid item xs={6} style={{ textAlign: 'left' }} sx={{ display: 'inline-flex' }}>
              <Typography justify-content="" variant="h8" component="div" sx={{ flexGrow: 1 }}>
                <Link href="/">
                  NAUR
                </Link>
              </Typography>

              <DropDown expansion="Dawntrail" fightName="Futures Rewritten" fightLink="/ultimates/dsr"/>

              <DropDown expansion="Endwalker" fightName="Dragonsong's Reprise" fightLink="/ultimates/dsr"/>

              <DropDown expansion="Shadowbringers" fightName="The Epic of Alexander" fightLink="/ultimates/tea"/>
              <DropDown expansion="Stormblood" fightName="The Unending Coil of Bahamut" fightLink="/ultimates/ucob"/>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item xs={0.5} style={{ textAlign: 'right' }} sx={{ display: 'inline-flex' }}>
              <a href="https://github.com/naurffxiv" target="_blank" rel="noopener noreferrer">
                <img src="/images/githublogo.png" alt="GitHub Logo" width="18" height="18" />
              </a>
            </Grid>
            <Grid item xs={0.5} style={{ textAlign: 'right' }} sx={{ display: 'inline-flex' }}>
              <a href="https://discord.gg/naurffxiv" target="_blank" rel="noopener noreferrer">
                <img src="/images/discordlogo.png" alt="Discord Logo" width="20" height="20" />
              </a>
            </Grid>
          </Grid>
      </Toolbar>
    </AppBar>
    </Container>
  );
}
