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
        aura: {
          neonCyan: '#00f3ff',
          neonPurple: '#b537f2',
          darkBg: '#090a0f',
          glassMenu: 'rgba(20, 22, 32, 0.45)',
          glassBorder: 'rgba(255, 255, 255, 0.08)'
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        'neon': '0 0 10px #00f3ff, 0 0 20px #00f3ff, 0 0 40px #00f3ff',
        'neon-purple': '0 0 10px #b537f2, 0 0 20px #b537f2, 0 0 40px #b537f2',
      }
    },
  },
  plugins: [],
};
export default config;
