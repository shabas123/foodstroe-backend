
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './bootstrap.min.css'
import { Provider } from 'react-redux'
import store from './store.js'
import ContextShare from './Pages/context/ContextShare.jsx'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
  <ContextShare>
      <App />
      </ContextShare>
    </BrowserRouter>
  </Provider>,
)
