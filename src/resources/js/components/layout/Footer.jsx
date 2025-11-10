import { Link } from "react-router-dom";

const currentYear = new Date().getFullYear();

const footerColumns = [
    {
        title: "Kategori",
        links: ["Bunga Segar", "Bouquet Premium", "Dekorasi", "Hadiah Musiman"],
    }
];

const socialLinks = [
    {
        label: "Instagram",
        href: "https://instagram.com",
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="5" ry="5" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
            </svg>
        ),
    },
    {
        label: "Facebook",
        href: "https://facebook.com",
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
                <path
                    d="M14.5 4H12C9.23858 4 7 6.23858 7 9V11H5V14H7V20H10V14H12.5L13 11H10V9C10 8.17157 10.6716 7.5 11.5 7.5H14.5V4Z"
                    fill="currentColor"
                />
            </svg>
        ),
    },
    {
        label: "YouTube",
        href: "https://youtube.com",
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
                <rect x="3" y="6" width="18" height="12" rx="3" ry="3" fill="currentColor" />
                <path d="M11 9L15 12L11 15V9Z" fill="#fff" />
            </svg>
        ),
    },
];

export const Footer = ({ className = "" }) => (
    <footer className={`tokolokal-footer ${className}`.trim()}>
        <div className="tokolokal-footer__content">
            <div className="tokolokal-footer__brand">
                <Link to="/halaman-setiap-kategori" aria-label="Kembali ke halaman kategori Tokolokal">
                    <img src="/img/logo.png" alt="Tokolokal" className="tokolokal-footer__logo" />
                </Link>
                <p className="tokolokal-footer__address">
                    Samarinda City, East Kalimantan, Indonesia
                </p>
                <div className="tokolokal-footer__contact">
                    <a href="tel:+6281234567890">(+62) 812-3456-7890</a>
                    <a href="mailto:contact@admin-tokolokal.com">contact@admin-tokolokal.com</a>
                </div>
                <div className="tokolokal-footer__social">
                    {socialLinks.map((item) => (
                        <a key={item.label} href={item.href} aria-label={item.label}>
                            {item.icon}
                        </a>
                    ))}
                </div>
            </div>

            <div className="tokolokal-footer__columns">
                {footerColumns.map((column) => (
                    <div key={column.title} className="tokolokal-footer__column">
                        <h4>{column.title}</h4>
                        <ul>
                            {column.links.map((link) => (
                                <li key={link}>
                                    <a href="/">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>

        <div className="tokolokal-footer__bottom">
            <span>&copy; {currentYear} Tokolokal. All rights reserved.</span>
            <div className="tokolokal-footer__bottom-actions">
                <div className="tokolokal-footer__links">
                    <Link to="/hubungi-kami">Hubungi Kami</Link>
                </div>
                <button
                    type="button"
                    className="tokolokal-footer__scroll"
                    aria-label="Back to top"
                    onClick={() => {
                        if (typeof window !== "undefined") {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                    }}
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                            d="M12 5L12 19"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                        />
                        <path
                            d="M7 10L12 5L17 10"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </footer>
);

export default Footer;




