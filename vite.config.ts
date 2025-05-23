import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react"
import rsc from "@hiogawa/vite-rsc/plugin";

export default defineConfig({
  clearScreen: false,
  plugins: [
    react(),
    rsc({
      entries: {
        browser: "./src/client.tsx",
        rsc: "./src/index.tsx",
        ssr: "@hiogawa/vite-rsc/extra/ssr",
      },
    }),
  ],
  build: {
    minify: true,
  },
})


