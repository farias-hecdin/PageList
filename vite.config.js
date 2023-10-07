import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    css: {
      modules: {
        generateScopedName: command === "build" ? "[hash:base64:6]" : "[local]_[hash:base64:3]",
      },
    },
  };
});
