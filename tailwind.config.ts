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
        background: "#0f0f0f",
        surface: "#1a1a1a",
        "surface-alt": "#111111",
        accent: "#f5c518",
        "accent-hover": "#d4a812",
        "text-primary": "#ffffff",
        "text-secondary": "#a0a0a0",
        "text-muted": "#666666",
        border: "rgba(255,255,255,0.08)",
        "border-hover": "rgba(255,255,255,0.20)",
        destructive: "#ef4444",
        warning: "#eab308",
        success: "#22c55e",
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        button: "8px",
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('@tailwindcss/typography'),
  ],
};
export default config;
