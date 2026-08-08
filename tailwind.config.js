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
      fontFamily: {
        gordita: ['Gordita', 'sans-serif'],
        swung: ['Swung Note', 'cursive'],
        swungnote: ['Swung Note', 'cursive'],
        SwungNote: ['Swung Note', 'cursive'],
        essays: ['Essays1743', 'serif'],
      },
    },
  },
  plugins: [],
}
