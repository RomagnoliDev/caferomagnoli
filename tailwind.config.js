/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        romagnoli: {
          cream: "#463625ff",
          red: "#7c1f24",
          green: "#2e5e3e",
        },
        toscano: {
          wood: "#6b4f3a",
          gold: "#917143ff",
          smoke: "#1f1a17",
        },
      },
      fontFamily: {
        sans: ["var(--font-lugrasimo)"],
        serif: ["var(--font-lugrasimo)"],
        display: ["var(--font-lugrasimo)"],
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,.06)"
      },
      borderRadius: {
        xl2: "1.25rem"
      }
    },
  },
  plugins: [],
};
