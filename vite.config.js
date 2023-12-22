import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      react(),
      AutoImport({
        resolvers: [
          IconsResolver({
            prefix: false,
            extension: "jsx",
            enabledCollections: ["material-symbols", "material-symbols-light"],
            alias: {
              iconify: "material-symbols",
              'iconify-light': "material-symbols-light",
            },
          }),
        ],
      }),
      Icons({ compiler: "jsx", jsx: "react" }),
    ],
    base: command === "build" ? "https://farias-hecdin.github.io/Pagelist/" : "/",
    css: {
      modules: { generateScopedName: command === "build" ? "[hash:base64:9]" : "[local]_[hash:base64:5]" },
    },
  };
});
