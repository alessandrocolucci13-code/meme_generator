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
        primary: {
          DEFAULT: "#6366f1",
          dark: "#4f46e5",
          light: "#818cf8",
        },
        background: "#0f172a",
        surface: {
          DEFAULT: "#1e293b",
          light: "#334155",
        },
        text: {
          primary: "#f1f5f9",
          secondary: "#cbd5e1",
          muted: "#94a3b8",
        },
        border: "#334155",
        success: {
          DEFAULT: "#10b981",
          dark: "#059669",
        },
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.3)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.4)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.6)",
      },
      textShadow: {
        lg: "0 2px 8px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
