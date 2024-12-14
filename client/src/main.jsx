import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './routes/route.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>  {/* if this is comment or remove then render only 1 time, now render 2 time for dev purpose */}
    <RouterProvider router={router} />
  </StrictMode>,
)
