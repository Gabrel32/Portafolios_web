/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        klee: ['Klee One', 'sans-serif'],
      },
      colors: {
        'custom-brown': '#DC5F00',
        "ActionColor": "#CF0A0A",
        "ChangeColor": "#3E92A3",
        "CompletColor": "#363636",
        'efectHovercolor': '#a95210',
      },
      spacing: {
        '200%': '200%',
      },
      zIndex: {
        '-1': '-1',
        '10': '10',
      },
    },
  },
  plugins: [],
}
