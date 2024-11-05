import * as React from 'react';
import { Container, Grid, AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from "@mui/material";
import Link from 'next/link';

export default function DropDown(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const { expansion, fightName, fightLink } = props ;

return (
    <div>
        <Button
          style={{color: 'white', textTransform: 'none'}}
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          >
            {expansion}
          </Button>
            <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{'aria-labelledby': 'basic-button',}}
            >
              <MenuItem onClick={handleClose}>
              <Link href={fightLink}>
              {fightName}
              </Link>
              </MenuItem>
            </Menu>
            </div>
)    
}