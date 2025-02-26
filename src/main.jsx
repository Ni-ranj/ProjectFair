import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import ContextAPI from './Context/ContextAPI.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextAPI>
      <BrowserRouter>

        <App />

      </BrowserRouter>
    </ContextAPI>


  </StrictMode>,
)
