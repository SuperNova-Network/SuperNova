import { defineConfig } from "vite";
import { resolve } from "node:path";

const root = resolve(__dirname, "client");
const backendTarget = "http://localhost:8080";

export default defineConfig({
  root,
  publicDir: resolve(__dirname, "public"),
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    proxy: {
      "/api": backendTarget,
      "/cdn": backendTarget,
      "/bare/": { target: backendTarget, ws: true },
      "/bare": { target: backendTarget, ws: true },
      "/wisp/": { target: backendTarget, ws: true },
      "/wisp": { target: backendTarget, ws: true },
      "/bareasmodule": backendTarget,
      "/baremux": backendTarget,
      "/libcurl": backendTarget,
      "/epoxy": backendTarget,
      "/uv": backendTarget,
      "/scram": backendTarget,
      "/sj": backendTarget,
    },
  },
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    assetsDir: "assets",
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        settings: resolve(root, "settings.html"),
        go: resolve(root, "go.html"),
        notFound: resolve(root, "404.html"),
      },
    },
  },
});
