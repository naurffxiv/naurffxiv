export const pages = [
  {
    "name": "Findingway",
    "link": "https://findingway.io",
    "login_required": false,
  }
  /* Commented out for now, as these pages are not yet implemented
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
  */
];

export const ultimateList = [
  {
    "name": "Futures Rewritten",
    "link": "/ultimates/fru",
  },
  {
    "name": "The Omega Protocol",
    "link": "/ultimates/top",
  },
  {
    "name": "Dragonsong's Reprise",
    "link": "/ultimates/dsr",
  },
  {
    "name": "The Epic of Alexander",
    "link": "/ultimates/tea",
  },
  {
    "name": "The Weapon's Refrain",
    "link": "/ultimates/uwu",
  },
  {
    "name": "The Unending Coil of Bahamut",
    "link": "/ultimates/ucob",
  },
];

export const icons = {
  chat: "/icons/Chat.png",
  lightbulb: "/icons/Lightbulb.png",
  contact: "/icons/Contact.png",
  discord: "/icons/Discord.png",
  calendar: "/icons/Calendar.png",
};

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
          paddingLeft: '8px',
        },
      },
    },
  }),
});

export const slides = [
  {id: 1, url: '/', src: '/images/Bahamut.png', alt: 'Bahamut', title: 'The Unending Coil of Bahamut' },
  {id: 2, url: '/', src: '/images/Ultima.png', alt: 'Ultima', title: 'The Weapon\'s Refrain' },
  {id: 3, url: '/', src: '/images/Alexander.png', alt: 'Alexander', title: 'The Epic of Alexander' },
  {id: 4, url: '/', src: '/images/Thordan.png', alt: 'Thordan', title: 'Dragonsong\'s Reprise' },
  {id: 5, url: '/', src: '/images/Omega.png', alt: 'Omega', title: 'The Omega Protocol' },
  {id: 6, url: '/', src: '/images/Pandora.png', alt: 'Pandora', title: 'Futures Rewritten' },
];

export const linksUltimates = [
  {id: 1, name: "Futures Rewritten", url: "/ultimates/fru"},
  {id: 2, name: "The Omega Protocol", url: "/ultimates/top"},
  {id: 3, name: "Dragonsong's Reprise", url: "/ultimates/dsr"},
  {id: 4, name: "The Epic of Alexander", url: "/ultimates/tea"},
  {id: 5, name: "The Weapon's Refrain", url: "/ultimates/uwu"},
  {id: 6, name: "The Unending Coil of Bahamut", url: "/ultimates/ucob"},
];

export const linksExplore = [
  {id: 1, name: "Findingway", url: "https://findingway.io"},
  /* Commented out for now, as these pages are not yet implemented
  {id: 2, name: "Events", url: "/"},
  {id: 3, name: "Staff", url: "/"},
  */
];
