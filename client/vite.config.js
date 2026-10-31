import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import githubActivityHandler from './api/github-activity.js';

function githubActivityApi() {
  return {
    name: 'github-activity-api',
    configureServer(server) {
      server.middlewares.use('/api/github-activity', (request, response, next) => {
        if (request.method !== 'GET') return next();
        return githubActivityHandler(request, response);
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  if (env.GITHUB_TOKEN) process.env.GITHUB_TOKEN = env.GITHUB_TOKEN;

  return {
    plugins: [react(), githubActivityApi()],
    server: { port: 5173 },
  };
});
