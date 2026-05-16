/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border:"hsl(var(--border,214.3 31.8% 91.4%))",
        input:"hsl(var(--input,214.3 31.8% 91.4%))",
        background:"hsl(var(--background,0 0% 100%))",
        foreground:"hsl(var(--foreground,222.2 84% 4.9%))",
        primary:{ DEFAULT:"hsl(var(--primary,221.2 83.2% 53.3%))", foreground:"hsl(var(--primary-foreground,210 40% 98%))" },
        muted:{ DEFAULT:"hsl(217.2 32.6% 17.5%)", foreground:"hsl(215 20.2% 65.1%)" },
      },
      borderRadius: { lg:"var(--radius,0.5rem)", md:"calc(var(--radius,0.5rem) - 2px)", sm:"calc(var(--radius,0.5rem) - 4px)" }
    }
  },
  plugins: []
}
