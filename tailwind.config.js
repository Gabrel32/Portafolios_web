/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-brown': '#DC5F00', // Agrega el color personalizado
        "BackColor":"#EEEEEE",
        "ActionColor":"#CF0A0A",
        "ChangeColor":"#3E92A3",
        "CompletColor":"#363636"


      },
    },
  },
  plugins: [],
}