import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: "/julgranstugan/",
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'src/assets/img/*', dest: 'assets/media' },
      ],
    }),
  ],
  build: {
    target: 'esnext', 
  },
});
