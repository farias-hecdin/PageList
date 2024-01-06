// vite.config.js
import { defineConfig } from "file:///data/data/com.termux/files/home/JSCRIPT/Pagelist/node_modules/.pnpm/vite@5.0.4/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import react from "file:///data/data/com.termux/files/home/JSCRIPT/Pagelist/node_modules/.pnpm/@vitejs+plugin-react@4.2.0_vite@5.0.4/node_modules/@vitejs/plugin-react/dist/index.mjs";
import Icons from "file:///data/data/com.termux/files/home/JSCRIPT/Pagelist/node_modules/.pnpm/unplugin-icons@0.18.0_@svgr+core@8.1.0/node_modules/unplugin-icons/dist/vite.js";
import IconsResolver from "file:///data/data/com.termux/files/home/JSCRIPT/Pagelist/node_modules/.pnpm/unplugin-icons@0.18.0_@svgr+core@8.1.0/node_modules/unplugin-icons/dist/resolver.js";
import AutoImport from "file:///data/data/com.termux/files/home/JSCRIPT/Pagelist/node_modules/.pnpm/unplugin-auto-import@0.17.1/node_modules/unplugin-auto-import/dist/vite.js";
var __vite_injected_original_dirname = "/data/data/com.termux/files/home/JSCRIPT/Pagelist";
var vite_config_default = defineConfig(({ command }) => {
  return {
    plugins: [
      react(),
      AutoImport({
        // imports: ["react"],
        // Auto-import iconify
        resolvers: [
          IconsResolver({
            prefix: false,
            extension: "jsx",
            enabledCollections: ["material-symbols", "material-symbols-light"],
            alias: {
              iconify: "material-symbols",
              "iconify-light": "material-symbols-light"
            }
          })
        ]
      }),
      Icons({ compiler: "jsx", jsx: "react" })
    ],
    resolve: {
      alias: {
        "$src": resolve(__vite_injected_original_dirname, "src")
      }
    },
    base: command === "build" ? "https://farias-hecdin.github.io/Pagelist/" : "/",
    css: {
      modules: { generateScopedName: command === "build" ? "[hash:base64:9]" : "[local]_[hash:base64:5]" }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvZGF0YS9kYXRhL2NvbS50ZXJtdXgvZmlsZXMvaG9tZS9KU0NSSVBUL1BhZ2VsaXN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvZGF0YS9kYXRhL2NvbS50ZXJtdXgvZmlsZXMvaG9tZS9KU0NSSVBUL1BhZ2VsaXN0L3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9kYXRhL2RhdGEvY29tLnRlcm11eC9maWxlcy9ob21lL0pTQ1JJUFQvUGFnZWxpc3Qvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgSWNvbnMgZnJvbSBcInVucGx1Z2luLWljb25zL3ZpdGVcIjtcbmltcG9ydCBJY29uc1Jlc29sdmVyIGZyb20gXCJ1bnBsdWdpbi1pY29ucy9yZXNvbHZlclwiO1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSBcInVucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGVcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICByZWFjdCgpLFxuICAgICAgQXV0b0ltcG9ydCh7XG4gICAgICAgIC8vIGltcG9ydHM6IFtcInJlYWN0XCJdLFxuICAgICAgICAvLyBBdXRvLWltcG9ydCBpY29uaWZ5XG4gICAgICAgIHJlc29sdmVyczogW1xuICAgICAgICAgIEljb25zUmVzb2x2ZXIoe1xuICAgICAgICAgICAgcHJlZml4OiBmYWxzZSxcbiAgICAgICAgICAgIGV4dGVuc2lvbjogXCJqc3hcIixcbiAgICAgICAgICAgIGVuYWJsZWRDb2xsZWN0aW9uczogW1wibWF0ZXJpYWwtc3ltYm9sc1wiLCBcIm1hdGVyaWFsLXN5bWJvbHMtbGlnaHRcIl0sXG4gICAgICAgICAgICBhbGlhczoge1xuICAgICAgICAgICAgICBpY29uaWZ5OiBcIm1hdGVyaWFsLXN5bWJvbHNcIixcbiAgICAgICAgICAgICAgXCJpY29uaWZ5LWxpZ2h0XCI6IFwibWF0ZXJpYWwtc3ltYm9scy1saWdodFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgXSxcbiAgICAgIH0pLFxuICAgICAgSWNvbnMoeyBjb21waWxlcjogXCJqc3hcIiwganN4OiBcInJlYWN0XCIgfSksXG4gICAgXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICBcIiRzcmNcIjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjXCIpXG4gICAgICB9XG4gICAgfSxcbiAgICBiYXNlOiBjb21tYW5kID09PSBcImJ1aWxkXCIgPyBcImh0dHBzOi8vZmFyaWFzLWhlY2Rpbi5naXRodWIuaW8vUGFnZWxpc3QvXCIgOiBcIi9cIixcbiAgICBjc3M6IHtcbiAgICAgIG1vZHVsZXM6IHsgZ2VuZXJhdGVTY29wZWROYW1lOiBjb21tYW5kID09PSBcImJ1aWxkXCIgPyBcIltoYXNoOmJhc2U2NDo5XVwiIDogXCJbbG9jYWxdX1toYXNoOmJhc2U2NDo1XVwiIH0sXG4gICAgfSxcbiAgfTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxVSxTQUFTLG9CQUFvQjtBQUNsVyxTQUFTLGVBQWU7QUFDeEIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sV0FBVztBQUNsQixPQUFPLG1CQUFtQjtBQUMxQixPQUFPLGdCQUFnQjtBQUx2QixJQUFNLG1DQUFtQztBQVF6QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLFFBQVEsTUFBTTtBQUMzQyxTQUFPO0FBQUEsSUFDTCxTQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixXQUFXO0FBQUE7QUFBQTtBQUFBLFFBR1QsV0FBVztBQUFBLFVBQ1QsY0FBYztBQUFBLFlBQ1osUUFBUTtBQUFBLFlBQ1IsV0FBVztBQUFBLFlBQ1gsb0JBQW9CLENBQUMsb0JBQW9CLHdCQUF3QjtBQUFBLFlBQ2pFLE9BQU87QUFBQSxjQUNMLFNBQVM7QUFBQSxjQUNULGlCQUFpQjtBQUFBLFlBQ25CO0FBQUEsVUFDRixDQUFDO0FBQUEsUUFDSDtBQUFBLE1BQ0YsQ0FBQztBQUFBLE1BQ0QsTUFBTSxFQUFFLFVBQVUsT0FBTyxLQUFLLFFBQVEsQ0FBQztBQUFBLElBQ3pDO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxRQUFRLFFBQVEsa0NBQVcsS0FBSztBQUFBLE1BQ2xDO0FBQUEsSUFDRjtBQUFBLElBQ0EsTUFBTSxZQUFZLFVBQVUsOENBQThDO0FBQUEsSUFDMUUsS0FBSztBQUFBLE1BQ0gsU0FBUyxFQUFFLG9CQUFvQixZQUFZLFVBQVUsb0JBQW9CLDBCQUEwQjtBQUFBLElBQ3JHO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
