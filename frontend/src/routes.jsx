import { createBrowserRouter } from "react-router-dom";
import App from "./App"
import ProductListPage from "./pages/ProductListPage/ProductListPage";
import ShopApplicationWrapper from "./pages/ShopApplicationWrapper";
import ProductDetails from "./pages/ProductDetailsPage/ProductDetails";
import { loadProductBySlug } from "./routes/products";
import AuthenticationWrapper from "./pages/AuthenticationWrapper";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
export const router = createBrowserRouter([
    {
        path:"/",
        element:<ShopApplicationWrapper/>,
        children:[
            {
                path:"/",
                element:<App/>
            },
            {
                path:"/women",
                element:<ProductListPage categoryType={'WOMEN'}/>
            },
            {
                path:"/men",
                element:<ProductListPage categoryType={'MEN'}/>
            },
            {
                path:"/kids",
                element:<ProductListPage categoryType={'KIDS'}/>
            },
            {
                path:"/product/:slug",
                element:<ProductDetails/>,
                loader: loadProductBySlug
            }            
        ]
    },
    {
        path: "/v1/",
        element: <AuthenticationWrapper/>,
        children:[
            {
                path: "login",
                element:<Login/>
            },
            {
                path: "register",
                element: <Register/>
            }
        ]
    }

])