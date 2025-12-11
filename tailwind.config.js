/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#58a6ff',
        'brand-green': '#238636',
        'brand-dark': '#0d1117',
      },
    },
  },
  plugins: [],
}
