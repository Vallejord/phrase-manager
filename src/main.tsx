import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PhrasesProvider } from './context/PhrasesContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PhrasesProvider>
      <App />
    </PhrasesProvider>
  </StrictMode>,
)
