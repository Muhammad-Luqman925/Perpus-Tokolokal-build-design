import MainLayout from "@/layouts/MainLayout";
import Landing from "@/features/home/pages/Landing";
import Login from "@/features/auth/pages/Login";
import SellerLogin from "@/features/auth/pages/SellerLogin";
import Register from "@/features/auth/pages/Register";
import Category from "@/features/product/pages/Category";
import ProductPreview from "@/features/product/pages/ProductPreview";
import Dashboard from "@/features/product/pages/Dashboard";
import Cart from "@/features/cart/pages/Cart";
import Checkout from "@/features/cart/pages/Checkout";
import Contact from "@/features/support/pages/Contact";
import Community from "@/features/community/pages/Community";
import CommunityDetail from "@/features/community/pages/CommunityDetail";
import CommunityNotifications from "@/features/community/pages/CommunityNotifications";
import CommentSection from "@/features/community/pages/CommentSection";
import Chat from "@/features/community/pages/Chat";
import AccountProfile from "@/features/profile/pages/AccountProfile";
import AccountAddress from "@/features/profile/pages/AccountAddress";
import AccountBankCards from "@/features/profile/pages/AccountBankCards";
import AccountChangePassword from "@/features/profile/pages/AccountChangePassword";
import AccountPasswordReset from "@/features/profile/pages/AccountPasswordReset";
import Orders from "@/features/profile/pages/Orders";
import Vouchers from "@/features/profile/pages/Vouchers";
import Notifications from "@/features/profile/pages/Notifications";
import Privacy from "@/features/profile/pages/Privacy";
import ForgotPassword from "@/features/auth/pages/ForgotPassword";
import ForgotPasswordReset from "@/features/auth/pages/ForgotPasswordReset";

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






