/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/root/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        fill: "-webkit-fill-available",
        screen: "100vh",
        "safe-screen": "calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))",
      },
      maxHeight: {
        fill: "-webkit-fill-available",
        screen: "100vh",
        "safe-screen": "calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))",
      },
      padding: {
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-left": "env(safe-area-inset-left)",
        "safe-right": "env(safe-area-inset-right)",
      },
      fontFamily: {
        sans: ["SF Pro", "Arial", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      colors: {
        "maket-primary": "#001D55",
        "maket-secondary": "#32ADE6",
        "maket-bg": "#F8F9FA",
        "maket-gray": "#677294",
        "maket-green": "#34C759",
        "maket-gold": "#F0E7D8",
        "maket-batafsil": "rgba(50, 173, 230, 0.1)",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "neon-glow-brighter": {
          "0%, 100%": {
            "box-shadow": "0 0 8px rgba(255, 255, 255, 0.8), 0 0 16px rgba(255, 255, 255, 0.6)",
          },
          "50%": {
            "box-shadow": "0 0 24px rgba(255, 255, 255, 0.9), 0 0 40px rgba(255, 255, 255, 0.7)",
          },
        },
        "neon-hover-brighter": {
          "0%, 100%": {
            "box-shadow": "0 0 8px #32ADE6, 0 0 16px #32ADE6",
          },
          "50%": {
            "box-shadow": "0 0 24px #32ADE6, 0 0 40px #32ADE6",
          },
        },
      },
      animation: {
        "neon-glow-brighter": "neon-glow-brighter 2s ease-in-out infinite alternate",
        "neon-hover-brighter": "neon-hover-brighter 2s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};