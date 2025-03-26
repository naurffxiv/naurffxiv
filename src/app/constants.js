import { images } from './assets'

export const markdownFolders = ['ultimate', 'savage', 'extreme'];

export const pages = [
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

export const savageList = [
  {
    "name": "M5S - Dancing Green",
    "link": "/savage/m5s",
  },
  {
    "name": "M6S - Sugar Riot",
    "link": "/savage/m6s",
  },
  {
    "name": "M7S - Brute Abombinator",
    "link": "/savage/m7s",
  },
  {
    "name": "M8S - Howling Blade",
    "link": "/savage/m8s",
  },
];

export const extremeList = [
  {
    "name": "Recollection",
    "link": "/extreme/recollection",
  },
  {
    "name": "Sphene's Burden",
    "link": "/extreme/sphenes-burden",
  },
  {
    "name": "Everkeep",
    "link": "/extreme/everkeep",
  },
  {
    "name": "Worqor Lar Dor",
    "link": "/extreme/worqor-lar-dor",
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

export const linksUltimate = [
  {id: 1, name: "Futures Rewritten", url: "/ultimate/fru"},
  {id: 2, name: "The Omega Protocol", url: "/ultimate/top"},
  {id: 3, name: "Dragonsong's Reprise", url: "/ultimate/dsr"},
  {id: 4, name: "The Epic of Alexander", url: "/ultimate/tea"},
  {id: 5, name: "The Weapon's Refrain", url: "/ultimate/uwu"},
  {id: 6, name: "The Unending Coil of Bahamut", url: "/ultimate/ucob"},
];

export const linksSavage = [
  {id: 1, name: "M5S - Dancing Green", url: "/savage/m5s"},
  {id: 2, name: "M6S - Sugar Riot", url: "/savage/m6s"},
  {id: 3, name: "M7S - Brute Abombinator", url: "/savage/m7s"},
  {id: 4, name: "M8S - Howling Blade", url: "/savage/m8s"},
];

export const linksExtreme = [
  {id: 1, name: "Recollection", url: "/extreme/recollection"},
  {id: 2, name: "Sphene's Burden", url: "/extreme/sphenes-burden"},
  {id: 3, name: "Everkeep", url: "/extreme/everkeep"},
  {id: 4, name: "Worqor Lar Dor", url: "/extreme/worqor-lar-dor"},
];

export const linksOther = [
  {id: 1, name: "Join our Discord", url: "https://discord.gg/naurffxiv"},
  {id: 2, name: "Support us on Patreon", url: "https://patreon.com/naurffxiv"},
  {id: 3, name: "GitHub Repository", url: "https://github.com/naurffxiv/naurffxiv"},
  {id: 4, name: "Findingway.io", url: "https://findingway.io"},
  /* Commented out for now, as these pages are not yet implemented
  {id: 2, name: "Events", url: "/"},
  {id: 3, name: "Staff", url: "/"},
  */
];
