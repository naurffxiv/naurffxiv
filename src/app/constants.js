import { images } from './assets'

export const markdownFolders = ['ultimate']

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
    "link": "/ultimate/fru",
  },
  {
    "name": "The Omega Protocol",
    "link": "/ultimate/top",
  },
  {
    "name": "Dragonsong's Reprise",
    "link": "/ultimate/dsr",
  },
  {
    "name": "The Epic of Alexander",
    "link": "/ultimate/tea",
  },
  {
    "name": "The Weapon's Refrain",
    "link": "/ultimate/uwu",
  },
  {
    "name": "The Unending Coil of Bahamut",
    "link": "/ultimate/ucob",
  },
];

export const savageExtremeList = [
  {
    "name": "M5S - Boss name",
    "link": "/savage/m5s",
  },
  {
    "name": "M6S - Boss name",
    "link": "/savage/m6s",
  },
  {
    "name": "M7S - Boss name",
    "link": "/savage/m7s",
  },
  {
    "name": "M8S - Boss name",
    "link": "/savage/m8s",
  },
  {
    "name": "Dawntrail Ex 4 - Recollection",
    "link": "/extremes/dt-ex4",
  },
  {
    "name": "Archived Content",
    "link": "/archive",
  },
];

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

export const ultimateImages = [
  {id: 6, url: '/ultimate/fru', src: images.Pandora, alt: 'Pandora', title: 'Futures Rewritten' },
  {id: 5, url: '/ultimate/top', src: images.Omega, alt: 'Omega', title: 'The Omega Protocol' },
  {id: 4, url: '/ultimate/dsr', src: images.Thordan, alt: 'Thordan', title: 'Dragonsong\'s Reprise' },
  {id: 3, url: '/ultimate/tea', src: images.Alexander, alt: 'Alexander', title: 'The Epic of Alexander' },
  {id: 2, url: '/ultimate/uwu', src: images.Ultima, alt: 'Ultima', title: 'The Weapon\'s Refrain' },
  {id: 1, url: '/ultimate/ucob', src: images.Bahamut, alt: 'Bahamut', title: 'The Unending Coil of Bahamut' },
];

export const linksUltimates = [
  {id: 1, name: "Futures Rewritten", url: "/ultimate/fru"},
  {id: 2, name: "The Omega Protocol", url: "/ultimate/top"},
  {id: 3, name: "Dragonsong's Reprise", url: "/ultimate/dsr"},
  {id: 4, name: "The Epic of Alexander", url: "/ultimate/tea"},
  {id: 5, name: "The Weapon's Refrain", url: "/ultimate/uwu"},
  {id: 6, name: "The Unending Coil of Bahamut", url: "/ultimate/ucob"},
];

export const linksOther = [
  {id: 1, name: "Findingway", url: "https://findingway.io"},
  /* Commented out for now, as these pages are not yet implemented
  {id: 2, name: "Events", url: "/"},
  {id: 3, name: "Staff", url: "/"},
  */
];
