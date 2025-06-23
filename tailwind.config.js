/** @type {import('tailwindcss').Config} */
export const theme = {
  extend: {
    animation: {
      "slide-in": "slideIn 0.3s ease-out forwards",
      "slide-out": "slideOut 0.3s ease-in forwards",
    },
    keyframes: {
      slideIn: {
        "0%": { transform: "translateX(100%)" },
        "100%": { transform: "translateX(0)" },
      },
      slideOut: {
        "0%": { transform: "translateX(0)" },
        "100%": { transform: "translateX(100%)" },
      },
    },
  },
};
