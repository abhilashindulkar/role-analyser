import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/role-analyser/",
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["vite.svg", "gcp-roles.json"],
      manifest: {
        name: "Permiso - GCP IAM Explorer",
        short_name: "Permiso",
        description:
          "Explore GCP IAM roles and permissions. Compare roles, reverse-lookup permissions, and get AI recommendations.",
        theme_color: "#1e1b4b",
        background_color: "#fafafa",
        display: "standalone",
        icons: [
          {
            src: "vite.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,json}"],
        runtimeCaching: [
          {
            urlPattern: /\/gcp-roles\.json$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "role-data",
              expiration: { maxAgeSeconds: 86400 },
            },
          },
        ],
      },
    }),
  ],
});
