import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { PostProvider } from "./contexts/PostContext.tsx";
import { AuthProvider } from './contexts/AuthContext.tsx'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
     <AuthProvider>
        <PostProvider>
          <App />
        </PostProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);