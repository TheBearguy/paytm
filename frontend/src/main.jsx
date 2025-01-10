import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom"
const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <h1>HomePage</h1>
            },
            {
                path: "dashboard",
                element: <h1>Dashboard</h1>
            },
            {
                path: "transfer",
                element: <h1>Transfer</h1>
            },
            {
                path: "profile" ,
                element: <h1>Profile</h1>
            }
        ]
    }
])

// const router = createBrowserRouter(
//     <Routes>
//         <Route path='/'  element={<App/> } />
//         <Route path='' element={<h1>Hello there</h1>}  />
//         <Route path='/dashboard' element={<h1>Dashboard</h1>}  />
//         {/* and so on */}

//     </Routes>
// )


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
