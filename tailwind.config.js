const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  flowbite.content(),],
  theme: {
    
    extend: {

      translate: {
        '-full': '-100%',
      },
      boxShadow: {
        card : ' rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;',
        custom: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        loginicon: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
      },

      borderWidth: {
        '0.5': '0.5px',
      },
      
      colors: {
        Navbarbg: '#131921',
         Black:'#000000',
         yellow:'#FFD814',
         darkblue:'#232F3E',
         adminbg:'#BBD4C0'

      },

      screens: {

        'smDesk': {'max':'1250px'},
        'Desk': {'max':'1450px'},
        
        'LgTab2': {'max':'1000px'},
        'LgTab': {'max':'800px'},
        'Tab': {'max':'767px'},
        'TabS': {'max':'700px'},
        'xsmMobile': {'max':'350px'},

        'SmMobile': {'max':'390px'},
        'Mobile': {'max':'450px'},
        'LgMobile': {'max':'500px'},
        'LgMobile2': {'max':'550px'},

        

        

      
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Inter as the only font
      },
      fontWeight: {
        thin: 100,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },

      fontSize: {
        'small': '12px', // Set 12px as small font size
        'xs': '10px', 
        'xsm':'13px',
        'sm': '14px', 
        'basex': '16px', 
        'base2x': '16px', 

        'base': '22px',    // Example custom font size
        'lg': '20px',
        'lgx': '32px',
          // Example custom font size
        'xl': '1.25rem',   // Example custom font size
        '2xl': '1.5rem', // Example custom font size
        '3xl': '1.875rem', // Example custom font size
        '4xl': '2.25rem',  // Example custom font size
        '5xl': '3rem',   // Example custom font size
        '6xl': '4rem',   // Example custom font size
      },
      
    },
    
  },
  plugins: [ flowbite.plugin(),],
}

