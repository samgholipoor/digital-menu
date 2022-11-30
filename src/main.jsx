import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterView } from '@/router/router'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterView />
  </React.StrictMode>
)
