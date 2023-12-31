import Admin from "../components/Admin/Admin";
import Album from "../components/Client/Album/Album";
import Cart from "../components/Client/Cart/Cart";
import Contact from "../components/Client/Contact/Contact";
import Home from "../components/Client/Home/Home";
import Introduction from "../components/Client/Introduction/Introduction";
import News from "../components/Client/News/News";
import PostDetail from "../components/Client/PostDetail/PostDetail";
import Product from "../components/Client/Product/Product";
import ProductDetail from "../components/Client/Product/ProductDetail";
import ProductSearch from "../components/Client/Product/ProductSearch";
import Support from "../components/Client/Support/Support";
import SupportDetail from "../components/Client/Support/SupportDetail";
import Video from "../components/Client/Video/Video";
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
    path: "/cua-hang/tim-kiem/:id",
    component: ProductSearch,
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
  {
    path: "/album-anh/:id",
    component: Album,
    Layout: ClientLayout,
  },
  {
    path: "/video/",
    component: Video,
    Layout: ClientLayout,
  },
  {
    path: "/tin-lam-dep/",
    component: News,
    Layout: ClientLayout,
  },
  {
    path: "/tin-lam-dep/:id",
    component: PostDetail,
    Layout: ClientLayout,
  },
  {
    path: "/lien-he/",
    component: Contact,
    Layout: ClientLayout,
  },
  {
    path: "/gio-hang/",
    component: Cart,
    Layout: ClientLayout,
  },
];
