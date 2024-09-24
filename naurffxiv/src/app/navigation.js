import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

export default function NavBar() {
	return (
        <>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 0 }}
            >
            </IconButton>
            <Typography justify-content="" variant="h8" component="div" sx={{ flexGrow: 1 }}>
              badussy
              <a href = "https://www.w3schools.com/tags/tag_a.asp" >
                Dawntrail
              </a>
            </Typography>
            <Typography justify-content="" variant="h8" component="div" sx={{ flexGrow: 1 }}>
            <a href = "https://www.w3schools.com/tags/tag_a.asp">
                Endwalker
              </a>
            </Typography>
            <Typography justify-content="" variant="h8" component="div" sx={{ flexGrow: 1 }}>
            <a href = "https://www.w3schools.com/tags/tag_a.asp">
                Shadowbringers
              </a>
            </Typography>
            <Typography justify-content="" variant="h8" component="div" sx={{ flexGrow: 1 }}>
            <a href = "https://www.w3schools.com/tags/tag_a.asp">
                Stormblood
              </a>
            </Typography>
            <Button color="inherit">Badussy</Button>
          </Toolbar>
        </AppBar>
      </Box>
        </>
    );
}