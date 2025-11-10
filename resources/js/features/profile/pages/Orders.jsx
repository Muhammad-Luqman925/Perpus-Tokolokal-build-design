import { useMemo, useState } from "react";
import "@/assets/styles/pages/ProfileOrders.css";
import "@/assets/styles/pages/ProfileAccountLayout.css";
import { Navbar } from "@/components/navigation/Navbar";
import { TdesignNotificationFilled } from "@/components/feedback/TdesignNotificationFilled";
import ShippingDetails from "@/features/order/pages/ShippingDetails";
import RateProduct from "@/features/order/pages/RateProduct";
import { useNavigate } from "react-router-dom";

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

const orderData = [
    {
        id: "12CBSD3",
        status: "Pending",
        shop: "Xiaomi Official Store",
        product: "Official Xiaomi Compact Hair Dryer H101 | Ringkas dan bisa dilipat",
        variation: "Variation : White",
        total: "Rp249.000",
        image:
            "https://images.unsplash.com/photo-1600180758890-6d8df9643a8f?auto=format&fit=crop&w=200&q=80",
    },
    {
        id: "56HGR72",
        status: "Processing",
        shop: "Xiaomi Official Store",
        product: "Official Xiaomi Compact Hair Dryer H101 | Ringkas dan bisa dilipat",
        variation: "Variation : White",
        total: "Rp249.000",
        image:
            "https://images.unsplash.com/photo-1600180758890-6d8df9643a8f?auto=format&fit=crop&w=200&q=80",
    },
    {
        id: "78SHIP42",
        status: "Shipped",
        shop: "Xiaomi Official Store",
        product: "Official Xiaomi Compact Hair Dryer H101 | Ringkas dan bisa dilipat",
        variation: "Variation : White",
        total: "Rp249.000",
        shippedAt: "Aug 23 2024, 11:22",
        image:
            "https://images.unsplash.com/photo-1600180758890-6d8df9643a8f?auto=format&fit=crop&w=200&q=80",
        shippingTimeline: [
            {
                id: "order-confirmed",
                title: "Order Confirmed",
                description: "Your order has been confirmed and is being prepared",
                timestamp: "20 Sep 2025, 14:30",
                icon: "check",
                state: "completed",
            },
            {
                id: "package-prepared",
                title: "Package Prepared",
                description: "Your package is being prepared for shipment",
                timestamp: "20 Sep 2025, 16:45",
                icon: "box",
                state: "completed",
            },
            {
                id: "in-transit",
                title: "In Transit",
                description: "Your package is on the way to your location",
                timestamp: "21 Sep 2025, 08:20",
                icon: "truck",
                state: "upcoming",
            },
            {
                id: "out-for-delivery",
                title: "Out for Delivery",
                description: "Your package is out for delivery",
                timestamp: "Estimated : 22 September 2025, 10:00 - 18:00",
                icon: "pin",
                state: "upcoming",
            },
        ],
    },
    {
        id: "90DLV12",
        status: "Delivered",
        shop: "Xiaomi Official Store",
        product: "Official Xiaomi Compact Hair Dryer H101 | Ringkas dan bisa dilipat",
        variation: "Variation : White",
        total: "Rp249.000",
        deliveredAt: "Sep 25 2025, 12:10",
        isReceived: false,
        image:
            "https://images.unsplash.com/photo-1600180758890-6d8df9643a8f?auto=format&fit=crop&w=200&q=80",
        shippingTimeline: [
            {
                id: "order-confirmed",
                title: "Order Confirmed",
                description: "Your order has been confirmed and is being prepared",
                timestamp: "20 Sep 2025, 14:30",
                icon: "check",
                state: "completed",
            },
            {
                id: "package-prepared",
                title: "Package Prepared",
                description: "Your package is being prepared for shipment",
                timestamp: "20 Sep 2025, 16:45",
                icon: "box",
                state: "completed",
            },
            {
                id: "in-transit",
                title: "In Transit",
                description: "Your package is on the way to your location",
                timestamp: "21 Sep 2025, 08:20",
                icon: "truck",
                state: "completed",
            },
            {
                id: "delivered",
                title: "Out for Delivery",
                description: "Your package out for delivery",
                timestamp: "22 Sep 2025, 12:10",
                icon: "pin",
                state: "completed",
            },
        ],
    },
];

