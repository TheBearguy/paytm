import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom"
import Dashboard from './pages/Dashboard.jsx'
import Signup from './pages/Signup.jsx'
import Signin from './pages/Signin.jsx'
import SendMoney from './pages/SendMoney.jsx'
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
                element: <Dashboard />
            },
            {
                path: "send",
                element: <SendMoney/>
            },
            {
                path: "signup" ,
                element: <Signup />
            },
            {
                path: "signin",
                element: <Signin />
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
