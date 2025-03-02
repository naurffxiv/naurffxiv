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