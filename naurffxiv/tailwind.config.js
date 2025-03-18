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
        "header-gradient":
          "linear-gradient(to right, rgba(20, 19, 32, 0%) 0%, #1A192B 5%, #1A192B 75%, var(--background-hex) 90%)",
        "header-default":
          "linear-gradient(rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.8) 100%), url('/images/server-header.png')",
        "header-wide":
          "url('/images/server-header.png')",
        "header-right-gradient":
          "linear-gradient(to right, rgba(26, 25, 43, 100%) 0%, rgba(26, 25, 43, 0%) 20%)",
        "header-right-ultrawide-gradient":
          "linear-gradient(to right, rgba(26, 25, 43, 100%) 0%, rgba(26, 25, 43, 0%) 20%, rgba(0, 23, 31, 0%) 80%, rgba(0, 23, 31, 100%) 100%)",
      },
      screens: {
        "3xl": '150rem',
      }
    },
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/typography')],
};
