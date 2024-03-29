/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'azul-claro': "#B2DAFF",
        'cinza': {
          'escuro':  '#BCBCBC',
          'claro': '#D6D6D6'
        },
        'branco': '#FFF',
        'azul': '#1669B6',
        'verde': '#00CE3A',
        'vermelho': '#D20808',
        'amarelo': '#EBFF00'
      }
    },
  },
  plugins: [],
}

