import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    host: "0.0.0.0",
    port: 4173,
    allowedHosts: ["personal-finance-tracker-frontend-ck15.onrender.com"],
  },
});
