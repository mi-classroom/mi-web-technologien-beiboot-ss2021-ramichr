module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        medium: "#666",
        dark: "#444",
        darker: "#222",
        darkest: "#000",
        darken: "rgba(0,0,0,.04)",
        darken_medium: "rgba(0,0,0,.1)",
        darken_strong: "rgba(0,0,0,.2)",
        light: "#B4B4B4",
        lighter: "#F2F2F2",
        lightest: "#FFF",
        lighten: "rgba(255,255,255,0.1)",
        lighten_strong: "rgba(255,255,255,0.3)",
        accent: "#FFCC00",
        error: "#CC0000",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
