import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TokenContextProvider from './Context/LocalContext.jsx'


createRoot(document.getElementById('root')).render(


<TokenContextProvider>
<App />
</TokenContextProvider>
  
)
