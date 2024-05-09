import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      "X-Frame-Options": "*", // Stops your site being used as an iframe
    },
  },
});
