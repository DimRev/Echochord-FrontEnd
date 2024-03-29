import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/style/main.scss'

declare global {
  interface Window {}
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
