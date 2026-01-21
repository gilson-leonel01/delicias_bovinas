import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="362315148020-n6job7dkr64lajfl55rl7muagup2ngn5.apps.googleusercontent.com">
    <StrictMode>
      <App />
    </StrictMode>,
  </GoogleOAuthProvider>
)
