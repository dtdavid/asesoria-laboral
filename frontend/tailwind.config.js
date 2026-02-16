/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#F9FAFB",
          surface: "#F3F4F6",
          border: "#E5E7EB",
          text: "#111827",
          muted: "#6B7280",
          primary: "#1F3A5F",
          primaryHover: "#162B47",
          secondary: "#3B82B1",
          secondaryHover: "#2F6C95",
          footer: "#2F3E4F",
        },
      },
    },
  },
  plugins: [],
}

