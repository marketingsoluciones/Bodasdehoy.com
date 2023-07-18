const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './layouts/**/*.{js,ts,jsx,tsx}'],
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
        "yellow-button": "#FBFF4E",
        "green-secundario": "#75E8BE"
      },
      transitionProperty: {
        'height': 'height'
      },
      spacing:{
        '182px':'177.5px',
        '20px':'23px',
        '267px':'136px',
        '17px':'17px'
      }
    },
  },
  // corePlugins: {
  //   preflight: false,
  // },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp')
  ],
}
