import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App'
import './pages/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App className='w-full'/>
  </React.StrictMode>,
)
