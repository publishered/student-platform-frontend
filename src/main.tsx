import { createRoot } from 'react-dom/client'
import App from "./App.tsx"
import "./reset.css"

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import "./index.css"
import AuthProvider from './providers/authProvider/AuthProvider.tsx'
import { store } from './store/index.ts'


createRoot(document.getElementById('root')!).render(
  <Provider store={store()}>
      <BrowserRouter>
         <AuthProvider>
            <App />
         </AuthProvider>
      </BrowserRouter>
  </Provider>,
)
