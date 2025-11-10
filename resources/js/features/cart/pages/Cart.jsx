import "@/assets/styles/pages/Cart.css";
import { Navbar } from "@/components/navigation/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CartAPI from "@/core/api/cart.api";

const formatCurrency = (value) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);

const CheckIcon = ({ checked }) =>
    checked ? (
        <span className="cart-checkbox cart-checkbox--active">
            <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M6.3 10.2 3.9 7.8 3 8.7l3.3 3.3 6.1-6.1-.9-.9-5.2 5.2z" fill="#fff" />
            </svg>
        </span>
    ) : (
        <span className="cart-checkbox">
            <svg viewBox="0 0 18 18" aria-hidden="true">
                <rect
                    x="1"
                    y="1"
                    width="16"
                    height="16"
                    rx="5"
                    ry="5"
                    stroke="#c4ccd8"
                    strokeWidth="2"
                    fill="none"
                />
            </svg>
        </span>
    );

const QuantityButton = ({ label, onClick }) => (
    <button
        type="button"
        className="cart-qty__button"
        aria-label={label}
        onClick={onClick}
    >
        {label === "-" ? (
            <svg viewBox="0 0 20 20" aria-hidden="true">
                <rect x="4" y="9" width="12" height="2" rx="1" fill="#3D4A5C" />
            </svg>
        ) : (
            <svg viewBox="0 0 20 20" aria-hidden="true">
                <path
                    d="M10 4v12M4 10h12"
                    stroke="#3D4A5C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        )}
    </button>
);

const RemoveButton = ({ onClick }) => (
    <button
        type="button"
        className="cart-remove"
        aria-label="Hapus produk"
        onClick={onClick}
    >
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                d="M10 2.5h4M4 7h16M18 7l-.8 12.4c-.1 1.1-1 1.6-2 1.6H8.8c-1 0-1.9-.5-2-1.6L6 7m4 3.5v6m4-6v6"
                stroke="#3D4A5C"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    </button>
);

export const Cart = ({ className = "" }) => {
    const navigate = useNavigate();
    const pageClassName = ["Cart-page", className].filter(Boolean).join(" ");
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCart = async () => {
            try {
                const res = await CartAPI.getAll();
                const items = res.data.map((item) => ({
                    id: item.id,
                    name: item.product.name,
                    details: item.note || "",
                    price: item.product.price,
                    quantity: item.quantity,
                    selected: !!item.is_selected,
                    image: item.product.image,
                    variant: item.variant || "-", // ✅ tampilkan varian yang dipilih
                }));
                setCartItems(items);
            } catch (error) {
                console.error("Gagal memuat keranjang:", error);
            } finally {
                setLoading(false);
            }
        };
        loadCart();
    }, []);

    // ✅ fungsi toggle select
    const toggleSelect = async (id) => {
        const updatedItems = cartItems.map((item) =>
            item.id === id ? { ...item, selected: !item.selected } : item
        );
        setCartItems(updatedItems);

        const current = updatedItems.find((item) => item.id === id);
        try {
            await CartAPI.update(id, { is_selected: current.selected });
        } catch (err) {
            console.error("Gagal update is_selected:", err);
        }
    };

    // ✅ select all
    const toggleSelectAll = () => {
        const allSelected =
            cartItems.length > 0 &&
            cartItems.every((item) => item.selected === true);
        const updatedItems = cartItems.map((item) => ({
            ...item,
            selected: !allSelected,
        }));
        setCartItems(updatedItems);
    };

    const handleQuantityChange = async (id, delta) => {
        const updatedItems = cartItems.map((item) =>
            item.id === id
                ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                : item
        );
        setCartItems(updatedItems);

        const updatedItem = updatedItems.find((item) => item.id === id);
        await CartAPI.update(id, { quantity: updatedItem.quantity });
    };

    const handleRemove = async (id) => {
        await CartAPI.remove(id);
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    const selectedCount = cartItems.filter((i) => i.selected).length;
    const totalPrice = cartItems
        .filter((i) => i.selected)
        .reduce((acc, i) => acc + i.price * i.quantity, 0);

    if (loading)
        return (
            <p style={{ textAlign: "center", marginTop: "2rem" }}>
                Loading cart...
            </p>
        );

    return (
        <div className={pageClassName}>
            <Navbar className="navigation-bar-instance" />

            <main className="Cart-shell">
                <section className="Cart-list">
                    <header className="Cart-list__header">
                        <h1>My Cart</h1>
                        <button
                            type="button"
                            className="Cart-select-all"
                            onClick={toggleSelectAll}
                        >
                            <CheckIcon
                                checked={
                                    selectedCount === cartItems.length &&
                                    cartItems.length > 0
                                }
                            />
                            <span className="Cart-select-all__text">
                                <strong>Select All</strong>
                                <span>({selectedCount})</span>
                            </span>
                        </button>
                    </header>

                    <div className="Cart-items">
                        {cartItems.length === 0 ? (
                            <p style={{ textAlign: "center" }}>
                                Keranjang kamu kosong.
                            </p>
                        ) : (
                            cartItems.map((item) => (
                                <article
                                    key={item.id}
                                    className={[
                                        "Cart-item",
                                        item.selected
                                            ? "Cart-item--active"
                                            : "",
                                    ]
                                        .filter(Boolean)
                                        .join(" ")}
                                >
                                    <button
                                        type="button"
                                        className="cart-checkbox-wrapper"
                                        onClick={() => toggleSelect(item.id)}
                                    >
                                        <CheckIcon checked={item.selected} />
                                    </button>

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        loading="lazy"
                                    />

                                    <div className="Cart-item__body">
                                        <h2>{item.name}</h2>
                                        {item.variant && (
                                            <p className="Cart-item__variant">
                                                Variant: {item.variant}
                                            </p>
                                        )}
                                        <span className="Cart-item__price">
                                            {formatCurrency(item.price)}
                                        </span>
                                        <div className="Cart-item__actions">
                                            <div className="cart-qty">
                                                <QuantityButton
                                                    label="-"
                                                    onClick={() =>
                                                        handleQuantityChange(
                                                            item.id,
                                                            -1
                                                        )
                                                    }
                                                />
                                                <span>{item.quantity}</span>
                                                <QuantityButton
                                                    label="+"
                                                    onClick={() =>
                                                        handleQuantityChange(
                                                            item.id,
                                                            1
                                                        )
                                                    }
                                                />
                                            </div>
                                            <RemoveButton
                                                onClick={() =>
                                                    handleRemove(item.id)
                                                }
                                            />
                                        </div>
                                    </div>
                                </article>
                            ))
                        )}
                    </div>
                </section>

                <aside className="Cart-summary">
                    <header>
                        <h2>Order Summary</h2>
                    </header>
                    <div className="Cart-summary__row">
                        <span>Total</span>
                        <p>{formatCurrency(totalPrice)}</p>
                    </div>
                    <button
                        type="button"
                        className="buy-btn"
                        onClick={() => navigate("/checkout")}
                        disabled={selectedCount === 0}
                    >
                        Buy Now ({selectedCount})
                    </button>
                </aside>
            </main>
        </div>
    );
};

export default Cart;
