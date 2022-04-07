import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
const styleLink = document.createElement('link')
styleLink.rel = 'stylesheet'
styleLink.href =
  'https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css'
document.head.appendChild(styleLink)

const rootElement = document.getElementById('root')
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
)
