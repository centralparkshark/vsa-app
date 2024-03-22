import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App'
import './pages/index.css'
// import { Provider } from 'react-redux'
// import rootReducer from './reducers'
// import { configureStore } from 'redux'

// const store = configureStore(rootReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      <App className='w-full'/>
    {/* </Provider> */}
  </React.StrictMode>,
)
