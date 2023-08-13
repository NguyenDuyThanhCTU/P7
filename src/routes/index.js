import Admin from "../components/Admin/Admin";
import Home from "../components/Client/Home/Home";
import Introduction from "../components/Client/Introduction/Introduction";
import Product from "../components/Client/Product/Product";
import ProductDetail from "../components/Client/Product/ProductDetail";
import Support from "../components/Client/Support/Support";
import SupportDetail from "../components/Client/Support/SupportDetail";
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
  {
    path: "/gioi-thieu/",
    component: Introduction,
    Layout: ClientLayout,
  },
  {
    path: "/dich-vu/",
    component: Support,
    Layout: ClientLayout,
  },
  {
    path: "/dich-vu/:id",
    component: SupportDetail,
    Layout: ClientLayout,
  },
];
