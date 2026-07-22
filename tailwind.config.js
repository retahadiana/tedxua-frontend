/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ted: {
          red: '#EB0028',
          dark: '#0A0A0A',
          grey: '#333333',
        },
      },
    },
  },
  plugins: [],
}
