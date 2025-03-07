module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        cardFlip: {
          '0%, 100%': { transform: 'rotateX(0deg)' },
          '45%, 55%': { transform: 'rotateX(180deg)' }
        }
      },
      animation: {
        cardFlip: 'cardFlip 6s ease-in-out 3'
      }
    },
  },
  plugins: [],
}