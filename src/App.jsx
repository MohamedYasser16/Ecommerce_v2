import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Component/Layout/Layout'
import Home from './Component/Home/Home'
import Cart from './Component/Cart/Cart'
import Products from './Component/Products/Products'
import Categories from './Component/Categories/Categories'
import Brands from './Component/Brands/Brands'
import Login from './Component/Login/Login'
import Register from './Component/Register/Register'
import Error from './Component/error/error'

import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css"

import WishList from './Component/WishList/WishList'

import 'flowbite';
import CategoryContextProvider from './Context/CategoryContextProvider'
import AddCartContextProvider from './Context/AddCartContext'
// import SearchSpecificCategoryContextProvider from './Context/SearchSpecificCategoryContext'
import CategoryTestContextProvider from './Context/CategoryTestProvider'


// import ProductsContextProvider from './Context/ProductsContext'







import DisplayCartHomeProvider from './Context/DisplayCartHome'
import EmptyProductsHandelMe from './Component/EmptyProductsHandelMe/EmptyProductsHandelMe'
import RelatedProductsContextProvider from './Context/RelatedProductsContext'
import GetSpecificProductByIdProvider from './Context/GetSpecificProductById'
import Forget from './Component/Forget/Forget'
import RestPasswordPart3 from './Component/ReastPasswordPart3/RestPasswordPart3'
import DarkModeContextProvider from './Context/DarkModeContext'
import OnlinePayment from './Component/OnlinePayment/OnlinePayment'
import AllOrders from './Component/AllOrders/AllOrders'

import ProtectCart from './Component/ProtectCart/ProtectCart'
import CartContextProvider from './Context/CartContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'



function App() {

  const queryClient = new QueryClient()

  let routes = createBrowserRouter([{
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/cart", element: <ProtectCart> <Cart /> </ProtectCart> },
      { path: "/onlinePayment/:cartId", element: <OnlinePayment /> },
      { path: "/allorders", element: <AllOrders /> },
      { path: "/products", element: <EmptyProductsHandelMe /> },
      { path: "/products/:id", element: <Products /> },
      { path: "/categories", element: <Categories /> },
      { path: "/brands", element: <Brands /> },
      { path: "/login", element: <Login /> },
      { path: "/forget", element: <Forget /> },
      { path: "/ResetPass", element: <RestPasswordPart3 /> },
      { path: "/register", element: <Register /> },
      { path: "/wishList", element: <WishList /> },
      // { path: "/logout"  ,  element: <Logout/>} ,
      { path: "*", element: <Error /> },

    ]
  }])

  return <>
  <QueryClientProvider client={queryClient}>
    <DarkModeContextProvider>
      <GetSpecificProductByIdProvider>
        <RelatedProductsContextProvider>
          <CartContextProvider>
            <DisplayCartHomeProvider>
              <CategoryContextProvider>
                <AddCartContextProvider>
                  <CategoryTestContextProvider>
                    {/* <ProductsContextProvider> */}

                      <RouterProvider router={routes} ></RouterProvider>
                      <ReactQueryDevtools initialIsOpen={false} />
                    {/* </ProductsContextProvider> */}
                  </CategoryTestContextProvider>
                </AddCartContextProvider>
              </CategoryContextProvider>
            </DisplayCartHomeProvider>
          </CartContextProvider>
        </RelatedProductsContextProvider>
      </GetSpecificProductByIdProvider>
    </DarkModeContextProvider>
</QueryClientProvider>
  </>




}

export default App
