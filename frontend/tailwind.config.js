const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // ...
    flowbite.content(),
  ],
  plugins: [
    // ...
    flowbite.plugin(),
  ],
};


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    
    "./node_modules/flowbite/**/*.js"

  ],
  theme: {
    extend: {
      screens: {
        
        xs: '240px', // Smallest screen, starts at 240px
        sm: '501px', // Small screens, starts at 501px
        md: '650px', // Medium screens, starts at 650px
        lg: '851px', // Large screens, starts at 851px
      },
    },
  },
  plugins: [
     require('flowbite/plugin')
  ],
}
