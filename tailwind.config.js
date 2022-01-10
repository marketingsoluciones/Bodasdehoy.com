const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './layouts/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      "body": ['Montserrat', ...defaultTheme.fontFamily.sans],
      "display": ['Poppins', ...defaultTheme.fontFamily.sans],
      "title": ['Italiana', ...defaultTheme.fontFamily.sans],
    },
   
    extend: {
      colors: {
        primary: "#F7628C",  
        secondary: "#87F3B5",
        tertiary: "#49516F", 
        "color-base": "#F2F2F2",
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'checked'],
      appearance: ['hover', 'focus'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
