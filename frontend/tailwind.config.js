/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        selected: "0 0px 10px 8px rgba(59, 131, 246, 1)",
      },
    },
  },
  plugins: [],
}
