import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Container } from "@mui/material";
import { Grid } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';

export default function NavBar() {

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
                NAUR
              </Typography>
              <Typography justify-content="" variant="h8" component="div" sx={{ flexGrow: 1 }}>
                <a href="https://www.w3schools.com/tags/tag_a.asp" >
                  Dawntrail
                </a>
              </Typography>
              <Typography justify-content="" variant="h8" component="div" sx={{ flexGrow: 1 }}>
                <a href="https://www.w3schools.com/tags/tag_a.asp">
                  Endwalker
                </a>
              </Typography>
              <Typography justify-content="" variant="h8" component="div" sx={{ flexGrow: 1 }}>
                <a href="https://www.w3schools.com/tags/tag_a.asp">
                  Shadowbringers
                </a>
              </Typography>
              <Typography justify-content="" variant="h8" component="div" sx={{ flexGrow: 1 }}>
                <a href="https://www.w3schools.com/tags/tag_a.asp">
                  Stormblood
                </a>
              </Typography>
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
