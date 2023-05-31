import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { Provider } from 'react-redux'
import{ store } from './store'
import { router } from './router'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
