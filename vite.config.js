import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    base: command === "build" ? "https://farias-hecdin.github.io/Pagelist/" : "/",
    css: {
      modules: {
        generateScopedName: command === "build" ? "[hash:base64:9]" : "[local]_[hash:base64:5]",
      },
    },
  };
});
