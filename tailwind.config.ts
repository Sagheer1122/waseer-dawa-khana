import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#18352A",
          50: "#F2F7F4",
          100: "#E3EFE9",
          200: "#C4DED2",
          300: "#9ECAB8",
          400: "#6EA993",
          500: "#448A71",
          600: "#2B6852",
          700: "#1E4C3C",
          800: "#18352A", // Deep Forest Green
          900: "#0F221B",
          950: "#08130F",
        },
        sage: {
          DEFAULT: "#526B52",
          50: "#F4F7F4",
          100: "#E5ECE5",
          200: "#CBD8CB",
          300: "#AAC0AA",
          400: "#7F9F7F",
          500: "#526B52", // Sage Green
          600: "#415541",
          700: "#344434",
          800: "#2A372A",
          900: "#232D23",
        },
        olive: {
          DEFAULT: "#87977A",
          50: "#F7F9F6",
          100: "#ECF1EA",
          200: "#D9E3D5",
          300: "#BFD0B9",
          400: "#A3BA99",
          500: "#87977A", // Muted Olive
          600: "#6A7A5F",
          700: "#526049",
          800: "#434E3C",
          900: "#384133",
        },
        cream: {
          DEFAULT: "#F6F2E9",
          50: "#FCFAF6",
          100: "#F6F2E9", // Warm Cream
          200: "#EBE3D0",
          300: "#DDD0B3",
          400: "#CEBC94",
          500: "#BFA876",
        },
        ivory: {
          DEFAULT: "#FFFDF8",
          50: "#FFFFFF",
          100: "#FFFDF8", // Soft Ivory
          200: "#FAF6EC",
          300: "#F3EDE0",
        },
        earth: {
          DEFAULT: "#3A3027",
          50: "#F9F8F6",
          100: "#ECE8E4",
          200: "#D6CDC4",
          300: "#B6A799",
          400: "#917E6E",
          500: "#705E4F",
          600: "#56473B",
          700: "#3A3027", // Earth Brown
          800: "#2B231D",
          900: "#1C1713",
        },
        gold: {
          DEFAULT: "#B08D57",
          50: "#FBF8F2",
          100: "#F5EDE0",
          200: "#E9D9BF",
          300: "#DCBF97",
          400: "#CEA570",
          500: "#B08D57", // Muted Gold
          600: "#967543",
          700: "#795B34",
          800: "#644A2C",
          900: "#543E27",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        display: ["var(--font-playfair)", "Playfair Display", "Cormorant Garamond", "serif"],
        sans: ["var(--font-jakarta)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
