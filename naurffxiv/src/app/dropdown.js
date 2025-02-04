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
import { ultimateList } from './constants.js';
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

  // Menu props based on mobile/desktop mode
  const menuProps = {
    id: "basic-menu",
    anchorEl: anchorEl,
    open: open,
    onClose: handleClose,
    MenuListProps: {'aria-labelledby': 'basic-button'},
    ...(isMobile && {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      },
      transformOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
      sx: {
        '& .MuiMenu-paper': {
          width: 200,
        },
        '& .MuiMenuItem-root': {
          justifyContent: 'flex-end',
          padding: '8px 16px',
          '& a': {
            width: '100%',
            textAlign: 'right',
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            lineHeight: '1.4',
            display: 'block',
            paddingLeft: '8px' 
          }
        }
      }
    })
  };

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
            <MenuItem onClick={handleClose}>
              <Link href={fight.link}>
                {fight.name}
              </Link>
            </MenuItem>
          </li>
        ))}
      </Menu>
    </>
  );
}