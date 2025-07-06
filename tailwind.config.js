import typography from "@tailwindcss/typography";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "header-default":
          "linear-gradient(rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.8) 100%), url('/images/server-header.avif')",
        "header-wide": "url('/images/server-header.avif')",
        "header-right-gradient":
          "linear-gradient(to right, rgba(0, 23, 31, 100%) 0%, rgba(0, 23, 31, 0%) 20%)",
        "header-right-ultrawide-gradient":
          "linear-gradient(to right, rgba(0, 23, 31, 100%) 0%, rgba(0, 23, 31, 0%) 20%, rgba(0, 23, 31, 0%) 80%, rgba(0, 23, 31, 100%) 100%)",
      },
      screens: {
        "3xl": "150rem",
      },
    },
  },
  darkMode: "class",
  plugins: [typography],
};
