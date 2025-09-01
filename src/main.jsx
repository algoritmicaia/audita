import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import IluminationForm from './components/Pages/IluminationPage/IluminationPage'
import { BrowserRouter } from "react-router";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretUp, faMinus } from '@fortawesome/free-solid-svg-icons'
import { Analytics } from "@vercel/analytics/next"

// Configurar los iconos que vamos a usar
library.add(faCaretUp, faMinus)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <IluminationForm />
    </BrowserRouter>
  </StrictMode>,
)
