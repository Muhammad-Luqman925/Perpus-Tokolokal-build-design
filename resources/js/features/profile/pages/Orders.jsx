import { useMemo, useState, useEffect } from "react";
import "@/assets/styles/pages/ProfileOrders.css";
import "@/assets/styles/pages/ProfileAccountLayout.css";
import { Navbar } from "@/components/navigation/Navbar";
import { TdesignNotificationFilled } from "@/components/feedback/TdesignNotificationFilled";
import ShippingDetails from "@/features/order/pages/ShippingDetails";
import RateProduct from "@/features/order/pages/RateProduct";
import { useNavigate } from "react-router-dom";
import OrderAPI from "@/core/api/OrderAPI";

const sidebarMenu = [
    {
        label: "My Account",
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                    d="M12 12C14.76 12 17 9.76 17 7C17 4.24 14.76 2 12 2C9.24 2 7 4.24 7 7C7 9.76 9.24 12 12 12Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M4 20.2C4 16.4 7.13 13.25 10.94 13.25H13.06C16.87 13.25 20 16.4 20 20.2"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
        children: ["Profile", "Address", "Bank & Cards", "Change Password"],
    },
    {
        label: "Orders",
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                    d="M4 5H20V11C18.34 11 17 12.34 17 14C17 15.66 18.34 17 20 17V19H4V17C5.66 17 7 15.66 7 14C7 12.34 5.66 11 4 11V5Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path d="M10 9H14" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M10 15H14" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: "Vouchers",
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                    d="M4 5H20L19 17H5L4 5Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path d="M9 9H15" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M12 9V15" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: "Notifications",
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                    d="M18.25 14V10.18C18.25 6.96 15.72 4.18 12.5 4C9.06 3.82 6.25 6.52 6.25 9.93V14L4.75 15.5H20.25L18.25 14Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M14.5 18C14.16 19.14 13.16 20 12 20C10.84 20 9.84 19.14 9.5 18"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        label: "Privacy",
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                    d="M7 10V8C7 5.24 9.24 3 12 3C14.76 3 17 5.24 17 8V10"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M5 10H19V17C19 19.76 16.76 22 14 22H10C7.24 22 5 19.76 5 17V10Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
];

const statuses = ["All Orders", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export const Orders = ({ className = "", ...props }) => {
    const pageClassName = ["profile-page", "profile-account-page", className].filter(Boolean).join(" ");
    const navigate = useNavigate();
    
    // 👈 State sudah benar
    const [allOrders, setAllOrders] = useState([]); 
    const [loading, setLoading] = useState(true);   
    
    const [activeStatus, setActiveStatus] = useState("Pending");
    const [invoiceOrder, setInvoiceOrder] = useState(null);
    const [shippingDetails, setShippingDetails] = useState(null);
    const [confirmReceivedOrderId, setConfirmReceivedOrderId] = useState(null);
    const [ratingOrderId, setRatingOrderId] = useState(null);
    const [activeMenu, setActiveMenu] = useState({ group: "Orders", child: null });

    // --- (Handler modal biarkan saja) ---
    const handleViewShippingDetails = (order) => { /* ... */ };
    const handleCloseShippingDetails = () => { /* ... */ };
    const handleOrderReceived = (order) => { /* ... */ };
    const handleRateProduct = (order) => { /* ... */ };

    // 🌟 PERBAIKAN: Ganti 'setOrders' jadi 'setAllOrders'
    const handleConfirmOrderReceived = (orderId) => {
        setAllOrders((prevOrders) => // 👈 Ganti jadi setAllOrders
            prevOrders.map((order) => {
                if (order.id !== orderId) {
                    return order;
                }
                
                const updatedTimeline = Array.isArray(order.shippingTimeline)
                    ? order.shippingTimeline.map((step) => ({
                        ...step,
                        state: "completed",
                    }))
                    : order.shippingTimeline;

                const deliveredAt =
                    order.deliveredAt ??
                    new Date().toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    });

                return {
                    ...order,
                    isReceived: true,
                    deliveredAt,
                    shippingTimeline: updatedTimeline,
                };
            })
        );
        setConfirmReceivedOrderId(null);
    };

    // 👈 useEffect sudah benar
    useEffect(() => {
        const loadOrders = async () => {
            setLoading(true); 
            try {
                const res = await OrderAPI.getAll();
                setAllOrders(res.data.orders || []); 
            } catch (error) {
                console.error("Gagal memuat data order:", error);
                // Cek jika error 401 (unauthenticated), mungkin token expired
                if (error.response?.status === 401) {
                    alert("Sesi Anda telah habis. Silakan login kembali.");
                    navigate("/login"); // Arahkan ke login
                } else {
                    alert("Gagal memuat data order Anda.");
                }
            } finally {
                setLoading(false); 
            }
        };

        loadOrders();
    }, [navigate]); // Tambahkan navigate sebagai dependency

    // 👈 useMemo sudah benar
    const filteredOrders = useMemo(() => {
        if (activeStatus === "All Orders") {
            return allOrders;
        }
        const backendStatus = activeStatus.toLowerCase(); 
        return allOrders.filter((order) => order.status === backendStatus);
    }, [allOrders, activeStatus]);

    // 🌟 PERBAIKAN: Ganti 'orders' jadi 'allOrders'
    const pendingConfirmationOrder = useMemo(
        () => allOrders.find((order) => order.id === confirmReceivedOrderId),
        [allOrders, confirmReceivedOrderId] // 👈 Ganti ke allOrders
    );
    const formatCurrency = (value) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);

    // 🌟 PERBAIKAN: Ganti 'orders' jadi 'allOrders'
    const ratingOrder = useMemo(
        () => allOrders.find((order) => order.id === ratingOrderId),
        [allOrders, ratingOrderId] // 👈 Ganti ke allOrders
    );
    
    // 🌟 PERBAIKAN: Ganti 'setOrders' jadi 'setAllOrders'
    const handleReviewSubmitted = (orderId, review) => {
        setAllOrders((prevOrders) => // 👈 Ganti jadi setAllOrders
            prevOrders.map((order) =>
                order.id === orderId
                    ? {
                        ...order,
                        review: {
                            rating: review.rating,
                            comment: review.comment,
                            submittedAt: new Date().toISOString(),
                        },
                        hasReview: true,
                        }
                    : order
            )
        );
    };

    return (
        <div className={pageClassName} {...props}>
            <Navbar className="profile-page__navbar profile-account-page__nav" />

            <main className="profile-page__content profile-account-layout">

                <aside className="profile-page__sidebar profile-account-sidebar">
                    <div className="profile-card">
                        <img
                            src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=200&q=80"
                            alt="Marukooo"
                            className="profile-card__avatar"
                        />
                        <div className="profile-card__name">Marukooo</div>
                        <p className="profile-card__tagline">Premium Seller</p>
                    </div>

                    <nav className="sidebar-menu profile-account-sidebar__menu">
                        {sidebarMenu.map(({ label, icon, children }) => {
                            const isActiveGroup = activeMenu.group === label;
                            return (
                                <div className="sidebar-menu__group profile-account-sidebar__group" key={label}>
                                    <button
                                        type="button"
                                        className={`sidebar-menu__item profile-account-sidebar__item ${isActiveGroup ? "is-active" : ""}`}
                                        onClick={() => {
                                            setActiveMenu({ group: label, child: null });
                                            if (label === "Logout") {
                                                navigate("/");
                                            } else if (label === "Orders") {
                                                navigate("/profile/orders");
                                            } else if (label === "Vouchers") {
                                                navigate("/profile/vouchers");
                                            } else if (label === "Notifications") {
                                                navigate("/profile/notifications");
                                            } else if (label === "Privacy") {
                                                navigate("/profile/privacy");
                                            } else if (label === "My Account") {
                                                navigate("/profile/my-account");
                                            }
                                        }}
                                    >
                                        <span className="sidebar-menu__icon">{icon}</span>
                                        <span>{label}</span>
                                    </button>
                                    {children ? (
                                        <ul className="sidebar-menu__sub">
                                            {children.map((child) => (
                                                <li key={child}>
                                                    <button
                                                        type="button"
                                                        className={
                                                            isActiveGroup && activeMenu.child === child ? "is-active" : ""
                                                        }
                                                        onClick={() => {
                                                            setActiveMenu({ group: label, child });
                                                            if (label === "My Account") {
                                                                if (child === "Profile") {
                                                                    navigate("/profile/my-account");
                                                                } else if (child === "Address") {
                                                                    navigate("/profile/my-account/address");
                                                                } else if (child === "Bank & Cards") {
                                                                    navigate("/profile/my-account/bank-cards");
                                                                } else if (child === "Change Password") {
                                                                    navigate("/profile/my-account/change-password");
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        {child}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : null}
                                </div>
                            );
                        })}
                    </nav>
                </aside>

                <section className="profile-page__orders profile-account-content">
                    {/* --- (Header kamu biarkan saja, sudah benar) --- */}
                    <header className="orders-header">
                        <div>
                            <p className="orders-header__eyebrow">Dashboard</p>
                            <h1>Orders</h1>
                        </div>
                        <span className="orders-header__summary">
                            Keep track of your latest purchases and their status.
                        </span>
                    </header>

                    {/* --- (Tabs status kamu biarkan saja, sudah benar) --- */}
                    <div className="orders-status">
                        <span className="orders-status__label">Status</span>
                        <div className="orders-status__tabs">
                            {statuses.map((status) => (
                                <button
                                    type="button"
                                    key={status}
                                    className={`orders-status__tab ${
                                        status === activeStatus ? "is-active" : ""
                                    }`}
                                    onClick={() => setActiveStatus(status)}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 👈 Ini adalah div 'orders-list' yang sudah final */}
                    <div className="orders-list">
                        {loading ? (
                            <p style={{ textAlign: "center", padding: "2rem" }}>Loading your orders...</p>
                        ) : filteredOrders.length === 0 ? (
                            <p style={{ textAlign: "center", padding: "2rem" }}>
                                No orders found for status "{activeStatus}".
                            </p>
                        ) : (
                            filteredOrders.map((order) => (
                                <article
                                    className={`order-card order-card--${order.status.toLowerCase()}`}
                                    key={order.id}
                                >
                                    <header className="order-card__header">
                                        <span className="order-card__shop">
                                            {order.seller?.store_name || 'Toko Dihapus'}
                                        </span>
                                        <div className="order-card__total">
                                            <span>Order Total</span>
                                            <strong>{formatCurrency(order.grand_total)}</strong>
                                        </div>
                                    </header>

                                    {order.items.map((item, index) => (
                                        <div className="order-card__body" key={item.id}>
                                            <img 
                                                src={item.product?.image || 'https://placehold.co/200x200/eee/ccc?text=No+Image'} 
                                                alt={item.product_name}
                                                loading="lazy" 
                                            />
                                            <div className="order-card__details">
                                                <h2>{item.product_name}</h2>
                                                <p>Variation : {item.variant || '-'}</p>
                                                <p>{item.quantity} x {formatCurrency(item.price)}</p>

                                                {index === 0 && order.status === "processing" ? (
                                                    <span className="order-card__info">
                                                        Your order is being processed.
                                                    </span>
                                                ) : index === 0 && order.status === "shipped" ? (
                                                    <span className="order-card__info order-card__info--shipped">
                                                        Shipped on {new Date(order.updated_at).toLocaleDateString("id-ID")}
                                                    </span>
                                                ) : index === 0 && order.status === "delivered" ? (
                                                    <span className="order-card__info order-card__info--delivered">
                                                        Delivered on {new Date(order.updated_at).toLocaleDateString("id-ID")}
                                                    </span>
                                                ) : null}
                                            </div>
                                        </div>
                                    ))}

                                    <footer className="order-card__footer">
                                        {order.status === "pending" ? (
                                            <>
                                                <span className="order-card__info">
                                                    Waiting for seller confirmation...
                                                </span>
                                                <button type="button" className="order-card__secondary">
                                                    Cancel Order
                                                </button>
                                            </>
                                        ) : order.status === "processing" ? (
                                            <>
                                                <button type="button" className="order-card__link" onClick={() => setInvoiceOrder(order)}>
                                                    View Invoice
                                                </button>
                                                <button type="button" className="order-card__primary">
                                                    Contact Seller
                                                </button>
                                            </>
                                        ) : order.status === "shipped" ? (
                                            <>
                                                <button type="button" className="order-card__link" onClick={() => handleViewShippingDetails(order)}>
                                                    View Shipping Details
                                                </button>
                                                <button type="button" className="order-card__primary">
                                                    Contact Seller
                                                </button>
                                            </>
                                        ) : order.status === "delivered" ? (
                                            <>
                                                <button type="button" className="order-card__link" onClick={() => handleViewShippingDetails(order)}>
                                                    View Order Details
                                                </button>
                                                <button
                                                    type="button"
                                                    className="order-card__primary"
                                                    onClick={() =>
                                                        order.isReceived
                                                            ? handleRateProduct(order)
                                                            : handleOrderReceived(order)
                                                    }
                                                >
                                                    {order.isReceived
                                                        ? (order.hasReview ? "Edit Review" : "Rate Product")
                                                        : "Order Received"}
                                                </button>
                                            </>
                                        ) : null}
                                    </footer>
                                </article>
                            ))
                        )}
                    </div> {/* 👈 AKHIR DARI DIV "orders-list" */}
                </section>
            </main>

            {invoiceOrder ? (
                <div className="invoice-modal" role="dialog" aria-modal="true">
                    <div className="invoice-modal__card">
                        <header className="invoice-modal__header">
                            <div>
                                <h2>Order #{invoiceOrder.id}</h2>
                                <p>Paid on : 15/11/2025 at 15:41</p>
                            </div>
                            <button
                                type="button"
                                className="invoice-modal__close"
                                onClick={() => setInvoiceOrder(null)}
                                aria-label="Close invoice"
                            >
                                ×
                            </button>
                        </header>

                        <section className="invoice-modal__summary">
                            <div className="invoice-modal__party">
                                <img
                                    src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=200&q=80"
                                    alt="Marukooo"
                                />
                                <span>Marukooo</span>
                            </div>
                            <svg viewBox="0 0 120 12" aria-hidden="true">
                                <path
                                    d="M2 6H118"
                                    stroke="#3BA55C"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="invoice-modal__party">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/2/29/Xiaomi_logo_%282021-%29.svg"
                                    alt="Xiaomi Indonesia"
                                />
                                <span>Xiaomi Indonesia</span>
                            </div>
                        </section>

                        <table className="invoice-modal__table">
                            <thead>
                                <tr>
                                    <th>Items</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{invoiceOrder.product}</td>
                                    <td>1</td>
                                    <td>{invoiceOrder.total}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={2}>Subtotal</td>
                                    <td>{invoiceOrder.total}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>Shipping fee</td>
                                    <td>Rp0</td>
                                </tr>
                                <tr className="invoice-modal__total">
                                    <td colSpan={2}>Total Payment</td>
                                    <td>{invoiceOrder.total}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            ) : null}

            {shippingDetails ? (
                <div className="shipping-modal" role="dialog" aria-modal="true">
                    <div className="shipping-modal__card">
                        <ShippingDetails
                            order={shippingDetails.order}
                            timeline={shippingDetails.timeline}
                            onClose={handleCloseShippingDetails}
                        />
                    </div>
                </div>
            ) : null}

            {pendingConfirmationOrder ? (
                <div className="shipping-modal" role="dialog" aria-modal="true">
                    <div className="order-received-card">
                        <button
                            type="button"
                            className="order-received-card__close"
                            onClick={() => setConfirmReceivedOrderId(null)}
                            aria-label="Close confirmation"
                        >
                            &times;
                        </button>
                        <h2>Have you received your order?</h2>
                        <p>
                            Let us know if you've received your order. Once confirmed, you'll be able to leave a review.
                        </p>
                        <div className="order-received-card__actions">
                            <button
                                type="button"
                                className="order-received-card__btn order-received-card__btn--secondary"
                                onClick={() => setConfirmReceivedOrderId(null)}
                            >
                                Not Yet
                            </button>
                            <button
                                type="button"
                                className="order-received-card__btn order-received-card__btn--primary"
                                onClick={() => handleConfirmOrderReceived(pendingConfirmationOrder.id)}
                            >
                                Yes, I've Received It
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}

            {ratingOrder ? (
                <div className="rate-product-overlay" role="dialog" aria-modal="true">
                    <RateProduct
                        order={ratingOrder}
                        onClose={() => setRatingOrderId(null)}
                        onSubmit={(review) => handleReviewSubmitted(ratingOrder.id, review)}
                    />
                </div>
            ) : null}
        </div>
    );
};

export default Orders;