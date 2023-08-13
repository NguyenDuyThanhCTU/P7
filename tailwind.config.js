/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      screens: {
        p: "375px",
        d: "1024px",
      },

      backgroundImage: {},
      backgroundColor: {},

      fontFamily: {
        OpenSans: ["Open Sans", "sans-serif"],
        LexendDeca: ["Lexend Deca", "sans-serif"],
        Montserrat: ["Montserrat", "sans-serif"],
        NunitoSans: ["Nunito Sans", "sans-serif"],
        SVNDancing: ["SVN-Dancing", "sans-serif"],
      },
      colors: {
        //Dashboard
        redPrimmary: "#ed1b2e",
        Blue3D: "#1D1D3D",
        colortopdownBlue: "#2c95ff",
        colortopdownGray: "#414045",
        blueAdmin: "#74affc",
        purpleAdmin: "#bb86fc37",
        purpleHover: "#BB86FC",
        BlueFF: "#1A49FF",

        //Custom

        mainblue: "#3696b4",
        mainpink: "#ac192c",
      },
    },
  },

  plugins: [],
};
