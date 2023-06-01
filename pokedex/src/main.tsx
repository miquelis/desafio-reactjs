import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/main.css'
import { Provider } from 'react-redux'
import{ store } from './store'
import { router } from './router'
import { RouterProvider } from 'react-router-dom'
import { handleDBChange, openDB } from './services/database'
import { ToastContainer } from 'react-toastify'
openDB()
handleDBChange()
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
