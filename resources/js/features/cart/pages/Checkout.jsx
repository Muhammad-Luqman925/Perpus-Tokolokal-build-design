import { useEffect, useMemo, useState } from "react";
import "@/assets/styles/pages/Checkout.css";
import { Navbar } from "@/components/navigation/Navbar";
import { ButtonProperty1Default } from "@/components/ui/ButtonProperty1Default";
import { paymentMethods } from "@/core/constants/paymentMethods";
import CheckoutAPI from "@/core/api/checkout.api";
import CustomerAddressAPI from "@/core/api/customerAddress.api";
import CustomerPaymentAPI from "@/core/api/customerPayment.api";
import CustomerVoucherAPI from "@/core/api/customerVoucher.api";

const formatCurrency = (value) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);

const HouseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
            d="M4 10.5L12 4L20 10.5V19C20 19.8284 19.3284 20.5 18.5 20.5H5.5C4.67157 20.5 4 19.8284 4 19V10.5Z"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M9.5 20.5V13.5H14.5V20.5"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const CouponIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
            d="M4 6.75H20C20.69 6.75 21.25 7.31 21.25 8V11C20.28 11 19.5 11.78 19.5 12.75C19.5 13.72 20.28 14.5 21.25 14.5V17.5C21.25 18.19 20.69 18.75 20 18.75H4C3.31 18.75 2.75 18.19 2.75 17.5V14.5C3.72 14.5 4.5 13.72 4.5 12.75C4.5 11.78 3.72 11 2.75 11V8C2.75 7.31 3.31 6.75 4 6.75Z"
            stroke="#10131C"
            strokeWidth="1.5"
            strokeLinecap="round"
        />
        <path
            d="M14 9.5L10 15"
            stroke="#10131C"
            strokeWidth="1.5"
            strokeLinecap="round"
        />
        <circle cx="10" cy="9.5" r="1" fill="#10131C" />
        <circle cx="14" cy="15" r="1" fill="#10131C" />
    </svg>
);

const ArrowDownIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
            d="M6 9L12 15L18 9"
            stroke="#10131C"
            strokeWidth="1.5"
            strokeLinecap="round"
        />
    </svg>
);

const CheckIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle
            cx="12"
            cy="12"
            r="11"
            stroke="#3BA55C"
            strokeWidth="2"
            fill="white"
        />
        <path
            d="M8 12.5L10.5 15L16 9"
            stroke="#3BA55C"
            strokeWidth="1.8"
            strokeLinecap="round"
        />
    </svg>
);

