import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import SearchBooks from './pages/SearchBooks'
import SavedBooks from './pages/SavedBooks'

// Define the router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2' role="alert">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <SearchBooks />
      }, 
      {
        path: '/saved',
        element: <SavedBooks />
      }
    ]
  }
])

// Render the application with the defined routes
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
