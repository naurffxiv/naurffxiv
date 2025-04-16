import { images } from "./assets";

export const markdownFolders = ["ultimate", "savage", "extreme"];

export const reservedSlugs = ["index", "groups", "sidebar", "title", "order"];

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
    title: "Futures Rewritten",
    url: "/ultimate/fru",
    img: images.Pandora,
    alt: "Pandora",
  },
  {
    title: "The Omega Protocol",
    url: "/ultimate/top",
    img: images.Omega,
    alt: "Omega",
  },
  {
    title: "Dragonsong's Reprise",
    url: "/ultimate/dsr",
    img: images.Thordan,
    alt: "Thordan",
  },
  {
    title: "The Epic of Alexander",
    url: "/ultimate/tea",
    img: images.Alexander,
    alt: "Alexander",
  },
  {
    title: "The Weapon's Refrain",
    url: "/ultimate/uwu",
    img: images.Ultima,
    alt: "Ultima",
  },
  {
    title: "The Unending Coil of Bahamut",
    url: "/ultimate/ucob",
    img: images.Bahamut,
    alt: "Bahamut",
  },
];

export const savageList = [
  {
    title: "M5S - Dancing Green",
    url: "/savage/m5s",
  },
  {
    title: "M6S - Sugar Riot",
    url: "/savage/m6s",
  },
  {
    title: "M7S - Brute Abombinator",
    url: "/savage/m7s",
  },
  {
    title: "M8S - Howling Blade",
    url: "/savage/m8s",
  },
];

export const extremeList = [
  {
    title: "Recollection",
    url: "/extreme/recollection",
  },
  {
    title: "Sphene's Burden",
    url: "/extreme/sphenes-burden",
  },
  {
    title: "Everkeep",
    url: "/extreme/everkeep",
  },
  {
    title: "Worqor Lar Dor",
    url: "/extreme/worqor-lar-dor",
  },
];

export const otherList = [
  {
    title: "Join our Discord",
    url: "https://discord.gg/naurffxiv",
  },
  {
    title: "Support us on Patreon",
    url: "https://patreon.com/naurffxiv",
  },
  {
    title: "GitHub Repository",
    url: "https://github.com/naurffxiv/naurffxiv",
  },
  {
    title: "Findingway.io",
    url: "https://findingway.io",
  },
  /* Commented out for now, as these pages are not yet implemented
  {
    title: "Events",
    url: "/"
  },
  {
    title: "Staff",
    url: "/"
  },
  */
];

// Menu props based on mobile/desktop mode
export const getMenuProps = (anchorEl, open, handleClose, isMobile) => ({
  id: "basic-menu",
  anchorEl: anchorEl,
  open: open,
  onClose: handleClose,
  MenuListProps: { "aria-labelledby": "basic-button" },
  ...(isMobile && {
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "right",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "right",
    },
    sx: {
      "& .MuiMenu-paper": {
        width: 200,
      },
      "& .MuiMenuItem-root": {
        justifyContent: "flex-end",
        padding: "8px 16px",
        "& a": {
          width: "100%",
          textAlign: "right",
          whiteSpace: "normal",
          wordBreak: "break-word",
          lineHeight: "1.4",
          display: "block",
          paddingLeft: "8px",
        },
      },
    },
  }),
});
