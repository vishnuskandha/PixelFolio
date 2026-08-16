import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  build: {
    target: "es2020",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Keep the animation engine separate so it can be cached independently
        manualChunks: {
          gsap: ["gsap", "gsap/ScrollTrigger"],
          lenis: ["lenis"],
        },
      },
    },
  },
});
