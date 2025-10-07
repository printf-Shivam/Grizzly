import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import {router} from "./routes.jsx"
import { Provider } from 'react-redux';
import store from './store/store.js'
import ShopApplicationWrapper from './pages/ShopApplicationWrapper.jsx'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <RouterProvider router={router}>

        <ShopApplicationWrapper />

    </RouterProvider>
    </Provider>
)
