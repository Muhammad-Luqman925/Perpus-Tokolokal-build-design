import { NavLink } from "react-router-dom";

const navItems = [
    { to: "/dashboard", label: "Dashboard", end: true },
    { to: "/seller/login", label: "Seller Login" },
];

const baseLinkClass = "text-neutral-700 transition-colors hover:text-orange-500";

const Header = () => (
    <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
            <span className="text-lg font-semibold tracking-tight text-orange-500">Tokolokal</span>
            <nav className="flex items-center gap-6 text-sm font-medium">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.end}
                        className={({ isActive }) =>
                            isActive ? `${baseLinkClass} text-orange-600` : baseLinkClass
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </div>
    </header>
);

export default Header;




