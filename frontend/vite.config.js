import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from "fs"

const useHttps = process.env.HTTPS === "true";

// https://vite.dev/config/
export default defineConfig({
  plugins: 
  [
    react(),
    tailwindcss()
  ],
  server: {
    host: "localhost",
    port: 5173,
    strictPort: true,
    https: useHttps
    ? {
        key: fs.readFileSync("./certs/key.pem"),
        cert: fs.readFileSync("./certs/cert.pem"),
      }
    : false
  }
})
