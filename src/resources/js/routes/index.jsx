import MainLayout from "src/resources/js/layouts/MainLayout";
import Landing from "src/resources/js/features/home/pages/Landing";
import Login from "src/resources/js/features/auth/pages/Login";
import SellerLogin from "src/resources/js/features/auth/pages/SellerLogin";
import Register from "src/resources/js/features/auth/pages/Register";
import Category from "src/resources/js/features/product/pages/Category";
import ProductPreview from "src/resources/js/features/product/pages/ProductPreview";
import Dashboard from "src/resources/js/features/product/pages/Dashboard";
import Cart from "src/resources/js/features/cart/pages/Cart";
import Checkout from "src/resources/js/features/cart/pages/Checkout";
import Contact from "src/resources/js/features/support/pages/Contact";
import Community from "src/resources/js/features/community/pages/Community";
import CommunityDetail from "src/resources/js/features/community/pages/CommunityDetail";
import CommunityNotifications from "src/resources/js/features/community/pages/CommunityNotifications";
import CommentSection from "src/resources/js/features/community/pages/CommentSection";
import Chat from "src/resources/js/features/community/pages/Chat";
import AccountProfile from "src/resources/js/features/profile/pages/AccountProfile";
import AccountAddress from "src/resources/js/features/profile/pages/AccountAddress";
import AccountBankCards from "src/resources/js/features/profile/pages/AccountBankCards";
import AccountChangePassword from "src/resources/js/features/profile/pages/AccountChangePassword";
import AccountPasswordReset from "src/resources/js/features/profile/pages/AccountPasswordReset";
import Orders from "src/resources/js/features/profile/pages/Orders";
import Vouchers from "src/resources/js/features/profile/pages/Vouchers";
import Notifications from "src/resources/js/features/profile/pages/Notifications";
import Privacy from "src/resources/js/features/profile/pages/Privacy";
import ForgotPassword from "src/resources/js/features/auth/pages/ForgotPassword";
import ForgotPasswordReset from "src/resources/js/features/auth/pages/ForgotPasswordReset";
import ExternalRedirect from "./ExternalRedirect";

const routes = [
    {
        path: "/",
        element: <Landing />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />,
    },
    {
        path: "/forgot-password/reset",
        element: <ForgotPasswordReset />,
    },
    {
        path: "/seller/login",
        element: <SellerLogin />,
    },
    {
        path: "/admin/login",
        element: <ExternalRedirect to="/admin/login" />,
    },
    {
        path: "/admin",
        element: <ExternalRedirect to="/admin" />,
    },
    {
        path: "/login-admin",
        element: <ExternalRedirect to="/login-admin" />,
    },
    {
        path: "/seller/register",
        element: <Register />,
    },
    {
        path: "/landing-page-2",
        element: <Landing />,
    },
    {
        path: "/halaman-setiap-kategori",
        element: <Category />,
    },
    {
        path: "/preview-perproduk/:id",
        element: <ProductPreview />,
    },
    {
        path: "/hubungi-kami",
        element: <Contact />,
    },
    {
        path: "/keranjang",
        element: <Cart />,
    },
    {
        path: "/chat",
        element: <Chat />,
    },
    {
        path: "/profile/my-account",
        element: <AccountProfile />,
    },
    {
        path: "/profile/orders",
        element: <Orders />,
    },
    {
        path: "/profile/my-account/address",
        element: <AccountAddress />,
    },
    {
        path: "/profile/my-account/bank-cards",
        element: <AccountBankCards />,
    },
    {
        path: "/profile/my-account/change-password",
        element: <AccountChangePassword />,
    },
    {
        path: "/profile/my-account/change-password/reset",
        element: <AccountPasswordReset />,
    },
    {
        path: "/profile/vouchers",
        element: <Vouchers />,
    },
    {
        path: "/profile/notifications",
        element: <Notifications />,
    },
    {
        path: "/profile/privacy",
        element: <Privacy />,
    },
    {
        path: "/checkout",
        element: <Checkout />,
    },
    {
        path: "/profile",
        element: <AccountProfile />,
    },
    {
        path: "/community",
        element: <Community />,
    },
    {
        path: "/community/:slug",
        element: <CommunityDetail />,
    },
    {
        path: "/community/:slug/notifications",
        element: <CommunityNotifications />,
    },
    {
        path: "/community/:slug/post/:postId",
        element: <CommentSection />,
    },
    {
        path: "/dashboard",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
        ],
    },
];

export default routes;
