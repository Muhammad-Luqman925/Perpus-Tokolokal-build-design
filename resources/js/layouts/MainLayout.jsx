import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";

const MainLayout = () => (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
        <Header />
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-10">
            <Outlet />
        </main>
    </div>
);

export default MainLayout;




