const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        secondary: colors.slate,
        alpha: colors.yellow,
        beta: colors.red
      }
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}