export const Checkout = ({ className = "" }) => {
    const [orders, setOrders] = useState([]);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [methods, setPaymentMethods] = useState([]);
    const [activeShipping, setActiveShipping] = useState(null);
    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState(null);

    // Voucher states
    const [vouchers, setVouchers] = useState([]);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [discountValue, setDiscountValue] = useState(0);

    const pageClassName = ["checkout-page", className]
        .filter(Boolean)
        .join(" ");

    // 🔹 useMemo hitung total keseluruhan
    const summary = useMemo(() => {
        const subtotal = orders.reduce((sum, o) => sum + (o.subtotal || 0), 0);
        const shipping = orders.reduce(
            (sum, o) => sum + (o.selected_shipping?.price || 0),
            0
        );
        const totalBeforeDiscount = subtotal + shipping;
        const discountAmount =
            selectedVoucher?.value_type === "percent"
                ? (totalBeforeDiscount * selectedVoucher.value) / 100
                : selectedVoucher?.value || 0;

        const total = Math.max(totalBeforeDiscount - discountAmount, 0);

        return {
            subtotal,
            shipping,
            discountAmount,
            totalBeforeDiscount,
            total,
        };
    }, [orders, selectedVoucher]);

    // 🔹 Ambil data checkout + voucher + metode pembayaran
    useEffect(() => {
        const loadCheckout = async () => {
            try {
                const [resCheckout, resAddress, resPayments, resVouchers] =
                    await Promise.all([
                        CheckoutAPI.getPreview(),
                        CustomerAddressAPI.getActive(),
                        CustomerPaymentAPI.getAll(),
                        CustomerVoucherAPI.getAll(),
                    ]);

                setOrders(resCheckout.data.orders || []);
                setAddress(resAddress?.address || null);
                setPaymentMethods(resPayments?.data?.payment_methods || []);

                // 🔹 Filter hanya voucher aktif & belum digunakan
                const allVouchers =
                    resVouchers.data?.vouchers || resVouchers.vouchers || [];
                setVouchers(
                    allVouchers.filter((v) => v.is_active && !v.pivot?.is_used)
                );
            } catch (error) {
                console.error("Gagal memuat checkout data:", error);
                alert(
                    "Gagal memuat data checkout, alamat, atau metode pembayaran."
                );
            } finally {
                setLoading(false);
            }
        };
        loadCheckout();
    }, []);

    // 🔹 Gunakan voucher
    const handleUseVoucher = async (voucher) => {
        if (selectedVoucher?.id === voucher.id) {
            // Jika klik ulang, batalkan voucher
            setSelectedVoucher(null);
            return;
        }

        try {
            // Kalau belum pernah pakai, tandai di backend
            if (!voucher.pivot?.is_used) {
                await CustomerVoucherAPI.useVoucher(voucher.id);
            }

            setSelectedVoucher(voucher);
            alert(`✅ Voucher "${voucher.title}" applied!`);
        } catch (err) {
            alert(err.response?.data?.message || "❌ Failed to apply voucher.");
        }
    };

    const handleShippingSelection = async (sellerId, option) => {
        try {
            const res = await CheckoutAPI.updateShipping({
                seller_id: sellerId,
                shipping_name: option.name,
            });

            setOrders((prev) =>
                prev.map((order) =>
                    order.seller_id === sellerId
                        ? {
                              ...order,
                              selected_shipping: res.data.selected_shipping,
                              total:
                                  order.subtotal +
                                  res.data.selected_shipping.price,
                          }
                        : order
                )
            );
        } catch (error) {
            console.error("Gagal ubah ekspedisi:", error);
            alert("Gagal memperbarui ekspedisi");
        }
        setActiveShipping(null);
    };
    const handleCheckout = async () => {
    // 1. Validasi (sudah benar)
    if (!address) {
        alert("❌ Please select a delivery address first.");
        return;
    }
    if (!selectedMethod) {
        alert("❌ Please select a payment method first.");
        return;
    }
    if (orders.length === 0) {
        alert("❌ No items to checkout.");
        return;
    }

    try {
        // 2. 🔹 Siapkan data untuk backend
        const payload = {
            // Data global
            payment_method_id: selectedMethod,
            address_id: address.id,
            voucher_id: selectedVoucher?.id || null,

            // Data per-toko
            orders: orders.map((o) => ({
                product_name: o.product_name,
                seller_id: o.seller_id,
                courier_name: o.selected_shipping?.name || "Unknown",
                courier_service: o.selected_shipping?.service || "Standard",
                shipping_cost: o.selected_shipping?.price || 0,
                shipping_estimate: o.selected_shipping?.estimate || "-",

                // Data per-item
                // 🌟🌟🌟 INI DIA PERBAIKANNYA 🌟🌟🌟
                // Kita tambahkan (o.items || []) untuk mencegah error 'map' of undefined
                items: (o.items || []).map((i) => ({
                    cart_item_id: i.cart_item_id,
                    // Ini sudah benar, karena data 'preview' kita sudah kirim 'product_id'
                    product_id: i.product_id, 
                    product_name: i.product_name,
                    quantity: i.quantity,
                    price: i.price,
                    note: i.note || null,
                })),

                // Data kalkulasi (wajib ada untuk backend kamu)
                subtotal: o.subtotal, 
                
                discount: selectedVoucher
                    ? selectedVoucher.value_type === "percent"
                        ? (o.subtotal * selectedVoucher.value) / 100 
                        : selectedVoucher.value / orders.length
                    : 0,
                
                grand_total: o.total,
            })),
        };
        
        // 3. 🔹 Kirim ke backend
        const res = await CheckoutAPI.create(payload);

        // 4. 🔹 Handle respons
        if (res.data.success) {
            alert("✅ Order placed successfully!");
            window.location.href = `/profile/orders`;
        } else {
            alert(res.data.message || "❌ Failed to create order.");
        }
    } catch (error) {
        // 5. 🔹 Handle error
        console.error("Checkout failed:", error);
        alert(error.response?.data?.message || "Checkout failed due to an error.");
    }
};

    if (loading) return <p>Loading checkout...</p>;

    return (
        <div className={pageClassName}>
            <Navbar className="navigation-bar-instance" />

            <div className="checkout-layout">
                {/* ==================== */}
                {/* MAIN CHECKOUT SECTION */}
                {/* ==================== */}
                <section className="checkout-main">
                    <header className="checkout-main__header">
                        <h1>Checkout</h1>
                    </header>

                    {/* Alamat */}
                    <section className="checkout-card checkout-card--address">
                        <div className="checkout-card__row checkout-card__row--heading">
                            <div className="checkout-card__title">
                                <span className="icon-circle">
                                    <HouseIcon />
                                </span>
                                <div>
                                    <h2>Delivery Address</h2>
                                    {address ? (
                                        <p className="checkout-card__subtitle">
                                            <strong>{address.label}</strong> –{" "}
                                            {address.recipient_name}
                                        </p>
                                    ) : (
                                        <p className="checkout-card__subtitle text-gray-500">
                                            No Address
                                        </p>
                                    )}
                                </div>
                            </div>
                            <button type="button" className="checkout-edit-btn">
                                Edit
                            </button>
                        </div>

                        {address ? (
                            <div className="checkout-card__body">
                                <p className="checkout-card__description">
                                    {[
                                        address.address_line,
                                        address.city,
                                        address.state,
                                        address.country,
                                        address.postal_code,
                                    ]
                                        .filter(Boolean)
                                        .join(", ")}
                                </p>
                            </div>
                        ) : (
                            <p className="checkout-card__description text-gray-500">
                                Belum ada alamat utama.
                            </p>
                        )}
                    </section>

                    {/* ITEMS */}
                    {orders.map((order) => (
                        <section
                            key={order.seller_id}
                            className="checkout-card checkout-card--shop"
                        >
                            <header className="checkout-card__shop-header">
                                <h3>{order.store_name}</h3>
                            </header>

                            {order.items.map((item, i) => (
                                <article key={i} className="checkout-item-card">
                                    <div className="checkout-item-card__selector">
                                        {/* optional checkbox */}
                                    </div>

                                    <img
                                        src={item.image}
                                        alt={item.product}
                                        className="checkout-item-card__image"
                                        loading="lazy"
                                    />

                                    <div className="checkout-item-card__body">
                                        <header>
                                            <h3>{item.product}</h3>
                                            <div className="checkout-item-card__meta">
                                                Variant: {item.variant || "-"}
                                            </div>
                                        </header>

                                        <div className="checkout-item-card__price-row">
                                            <span className="checkout-item-card__quantity">
                                                {item.quantity} x{" "}
                                                {formatCurrency(item.price)}
                                            </span>
                                        </div>

                                        {/* 🟢 Add a Note Field */}
                                        <div className="checkout-item-card__note">
                                            <input
                                                type="text"
                                                placeholder="Add a note (optional)"
                                                onChange={(e) => {
                                                    const value =
                                                        e.target.value;
                                                    setOrders((prev) =>
                                                        prev.map((ord) =>
                                                            ord.seller_id ===
                                                            order.seller_id
                                                                ? {
                                                                      ...ord,
                                                                      items: ord.items.map(
                                                                          (
                                                                              it,
                                                                              idx
                                                                          ) =>
                                                                              idx ===
                                                                              i
                                                                                  ? {
                                                                                        ...it,
                                                                                        note: value,
                                                                                    }
                                                                                  : it
                                                                      ),
                                                                  }
                                                                : ord
                                                        )
                                                    );
                                                }}
                                                value={item.note || ""}
                                            />
                                        </div>

                                        {/* 🔹 Shipping Section */}
                                        <div className="checkout-item-card__shipping">
                                            <label>Regular</label>
                                            <button
                                                type="button"
                                                className="checkout-item-card__shipping-trigger"
                                                onClick={() =>
                                                    setActiveShipping(
                                                        activeShipping ===
                                                            order.seller_id
                                                            ? null
                                                            : order.seller_id
                                                    )
                                                }
                                            >
                                                <span>
                                                    {
                                                        order.selected_shipping
                                                            .name
                                                    }{" "}
                                                    (
                                                    {formatCurrency(
                                                        order.selected_shipping
                                                            .price
                                                    )}
                                                    )
                                                </span>
                                                <ArrowDownIcon />
                                            </button>

                                            <span className="checkout-item-card__shipping-estimate">
                                                Delivery Estimate:{" "}
                                                {
                                                    order.selected_shipping
                                                        .estimate
                                                }
                                            </span>

                                            {activeShipping ===
                                                order.seller_id && (
                                                <ul
                                                    className="checkout-item-card__shipping-menu"
                                                    role="listbox"
                                                >
                                                    {order.shipping_options.map(
                                                        (opt) => (
                                                            <li key={opt.name}>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleShippingSelection(
                                                                            order.seller_id,
                                                                            opt
                                                                        )
                                                                    }
                                                                >
                                                                    <span>
                                                                        {
                                                                            opt.name
                                                                        }{" "}
                                                                        (
                                                                        {formatCurrency(
                                                                            opt.price
                                                                        )}
                                                                        )
                                                                    </span>
                                                                    <small>
                                                                        Delivery
                                                                        Estimate:{" "}
                                                                        {
                                                                            opt.estimate
                                                                        }
                                                                    </small>
                                                                </button>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            ))}

                            <footer className="checkout-item-card__footer">
                                <p className="checkout-item-card__total">
                                    Total:{" "}
                                    <strong>
                                        {formatCurrency(order.total)}
                                    </strong>
                                </p>
                            </footer>
                        </section>
                    ))}
                </section>

                {/* ==================== */}
                {/* SIDEBAR */}
                {/* ==================== */}
                <aside className="checkout-sidebar">
                    <section className="checkout-card checkout-card--payment">
                        <h2>Payment Method</h2>

                        {methods.length > 0 ? (
                            <ul className="payment-list">
                                {methods.map((m) => (
                                    <li key={m.id}>
                                        <label
                                            className={[
                                                "payment-option",
                                                selectedMethod === m.id
                                                    ? "payment-option--active"
                                                    : "",
                                            ].join(" ")}
                                        >
                                            <img
                                                src={m.channel?.logo}
                                                alt={m.channel?.name}
                                                className="payment-option__logo"
                                            />
                                            <div className="payment-option__info">
                                                <span>{m.channel?.name}</span>
                                                <p>{m.account_number}</p>
                                            </div>
                                            <input
                                                type="radio"
                                                checked={
                                                    selectedMethod === m.id
                                                }
                                                onChange={() =>
                                                    setSelectedMethod(m.id)
                                                }
                                            />
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">
                                No payment methods available.
                            </p>
                        )}

                        {/* Voucher Section */}
                        {/* Voucher Section */}
                        <section className="checkout-voucher">
                            <h3>Available Vouchers</h3>

                            {vouchers.length === 0 ? (
                                <p className="text-gray-500">
                                    No vouchers available.
                                </p>
                            ) : (
                                vouchers.map((v) => {
                                    const isUsed = v.pivot?.is_used;
                                    const isActive =
                                        selectedVoucher?.id === v.id;

                                    return (
                                        <div
                                            key={v.id}
                                            className={`voucher-item ${
                                                isUsed
                                                    ? "used"
                                                    : isActive
                                                    ? "active"
                                                    : ""
                                            }`}
                                        >
                                            <div className="voucher-info">
                                                <strong>{v.title}</strong>
                                                <p>{v.description}</p>
                                                <small>
                                                    {v.value_type === "percent"
                                                        ? `${v.value}% off`
                                                        : `Rp ${v.value.toLocaleString(
                                                              "id-ID"
                                                          )}`}
                                                </small>
                                            </div>

                                            <button
                                                disabled={isUsed}
                                                onClick={() =>
                                                    handleUseVoucher(v)
                                                }
                                                className={`voucher-btn ${
                                                    isUsed
                                                        ? "disabled"
                                                        : isActive
                                                        ? "selected"
                                                        : ""
                                                }`}
                                            >
                                                {isUsed
                                                    ? "Used"
                                                    : isActive
                                                    ? "Applied"
                                                    : "Use"}
                                            </button>
                                        </div>
                                    );
                                })
                            )}

                            {selectedVoucher && (
                                <p className="applied-voucher">
                                    ✅ Voucher{" "}
                                    <strong>{selectedVoucher.title}</strong>{" "}
                                    applied!
                                </p>
                            )}
                        </section>

                        {/* Summary */}
                        <section className="checkout-summary">
                            <h3>Transaction Summary</h3>
                            <dl>
                                <div>
                                    <dt>Items</dt>
                                    <dd>{formatCurrency(summary.subtotal)}</dd>
                                </div>
                                <div>
                                    <dt>Shipping</dt>
                                    <dd>{formatCurrency(summary.shipping)}</dd>
                                </div>
                                {selectedVoucher && (
                                    <div>
                                        <dt>Discount</dt>
                                        <dd>
                                            -
                                            {formatCurrency(
                                                summary.discountAmount
                                            )}
                                        </dd>
                                    </div>
                                )}
                                <div className="summary-total">
                                    <dt>Total</dt>
                                    <dd>{formatCurrency(summary.total)}</dd>
                                </div>
                            </dl>

                            <ButtonProperty1Default
                                text="Buy Now"
                                className="checkout-summary__btn"
                                onClick={handleCheckout}
                            />
                        </section>
                    </section>
                </aside>
            </div>
        </div>
    );
};

export default Checkout;
