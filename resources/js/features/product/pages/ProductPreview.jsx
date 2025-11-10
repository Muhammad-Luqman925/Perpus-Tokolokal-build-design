import { useEffect, useState } from "react";
import "@/assets/styles/pages/ProductPreview.css";
import { Navbar } from "@/components/navigation/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import ProductAPI from "@/core/api/product.api";
import CartAPI from "@/core/api/cart.api"; 
const StarIcon = () => (
    <svg viewBox="0 0 20 20" aria-hidden="true">
        <path
            d="M10 2.5L11.96 7.36L17.25 7.82L13.12 11.23L14.39 16.43L10 13.64L5.61 16.43L6.88 11.23L2.75 7.82L8.04 7.36L10 2.5Z"
            fill="#F5A623"
        />
    </svg>
);

const MinusIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="5" y="11" width="14" height="2" rx="1" fill="#3D4A5C" />
    </svg>
);

const PlusIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
            d="M12 5v14M5 12h14"
            stroke="#3D4A5C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const formatCurrency = (value) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value || 0);

export const ProductPreview = ({ className = "" }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔹 Fallback default (jika API belum support)
    const fallback = {
        name: "Regal Harmony - Spring Collection 2020-XYZABC",
        price: 225000,
        rating: 5,
        reviews: 127,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
        variants: ["Maroon", "White", "Soft Pink"],
        gallery: [
            {
                src: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=600&q=80",
                alt: "Bouquet of red and white flowers",
            },
            {
                src: "https://images.unsplash.com/photo-1511288598561-89a1df3821d0?auto=format&fit=crop&w=600&q=80",
                alt: "Bouquet of red roses tied with ribbon",
            },
            {
                src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80",
                alt: "Pink flower bouquet close-up",
            },
            {
                src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
                alt: "Mixed flower bouquet on display",
            },
        ],
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await ProductAPI.getById(id);
                const data = res.data.data ?? res.data;

                // adaptasi struktur agar mirip fallback
                const adapted = {
                    name: data.name ?? fallback.name,
                    price: data.price ?? fallback.price,
                    rating: data.rating ?? 5,
                    reviews: data.reviews ?? 0,
                    description: data.description ?? fallback.description,
                    variants:
                        Array.isArray(data.variants)
                            ? data.variants
                            : fallback.variants,
                    gallery:
                        Array.isArray(data.gallery)
                            ? data.gallery
                            : [
                                  {
                                      src: data.image ?? fallback.gallery[0].src,
                                      alt: data.name ?? fallback.gallery[0].alt,
                                  },
                              ],
                };

                setProduct(adapted);
                setSelectedVariant(adapted.variants[0]);
                setActiveImage(adapted.gallery[0]);
            } catch (error) {
                console.error("Gagal memuat produk:", error);
                setProduct(fallback); // gunakan fallback jika gagal fetch
                setSelectedVariant(fallback.variants[0]);
                setActiveImage(fallback.gallery[0]);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <p className="loading-state">Memuat produk...</p>;
    if (!product) return <p className="error-state">Produk tidak ditemukan.</p>;
    const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("⚠️ Kamu belum login. Silakan login dulu sebelum menambah produk.");
        return;
    }

    try {
        const payload = {
            product_id: Number(id),
            quantity: Number(quantity),
            note: "",
            variant: selectedVariant || "-",
        };

        const res = await CartAPI.add(payload);

        console.log("📦 Response dari backend:", res);

        // ✅ Periksa status atau isi pesan dari backend
        if (res.status === 200 || res.status === 201 || res.data?.message?.includes("berhasil")) {
            alert("✅ Produk berhasil ditambahkan ke keranjang!");
        } else {
            alert("⚠️ Gagal menambahkan produk ke keranjang.");
            console.warn("Response tidak sesuai:", res);
        }
    } catch (err) {
        console.error("❌ Gagal menambah produk:", err.response?.data || err.message);
        alert("❌ Gagal menambah produk. Pastikan kamu sudah login.");
    }
};


    const pageClassName = ["preview-perproduk", className]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={pageClassName}>
            <Navbar className="navigation-bar-instance" />

            <main className="preview-card">
                <section className="preview-info">
                    <header className="preview-header">
                        <h1>{product.name}</h1>
                        <div className="preview-price">
                            <span>{formatCurrency(product.price)}</span>
                            <div className="preview-rating">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <StarIcon key={index} />
                                ))}
                                <strong>{product.rating} stars</strong>
                                <span>- {product.reviews} Reviews</span>
                            </div>
                        </div>
                        <p className="preview-description">
                            {product.description}{" "}
                            <button type="button">See More</button>
                        </p>
                    </header>

                    <section className="preview-variants">
                        <h2>Variant</h2>
                        <div className="variant-list">
                            {product.variants.map((variant) => (
                                <button
                                    key={variant}
                                    type="button"
                                    className={[
                                        "variant-pill",
                                        variant === selectedVariant
                                            ? "variant-pill--active"
                                            : "",
                                    ]
                                        .filter(Boolean)
                                        .join(" ")}
                                    onClick={() => setSelectedVariant(variant)}
                                    aria-pressed={variant === selectedVariant}
                                >
                                    {variant}
                                </button>
                            ))}
                        </div>
                    </section>

                    <section className="preview-quantity">
                        <h2>Quantity</h2>
                        <div className="quantity-control">
                            <button
                                type="button"
                                onClick={() =>
                                    setQuantity((value) => Math.max(1, value - 1))
                                }
                                aria-label="Kurangi jumlah"
                            >
                                <MinusIcon />
                            </button>
                            <span aria-live="polite">{quantity}</span>
                            <button
                                type="button"
                                onClick={() => setQuantity((value) => value + 1)}
                                aria-label="Tambah jumlah"
                            >
                                <PlusIcon />
                            </button>
                        </div>
                    </section>

                    <section className="preview-actions">
                            <button
                                type="button"
                                className="preview-actions__secondary"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </button>
                        <button
                            type="button"
                            className="preview-actions__primary"
                            onClick={() => navigate("/checkout")}
                        >
                            Buy Now
                        </button>
                    </section>
                </section>

                <aside className="preview-gallery">
                    <div className="preview-gallery__main">
                        <img
                            src={activeImage.src}
                            alt={activeImage.alt}
                            loading="lazy"
                        />
                    </div>
                    <div className="preview-gallery__thumbs">
                        {product.gallery.map((image) => (
                            <button
                                key={image.src}
                                type="button"
                                onClick={() => setActiveImage(image)}
                                className={[
                                    "preview-gallery__thumb",
                                    activeImage.src === image.src
                                        ? "preview-gallery__thumb--active"
                                        : "",
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
                                aria-label={`Lihat ${image.alt}`}
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    loading="lazy"
                                />
                            </button>
                        ))}
                    </div>
                </aside>
            </main>
        </div>
    );
};

export default ProductPreview;
