/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Fallas theme colors from Design/
        'valencia-orange': '#FF6B35',
        'flame-red': '#E63946',
        'warm-cream': '#FFF8F0',
        'gold': '#FFB800',
        
        // Semantic colors
        background: '#FFF8F0',
        foreground: '#2d2d2d',
        card: '#ffffff',
        'card-foreground': '#2d2d2d',
        primary: '#FF6B35',
        'primary-foreground': '#ffffff',
        secondary: '#E63946',
        'secondary-foreground': '#ffffff',
        muted: '#ececf0',
        'muted-foreground': '#717182',
        accent: '#FFB800',
        'accent-foreground': '#2d2d2d',
        border: 'rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'sm': '0.425rem',  // radius - 4px
        'md': '0.525rem',  // radius - 2px
        'lg': '0.625rem',  // radius (10px)
        'xl': '1.025rem',  // radius + 4px
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
