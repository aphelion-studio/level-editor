import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/level-editor/',
  plugins: [
    svelte({
      onwarn: (warning, handler) => {
        if (warning.code === 'a11y-click-events-have-key-events') return
        handler(warning)
      },
    }),
  ],
})
