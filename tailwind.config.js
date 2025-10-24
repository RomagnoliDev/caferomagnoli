/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        romagnoli: {
          cream: "#f7efe6",
          red: "#7c1f24",
          green: "#2e5e3e",
        },
        toscano: {
          wood: "#6b4f3a",
          gold: "#b08d57",
          smoke: "#1f1a17",
        },
      },
      fontFamily: {
        display: ["ui-serif", "Georgia", "serif"],
        sans: ["ui-sans-serif", "system-ui"],
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
