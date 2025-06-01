import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import GlobalState from './context/index.jsx'

createRoot(document.getElementById('root')).render(
    <GlobalState>
        <App />
    </GlobalState>
    
)
