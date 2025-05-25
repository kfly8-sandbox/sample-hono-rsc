import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from "@vitejs/plugin-react"
import rsc from "@hiogawa/vite-rsc/plugin";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    rsc({
      entries: {
        browser: "./src/client.tsx",
        rsc: "./src/server.tsx",
        ssr: "@hiogawa/vite-rsc/extra/ssr",
      }
    }),
    createCloudflarePlugin(),
    tailwindcss(),
  ],
  build: {
    minify: true,
  },
})

function createCloudflarePlugin(): Plugin {
  return {
    name: "cf-build",
    enforce: "post",
    apply: () => !!process.env.CF_BUILD,
    configEnvironment() {
      return {
        keepProcessEnv: false,
        define: {
          "process.env.NO_CSP": "false",
        },
        resolve: {
          noExternal: true,
        },
      };
    },
    generateBundle() {
      if (this.environment.name === "rsc") {
        this.emitFile({
          type: "asset",
          fileName: "cloudflare.js",
          source: `\
import handler from './index.js';
export default { fetch: handler };
`,
        });
      }
      if (this.environment.name === "client") {
        // https://developers.cloudflare.com/workers/static-assets/headers/#custom-headers
        this.emitFile({
          type: "asset",
          fileName: "_headers",
          source: `\
/favicon.ico
Cache-Control: public, max-age=3600, s-maxage=3600
/assets/*
Cache-Control: public, max-age=31536000, immutable
`,
        });
      }
    }
  };
}

