import Admin from "../components/Admin/Admin";
import Home from "../components/Client/Home/Home";
import Product from "../components/Client/Product/Product";
import ProductDetail from "../components/Client/ProductDetail/ProductDetail";
import Login from "../components/Login/Login";
import AdminLayout from "../Layout/AdminLayout/AdminLayout";
import ClientLayout from "../Layout/ClientLayout/ClientLayout";

export const AllRoutes = [
  {
    path: "/login",
    component: Login,
    Layout: AdminLayout,
  },
  {
    path: "/admin",
    component: Admin,
    Layout: AdminLayout,
  },
  {
    path: "/",
    component: Home,
    Layout: ClientLayout,
  },
  {
    path: "/san-pham/:id",
    component: ProductDetail,
    Layout: ClientLayout,
  },
  {
    path: "/loai-san-pham/:id",
    component: Product,
    Layout: ClientLayout,
  },
  {
    path: "/cua-hang/",
    component: Product,
    Layout: ClientLayout,
  },
];
