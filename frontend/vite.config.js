import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [react()],
  server: {
    proxy:{
      '/api':{
        target : 'https://mern-chat-app-backend-3yig.onrender.com'
      }
    }
  },
});
