import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { business, faq } from "./src/lib/seo.ts";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "structured-data",
      transformIndexHtml() {
        return [business, faq].map((data) => ({
          tag: "script",
          attrs: { type: "application/ld+json" },
          children: JSON.stringify(data).replace(/</g, "\\u003c"),
          injectTo: "head",
        }));
      },
    },
  ],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
