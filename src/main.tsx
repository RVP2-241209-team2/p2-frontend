import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ModalProvider } from "./Modal/Modal";
import { CartItemsProvider } from './pages/main/CartItemsProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModalProvider>
      <BrowserRouter>
        <AuthProvider>
          <CartItemsProvider>
            <App />
          </CartItemsProvider>
        </AuthProvider>
      </BrowserRouter>
    </ModalProvider>
  </StrictMode>,
)
