import type { Config } from "tailwindcss";
import * as colors from "@radix-ui/colors"; // Import all Radix color palettes

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "360px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        OS_extralight: ["CabinetGrotesk-ExtraLight", "sans-serif"],
        OS_light: ["CabinetGrotesk-Light", "sans-serif"],
        OS_regular: ["CabinetGrotesk-Regular", "sans-serif"],
        OS_medium: ["CabinetGrotesk-Medium", "sans-serif"],
        OS_bold: ["CabinetGrotesk-Bold", "sans-serif"],
        OS_extrabold: ["CabinetGrotesk-ExtraBold", "sans-serif"],
        OS_black: ["CabinetGrotesk-Black", "sans-serif"],
        OS_mono_light: ["IntelOneMono-Light", "monospace"],
        OS_mono_lightitalic: ["IntelOneMono-LightItalic", "monospace"],
        OS_mono_regular: ["IntelOneMono-Regular", "monospace"],
        OS_mono_italic: ["IntelOneMono-Italic", "monospace"],
        OS_mono_medium: ["IntelOneMono-Medium", "monospace"],
        OS_mono_medium_italic: ["IntelOneMono-MediumItalic", "monospace"],
        OS_mono_bold: ["IntelOneMono-Bold", "monospace"],
        OS_mono_bold_italic: ["IntelOneMono-BoldItalic", "monospace"],
      },
      // Extend Tailwind colors with Radix colors
      colors: {
        ...Object.keys(colors).reduce((acc, key) => {
          const colorGroup = colors[key];
          acc[key] = colorGroup;
          return acc;
        }, {}),
      },
    },
  },
  plugins: [],
};

export default config;
