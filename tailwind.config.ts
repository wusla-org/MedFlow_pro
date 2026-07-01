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
        background: "var(--background)",
        foreground: "var(--foreground)",
        steelBlue: {
          DEFAULT: "var(--accent-blue)",
          light: "#60a5fa",
          dark: "#1e40af",
        },
        accentCyan: "var(--accent-cyan)",
        accentAmber: "var(--accent-amber)",
        accentEmerald: "var(--accent-emerald)",
      },
    },
  },
  plugins: [],
};
export default config;
