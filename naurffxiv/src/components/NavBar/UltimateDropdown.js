import * as React from 'react';
import {
  Container,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box
} from "@mui/material";
import Link from 'next/link';
import { ultimateList, getMenuProps } from '@/app/constants.js';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function UltimateDropdown(props) {
  const {name, isMobile} = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuProps = getMenuProps(anchorEl, open, handleClose, isMobile);

  return (
    <>      
      {isMobile ? (
        <Typography onClick={handleClick} sx={{ width: '100%', textAlign: 'right' }}>
          {name}
          <ArrowDropDownIcon/>
        </Typography>
      ) : (
        <Button
          style={{color: 'white', textTransform: 'none'}}
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <Typography variant="h6" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }} }>
            <Typography sx={{ textAlign:'center' }}>
              {name}
            </Typography>
            <ArrowDropDownIcon/>
          </Typography>
        </Button>
      )}
      <Menu {...menuProps}>
        {ultimateList.map((fight, i) => (
          <li key={i}>
            <MenuItem onClick={handleClose} sx={{ justifyContent: 'flex-start' }}>
              <Link href={fight.link}>
                <Typography sx={{ textAlign: 'left' }}>
                  {fight.name}
                </Typography>
              </Link>
            </MenuItem>
          </li>
        ))}
      </Menu>
    </>
  );
}