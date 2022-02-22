const { resolve } = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  build: {
    outDir: "docs",
    rollupOptions: {
      input: {
        top: resolve(__dirname, "./index.html"),
        repellingLines: resolve(__dirname, "./repelling-lines/index.html"),
        particles30000: resolve(__dirname, "./30000-particles/index.html"),
        textParticles: resolve(__dirname, "./text-particles/index.html"),
      },
    },
  },
});
