module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        cardFlip: {
          '0%, 100%': { transform: 'rotateX(0deg)' },
          '45%, 55%': { transform: 'rotateX(180deg)' }
        }
      },
      animation: {
        gradient: 'gradient 5s ease infinite',
        cardFlip: 'cardFlip 6s ease-in-out 3'
      }
    },
  },
  plugins: [],
}