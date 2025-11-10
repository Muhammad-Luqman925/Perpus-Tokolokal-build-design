import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "@/assets/styles/components/navbar.css";
import CustomerProfileAPI from "@/core/api/customerProfile.api"; // ✅ Tambahan baru

const actionIcons = [
    {
        id: "cart",
        name: "Cart",
        to: "/keranjang",
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                    d="M4 5H5.42L7.28 14.16C7.52 15.39 8.6 16.25 9.85 16.25H17.65C18.9 16.25 19.99 15.39 20.22 14.16L21.35 7.74C21.58 6.47 20.63 5.32 19.34 5.08C19.17 5.05 7.68 5 7.68 5"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <circle cx="9.5" cy="20" r="1.6" />
                <circle cx="18" cy="20" r="1.6" />
            </svg>
        ),
    },
    {
        id: "chat",
        name: "Chat",
        to: "/chat",
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                    d="M7 18.5L4.5 20.5V14.5H4C2.9 14.5 2 13.6 2 12.5V5.5C2 4.4 2.9 3.5 4 3.5H20C21.1 3.5 22 4.4 22 5.5V12.5C22 13.6 21.1 14.5 20 14.5H10"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M8 9.5H16"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M8 12.5H13"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        id: "community",
        name: "Community",
        to: "/community",
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                    d="M12 12.5C14.0711 12.5 15.75 10.8211 15.75 8.75C15.75 6.67893 14.0711 5 12 5C9.92893 5 8.25 6.67893 8.25 8.75C8.25 10.8211 9.92893 12.5 12 12.5Z"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M5.5 19.5C5.5 16.7386 7.73858 14.5 10.5 14.5H13.5C16.2614 14.5 18.5 16.7386 18.5 19.5"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M6.5 8.5H5C3.89543 8.5 3 9.39543 3 10.5V12.5C3 13.6046 3.89543 14.5 5 14.5H6"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M18 8.5H19C20.1046 8.5 21 9.39543 21 10.5V12.5C21 13.6046 20.1046 14.5 19 14.5H18"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
];

const SearchIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
            d="M15.5 15.5L19 19"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <circle cx="11" cy="11" r="6" strokeWidth="1.5" />
    </svg>
);

export const Navbar = ({ className = "" }) => {
    const searchInputRef = useRef(null);
    const searchContainerRef = useRef(null);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [profile, setProfile] = useState(null); // ✅ new
    const { pathname } = useLocation();

    const isAuthOrLanding =
        pathname === "/" || pathname === "/login" || pathname === "/seller/login" || pathname === "/seller/register";
    const logoTarget = isAuthOrLanding ? "/" : "/halaman-setiap-kategori";

    // ✅ Fetch profile untuk ambil avatar dari backend
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await CustomerProfileAPI.getProfile();
                setProfile(res.data.customer);
            } catch (err) {
                console.error("Gagal memuat profil navbar:", err);
            }
        };
        fetchProfile();
    }, []);

    const focusSearchInput = () => searchInputRef.current?.focus();
    const handleSearchFocus = () => setIsSearchExpanded(true);
    const handleSearchBlur = (e) => {
        const container = searchContainerRef.current;
        if (container && e.relatedTarget && container.contains(e.relatedTarget)) return;
        setIsSearchExpanded(false);
    };

    const navClassName = ["tokolokal-navbar", className].filter(Boolean).join(" ");
    const middleClassName = ["tokolokal-navbar__middle", isSearchExpanded ? "is-search-expanded" : ""]
        .filter(Boolean)
        .join(" ");

    return (
        <nav className={navClassName}>
            <div className={middleClassName}>
                <Link to={logoTarget} className="tokolokal-navbar__brand" aria-label="Tokolokal home">
                    <img src="/img/logo.png" alt="Tokolokal" className="tokolokal-navbar__logo" />
                </Link>

                <div
                    ref={searchContainerRef}
                    className="tokolokal-navbar__search"
                    role="search"
                    onClick={focusSearchInput}
                    onFocusCapture={handleSearchFocus}
                    onBlurCapture={handleSearchBlur}
                >
                    <input
                        ref={searchInputRef}
                        type="search"
                        placeholder="Search bouquets, sellers, or categories"
                        aria-label="Search Tokolokal"
                    />
                    <button type="button" aria-label="Submit Tokolokal search" onClick={focusSearchInput}>
                        <SearchIcon />
                    </button>
                </div>

                <div className="tokolokal-navbar__actions" role="group" aria-label="Quick actions">
                    <div className="tokolokal-navbar__divider" aria-hidden="true" />

                    {actionIcons.map((action) =>
                        action.to ? (
                            <Link
                                key={action.id}
                                to={action.to}
                                className={`tokolokal-navbar__icon-button tokolokal-navbar__icon-button--${action.id}`}
                                aria-label={action.name}
                            >
                                {action.icon}
                            </Link>
                        ) : (
                            <button
                                key={action.id}
                                type="button"
                                className={`tokolokal-navbar__icon-button tokolokal-navbar__icon-button--${action.id}`}
                                aria-label={action.name}
                            >
                                {action.icon}
                            </button>
                        )
                    )}

                    {/* ✅ Foto profil dinamis dari backend */}
                    <Link to="/profile" className="tokolokal-navbar__profile" aria-label="Account settings">
                        <img
                            src={
                                profile?.avatar
                                    ? profile.avatar
                                    : "https://i.pinimg.com/736x/57/75/57/577557dcdb3324ec637b1674b1b74c05.jpg"
                            }
                            alt={profile?.name || "User avatar"}
                        />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
