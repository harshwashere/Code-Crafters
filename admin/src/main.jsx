import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { StrictMode } from 'react'
import { AuthProvider } from './auth/auth.jsx'


createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <StrictMode>
        <App />
    </StrictMode>
  </AuthProvider>,
)
