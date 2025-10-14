import { createBrowserRouter } from "react-router-dom";
import App from "./App"
import ProductListPage from "./pages/ProductListPage/ProductListPage";
import ShopApplicationWrapper from "./pages/ShopApplicationWrapper";
import ProductDetails from "./pages/ProductDetailsPage/ProductDetails";
import { loadProductBySlug } from "./routes/products";
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
    }

])