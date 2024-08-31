import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Weatherdetails from "./pages/Weatherdetails.jsx"
import NotFound from './pages/NotFound.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
const router =createBrowserRouter([
  {
    path:"/",
    element:<App/>
  }
  ,{
    path:"/weather/:id",
    element:<Weatherdetails/>
  }
  ,{
    path:"*",
    element:<NotFound/>
  }
])
createRoot(document.getElementById('root')).render(

  <StrictMode>
    <RouterProvider router={router} />
  
  </StrictMode>,
)
