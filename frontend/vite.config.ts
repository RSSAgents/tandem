import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const groqApiKey = env.GROQ_API_KEY;

  const groqProxy = {
    target: 'https://api.groq.com',
    changeOrigin: true,
    rewrite: () => '/openai/v1/chat/completions',
    headers: {
      Authorization: `Bearer ${groqApiKey}`,
    },
  };

  return {
    build: {
      emptyOutDir: true,
      minify: true,
      outDir: 'dist',
      sourcemap: false,
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@api': path.resolve(__dirname, 'src/api'),
        '@store': path.resolve(__dirname, 'src/store'),
        '@routes': path.resolve(__dirname, 'src/routes'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@types': path.resolve(__dirname, 'src/types'),
        '@providers': path.resolve(__dirname, 'src/providers'),
        '@i18n': path.resolve(__dirname, 'src/i18n'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@constants': path.resolve(__dirname, 'src/constants'),
        '@images': path.resolve(__dirname, 'src/images'),
      },
    },
    server: {
      proxy: {
        '/api/groq': groqProxy,
      },
    },
  };
});
