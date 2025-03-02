export const pages = [
  {
    "name": "Events",
    "link": "/events",
    "login_required": false,
  },
  {
    "name": "Staff",
    "link": "/staff",
    "login_required": true,
  },
]

export const ultimateList = [
  {
    "name": "Futures Rewritten",
    "link": "/resources/fru",
  },
  {
    "name": "The Omega Protocol",
    "link": "/resources/top",
  },
  {
    "name": "Dragonsong's Reprise",
    "link": "/resources/dsr",
  },
  {
    "name": "The Epic of Alexander",
    "link": "/resources/tea",
  },
  {
    "name": "The Weapon's Refrain",
    "link": "/resources/uwu",
  },
  {
    "name": "The Unending Coil of Bahamut",
    "link": "/resources/ucob",
  },
]

export const getIcons = (isDarkMode) => ({
  chat: isDarkMode ? "/icons/Chat.png" : "/icons/Chat-Dark.png",
  lightbulb: isDarkMode ? "/icons/Lightbulb.png" : "/icons/Lightbulb-Dark.png",
  contact: isDarkMode ? "/icons/Contact.png" : "/icons/Contact-Dark.png",
  discord: isDarkMode ? "/icons/Discord.png" : "/icons/Discord-Dark.png",
  calendar: isDarkMode ? "/icons/Calendar.png" : "/icons/Calendar-Dark.png",
});

  // Menu props based on mobile/desktop mode
  export const getMenuProps = (anchorEl, open, handleClose, isMobile) => ({
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
  });