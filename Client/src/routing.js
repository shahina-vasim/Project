
import {
  createBrowserRouter,

} from "react-router-dom";
import App from "./components/App";
import Home from "./components/Home";
import React from "react";
import AddingCategory from "./components/AddingCategory";
import AddingProduct from "./components/AddingProduct";
import CategoryList from "./components/CategoryList";
import ProductList from "./components/ProductList";
import CatActionDelete from "./components/CatActionDelete";
import ActionEditCategory from "./components/ActionEditCategory";
import ProActionDelete from "./components/ProActionDelete";
import ActionEditProduct from "./components/ActionEditProduct";




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/adding-category",
        element: <AddingCategory />
      },
      {
        path: "/adding-product",
        element: <AddingProduct />
      },
      {
        path: "/product-list",
        element: <ProductList />
      },
      {
        path: "/category-list",
        element: <CategoryList />
      },
      {
        path: "/delete-category/:id",
        element: <CatActionDelete />
      },
      {
        path: "/edit-category/:id",
        element: <ActionEditCategory />
      },
      {
        path: "/edit-product/:id",
        element: <ActionEditProduct />
      },
      {
        path: "/delete-product/:id",
        element: <ProActionDelete />
      },

    ]
  }


]);
export default router;