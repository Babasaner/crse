import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/global.css'
import './styles/pages.css'
import './styles/prototype.css'
import App from './app/App'
import { AppProviders } from './app/providers'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders><App /></AppProviders>
  </StrictMode>,
)