export const Orders = ({ className = "", ...props }) => {
    const pageClassName = ["profile-page", "profile-account-page", className].filter(Boolean).join(" ");
    const navigate = useNavigate();
    const [orders, setOrders] = useState(orderData);
    const [activeStatus, setActiveStatus] = useState("Pending");
    const [invoiceOrder, setInvoiceOrder] = useState(null);
    const [shippingDetails, setShippingDetails] = useState(null);
    const [confirmReceivedOrderId, setConfirmReceivedOrderId] = useState(null);
    const [ratingOrderId, setRatingOrderId] = useState(null);
    const [activeMenu, setActiveMenu] = useState({ group: "Orders", child: null });

    const handleViewShippingDetails = (order) => {
        setShippingDetails({
            order,
            timeline: order.shippingTimeline ?? [],
        });
    };

    const handleCloseShippingDetails = () => {
        setShippingDetails(null);
    };

    const handleOrderReceived = (order) => {
        setConfirmReceivedOrderId(order.id);
    };

    const handleRateProduct = (order) => {
        setRatingOrderId(order.id);
    };

    const handleConfirmOrderReceived = (orderId) => {
        setOrders((prevOrders) =>
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

    const filteredOrders = useMemo(() => {
        if (activeStatus === "All Orders") {
            return orders;
        }
        return orders.filter((order) => order.status === activeStatus);
    }, [orders, activeStatus]);

    const pendingConfirmationOrder = useMemo(
        () => orders.find((order) => order.id === confirmReceivedOrderId),
        [orders, confirmReceivedOrderId]
    );

    const ratingOrder = useMemo(
        () => orders.find((order) => order.id === ratingOrderId),
        [orders, ratingOrderId]
    );

    const handleReviewSubmitted = (orderId, review) => {
        setOrders((prevOrders) =>
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
                    <header className="orders-header">
                        <div>
                            <p className="orders-header__eyebrow">Dashboard</p>
                            <h1>Orders</h1>
                        </div>
                        <span className="orders-header__summary">
                            Keep track of your latest purchases and their status.
                        </span>
                    </header>

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

                    <div className="orders-list">
                        {filteredOrders.map((order) => (
                            <article
                                className={`order-card order-card--${order.status.toLowerCase()}`}
                                key={order.id}
                            >
                                <header className="order-card__header">
                                    <span className="order-card__shop">{order.shop}</span>
                                    <div className="order-card__total">
                                        <span>Order Total</span>
                                        <strong>{order.total}</strong>
                                    </div>
                                </header>

                                <div className="order-card__body">
                                    <img src={order.image} alt={order.product} />
                                    <div className="order-card__details">
                                        <h2>{order.product}</h2>
                                        <p>{order.variation}</p>
                                        {order.status === "Processing" ? (
                                            <span className="order-card__info">
                                                Your order is being processed.
                                            </span>
                                        ) : order.status === "Shipped" && order.shippedAt ? (
                                            <span className="order-card__info order-card__info--shipped">
                                                Shipped on {order.shippedAt}
                                            </span>
                                        ) : order.status === "Delivered" && order.deliveredAt ? (
                                            <span className="order-card__info order-card__info--delivered">
                                                Delivered on {order.deliveredAt}
                                            </span>
                                        ) : null}
                                    </div>
                                </div>

                                <footer className="order-card__footer">
                                    {order.status === "Pending" ? (
                                        <>
                                            <button type="button" className="order-card__secondary">
                                                Cancel Order
                                            </button>
                                            <button type="button" className="order-card__primary">
                                                Pay Now
                                            </button>
                                        </>
                                    ) : order.status === "Processing" ? (
                                        <>
                                            <button
                                                type="button"
                                                className="order-card__link"
                                                onClick={() => setInvoiceOrder(order)}
                                            >
                                                View Invoice
                                            </button>
                                            <button type="button" className="order-card__primary">
                                                Contact Seller
                                            </button>
                                        </>
                                    ) : order.status === "Shipped" ? (
                                        <>
                                            <button
                                                type="button"
                                                className="order-card__link"
                                                onClick={() => handleViewShippingDetails(order)}
                                            >
                                                View Shipping Details
                                            </button>
                                            <button type="button" className="order-card__primary">
                                                Contact Seller
                                            </button>
                                        </>
                                    ) : order.status === "Delivered" ? (
                                        <>
                                            <button
                                                type="button"
                                                className="order-card__link"
                                                onClick={() => handleViewShippingDetails(order)}
                                            >
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
                                                    ? order.hasReview
                                                        ? "Edit Review"
                                                        : "Rate Product"
                                                    : "Order Received"}
                                            </button>
                                        </>
                                    ) : null}
                                </footer>
                            </article>
                        ))}
                    </div>
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

















