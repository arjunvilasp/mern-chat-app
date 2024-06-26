import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [react()],
  server: {
    proxy:{
      '/api':{
        target : 'https://mern-chat-app-backend-p93r.onrender.com'
      }
    }
  },
});
