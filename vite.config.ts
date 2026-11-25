import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type PluginOption } from 'vite'

export default defineConfig(async () => {
  const plugins: PluginOption[] = [react(), tailwindcss()]

  // Cloudflare workerd breaks Vercel builds — skip it when VERCEL=1.
  if (!process.env.VERCEL) {
    const { cloudflare } = await import('@cloudflare/vite-plugin')
    plugins.push(cloudflare())
  }

  return {
    plugins,
    server: { port: 5305, strictPort: false },
  }
})
