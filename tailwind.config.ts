import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "paper-canvas": "#FBF9F5",
        "paper-subtle": "#EFE9DB",
        "paper-border": "#DED6C1",
        "paper-muted": "#CFC6B1",
        "paper-sand": "#B7B09E",
        "espresso-deep": "#261F1A",
        "ivory-bright": "#FAF7F2",
        "olive-umber": "#3D352E",
        "surface": "#FFF9EF",
        "surface-dim": "#E2D9C4",
        "surface-container": "#F6EDD7",
        "surface-container-low": "#FCF3DC",
        "surface-container-high": "#F1E8D1",
        "surface-container-highest": "#EBE2CC",
        "on-surface": "#1F1B0E",
        "on-surface-variant": "#4D4540",
        "primary": "#15100C",
        "secondary": "#695C52",
        "terracotta": "#C25E34",
        "terracotta-hover": "#A64B24",
      },
      fontFamily: {
        serif: ["var(--font-merriweather)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(38, 31, 26, 0.05), 0 1px 2px rgba(38, 31, 26, 0.03)",
        card: "0 4px 12px rgba(38, 31, 26, 0.06)",
        hover: "0 8px 24px rgba(38, 31, 26, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;

