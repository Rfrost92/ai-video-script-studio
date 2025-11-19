/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: "#f1f5ff",
                    100: "#dbe4ff",
                    200: "#bed0ff",
                    500: "#3b82f6",
                    600: "#2563eb",
                    800: "#1e3a8a"
                }
            },
            boxShadow: {
                "soft-card": "0 22px 45px -24px rgba(15,23,42,0.55)"
            }
        }
    },
    plugins: []
};

export default config;
