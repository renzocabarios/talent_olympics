import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [nodePolyfills(), react()],
  resolve: {
    alias: {
      // Example aliases
      "@": "/src", // Maps '@' to '/src' directory
      "@/components": "/src/components", // Maps '@/components' to '/src/components'
      "@/lib": "/src/lib", // Maps '@/lib' to '/src/lib'
      // Add more aliases as needed
    },
  },
});
