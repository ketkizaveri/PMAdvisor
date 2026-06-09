import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17212B",
        cloud: "#F7F9FC",
        line: "#D7DEE8",
        brand: "#2563EB",
        navy: "#0F172A",
        mint: "#14B8A6",
        steel: "#64748B",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(15, 23, 42, 0.1)",
        panel: "0 28px 80px rgba(15, 23, 42, 0.12)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
