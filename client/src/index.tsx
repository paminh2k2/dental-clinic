import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './app/App'
import { store } from './app/store'
import './index.css'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store} > 
    <App />
  </Provider>,
)

reportWebVitals()
