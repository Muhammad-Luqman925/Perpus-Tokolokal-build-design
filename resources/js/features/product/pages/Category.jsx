import "@/assets/styles/pages/Category.css";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/navigation/Navbar";
import { ButtonProperty1Default } from "@/components/ui/ButtonProperty1Default";
import { Footer } from "@/components/layout/Footer";
import ProductAPI from "@/core/api/product.api";

/* ====================== ICONS ====================== */
const ArrowLeftIcon = ({ className }) => (
    <svg
        className={className}
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
    >
        <path
            d="M15 4L7 12L15 20"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const ArrowRightIcon = ({ className }) => (
    <svg
        className={className}
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
    >
        <path
            d="M9 4L17 12L9 20"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const StarIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
            d="M12 3.75L14.24 9.14L20.06 9.63L15.53 13.47L16.92 19.19L12 16.07L7.08 19.19L8.47 13.47L3.94 9.63L9.76 9.14L12 3.75Z"
            strokeWidth="1.4"
            strokeLinejoin="round"
            fill="currentColor"
        />
    </svg>
);
// ✅ Tambahkan CloseIcon (belum ada sebelumnya)
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);



const highlightSliderDots = [true, false, false];

/* ====================== STATIC DATA UNTUK STORY DAN FILTER ====================== */
const sellerStories = [
    {
        handle: "@shop.id01",
        displayName: "Shop.id01",
        image: "https://i.pravatar.cc/150?img=32",
        storyImage:
            "https://images.unsplash.com/photo-1526958977630-bc61b30a2000?auto=format&fit=crop&w=900&q=80",
        storyBadge: "Fresh Picks",
        storySubtitle: "Curated bouquets for your every mood",
        storyTitle: "Lush Daybreak",
        storyDescription:
            "Soft pastel petals arranged to ease you into the day.",
        storyCta: "Shop Now",
        messagePlaceholder: "Send message",
    },
    {
        handle: "@happy_shopping",
        displayName: "Happy_Shopping",
        image: "https://i.pravatar.cc/150?img=39",
        storyImage:
            "https://images.unsplash.com/photo-1545243424-0ce743321e11?auto=format&fit=crop&w=900&q=80",
        storyBadge: "Happy Shopping",
        storySubtitle: "Vintage Flower Illustration",
        storyTitle: "Gloxinia",
        storyDescription:
            "Wrap your day in jewel-toned petals inspired by vintage prints.",
        storyCta: "15% Off",
        messagePlaceholder: "Send message",
    },
    {
        handle: "@catslove",
        displayName: "Catslove",
        image: "https://i.pravatar.cc/150?img=47",
        storyImage:
            "https://images.unsplash.com/photo-1517451330947-7809dead78d0?auto=format&fit=crop&w=900&q=80",
        storyBadge: "Limited Release",
        storySubtitle: "Muted florals for cozy corners",
        storyTitle: "Velvet Meadow",
        storyDescription:
            "Limited stems with velvety textures that warm up any nook.",
        storyCta: "View Story",
        messagePlaceholder: "Ask about this set",
    },
    {
        handle: "@the_backpack",
        displayName: "The_Backpack",
        image: "https://i.pravatar.cc/150?img=62",
        storyImage:
            "https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=900&q=80",
        storyBadge: "Summer Trails",
        storySubtitle: "Sun-washed blooms & ready-to-go kits",
        storyTitle: "Trailside Blooms",
        storyDescription:
            "Hand-tied bouquets that travel well for weekend getaways.",
        storyCta: "Explore",
        messagePlaceholder: "Send message",
    },
];

const filterChips = [
    { label: "Lynn Blue", disabled: false, isActive: true },
    { label: "Limited", disabled: false, isActive: false },
    { label: "Pink", disabled: false, isActive: false },
    { label: "Summer Collection", disabled: false, isActive: false },
    { label: "More", disabled: false, isActive: false },
];

/* ====================== KOMPONEN UTAMA ====================== */
const Category = () => {
    // State dari API
    const [flashSaleProduct, setFlashSaleProduct] = useState([]);
    const [bestSellerProducts, setBestSellerProducts] = useState([]);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [currentFlashSaleIndex, setCurrentFlashSaleIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [activeStoryIndex, setActiveStoryIndex] = useState(null);
  const isStoryOpen = activeStoryIndex !== null;
  const currentStory = isStoryOpen ? sellerStories[activeStoryIndex] : null;

  const closeStory = () => setActiveStoryIndex(null);
  const goToPreviousStory = () => setActiveStoryIndex((prev) => Math.max(prev - 1, 0));
  const goToNextStory = () => setActiveStoryIndex((prev) => Math.min(prev + 1, sellerStories.length - 1));

    // Carousel refs
    const bestSellerCarouselRef = useRef(null);
    const recommendationCarouselRef = useRef(null);

    const scrollCarousel = (carouselRef, direction) => {
        const container = carouselRef.current;
        if (!container) return;
        const scrollAmount = container.clientWidth * 0.9;
        container.scrollBy({
            left: direction * scrollAmount,
            behavior: "smooth",
        });
    };

    /* 🔹 Fetch produk dari API Laravel */
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const [flashSaleRes, allRes, featuredRes] = await Promise.all([
                    ProductAPI.getFlashSale(),
                    ProductAPI.getAll(),
                    ProductAPI.getFeatured(),
                ]);

                setFlashSaleProduct(flashSaleRes.data.data || []);
                setBestSellerProducts(allRes.data.data || []);
                setRecommendedProducts(featuredRes.data.data || []);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Gagal memuat data produk.");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const nextFlashSale = () => {
        setCurrentFlashSaleIndex((prev) =>
            prev === flashSaleProduct.length - 1 ? 0 : prev + 1
        );
        };
        const prevFlashSale = () => {
        setCurrentFlashSaleIndex((prev) =>
            prev === 0 ? flashSaleProduct.length - 1 : prev - 1
        );
        };

    if (loading) return <p className="text-center mt-10">Loading produk...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    /* ====================== RENDER ====================== */
    return (
        <div className="halaman-setiap-kategori">
            <Navbar className="navigation-bar-instance" />

            <div className="layout-container">
                <main className="category-layout">
                    {/* ✅ Flash Sale Section */}

  <section className="highlight-section">
  {/* ============================
      CARD KONTEN UTAMA
  ============================ */}
  {flashSaleProduct.length > 0 ? (
    <article className="highlight-card">
      {/* KIRI: Konten teks */}
      <div className="highlight-card__content">
        <span className="highlight-card__pill">Flash Sale! ⚡</span>

        <h1 className="highlight-card__label">
          {flashSaleProduct[currentFlashSaleIndex].name}
        </h1>
        <p className="highlight-card__description">
          {flashSaleProduct[currentFlashSaleIndex].description ||
            "Promo terbatas! Dapatkan produk terbaik hari ini."}
        </p>

        <div className="highlight-card__pricing">
          <span className="highlight-card__price">
            Rp{" "}
            {Number(
              flashSaleProduct[currentFlashSaleIndex].flash_sale_price ||
                flashSaleProduct[currentFlashSaleIndex].price
            ).toLocaleString("id-ID")}
          </span>
          {flashSaleProduct[currentFlashSaleIndex].flash_sale_price && (
            <span className="highlight-card__price--was">
              Rp{" "}
              {Number(
                flashSaleProduct[currentFlashSaleIndex].price
              ).toLocaleString("id-ID")}
            </span>
          )}
        </div>

        <div className="highlight-card__actions">
          {flashSaleProduct[currentFlashSaleIndex].flash_sale_price && (
            <span className="highlight-card__discount">Diskon Spesial!</span>
          )}
          <ButtonProperty1Default
            text="View Item"
            className="highlight-card_cta"
          />
        </div>
      </div>

      {/* KANAN: Gambar Produk */}
      <div className="highlight-card__media">
        <img
          src={
            flashSaleProduct[currentFlashSaleIndex].image ||
            "https://placehold.co/400x400"
          }
          alt={flashSaleProduct[currentFlashSaleIndex].name}
          loading="lazy"
        />
      </div>
    </article>
  ) : (
    // 🔴 Kalau tidak ada produk flash sale aktif
    <article className="highlight-card highlight-card--empty">
      <div className="highlight-card__content">
        <span className="highlight-card__pill">Flash Sale ⚡</span>
        <h1 className="highlight-card__label">Belum ada Flash Sale</h1>
        <p className="highlight-card__description">
          Nantikan promo spesial kami di waktu mendatang!
        </p>
      </div>

      <div className="highlight-card__media">
        <img
          src="https://placehold.co/400x400?text=Flash+Sale+Coming+Soon"
          alt="Flash Sale Placeholder"
          loading="lazy"
        />
      </div>
    </article>
  )}

  {/* ============================
      BAWAH: Navigasi + Dots
  ============================ */}
  <div className="highlight-slider">
    <button
      type="button"
      onClick={prevFlashSale}
      aria-label="Previous"
      disabled={flashSaleProduct.length === 0} // ✅ disable kalau kosong
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M15 4L7 12L15 20"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>

    <div className="highlight-slider__dots">
      {flashSaleProduct.length > 0 ? (
        flashSaleProduct.map((_, index) => (
          <span
            key={index}
            className={`highlight-slider__dot ${
              index === currentFlashSaleIndex ? "is-active" : ""
            }`}
            onClick={() => setCurrentFlashSaleIndex(index)}
          />
        ))
      ) : (
        // ✅ tampilkan dot placeholder biar rapi
        <span className="highlight-slider__dot is-disabled">•</span>
      )}
    </div>

    <button
      type="button"
      onClick={nextFlashSale}
      aria-label="Next"
      disabled={flashSaleProduct.length === 0} // ✅ disable kalau kosong
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 4L17 12L9 20"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  </div>
</section>
                    {/* ✅ Sidebar: Story dan Filter (versi lama static) */}
                    <aside className="category-sidebar">
                        {/* Seller Stories */}
                        <section className="seller-stories">
                            <h2 className="seller-stories__title">
                                Seller Stories
                            </h2>
                            <div className="seller-stories__list">
                                {sellerStories
                                    .slice(0, 4)
                                    .map((story, index) => (
                                        <button
                                            type="button"
                                            key={story.handle}
                                            className="seller-story"
                                            onClick={() =>
                                                setActiveStoryIndex(index)
                                            }
                                            aria-label={`Open story ${story.handle}`}
                                        >
                                            <div className="seller-story__avatar">
                                                <img
                                                    src={story.image}
                                                    alt={story.handle}
                                                    loading="lazy"
                                                />
                                            </div>
                                            <span className="seller-story__handle">
                                                {story.handle}
                                            </span>
                                        </button>
                                    ))}
                            </div>
                        </section>

                        {/* Filter Panel */}
                        <section className="filter-panel">
                            <h2 className="filter-panel__title">Filter</h2>
                            <div className="filter-panel__tags">
                                {filterChips.map((tag) => (
                                    <button
                                        key={tag.label}
                                        type="button"
                                        className={`filter-chip ${
                                            tag.isActive ? "is-active" : ""
                                        } ${tag.disabled ? "is-disabled" : ""}`}
                                        disabled={tag.disabled}
                                    >
                                        {tag.label}
                                    </button>
                                ))}
                            </div>
                        </section>
                    </aside>
                </main>

                {/* ✅ Produk Terlaris */}
                <section
                    className="product-section"
                    aria-labelledby="best-sellers-heading"
                >
                    <header className="product-section__header">
                        <h2 id="best-sellers-heading">Best Sellers</h2>
                    </header>

                    <div className="product-section__carousel">
                        <button
                            type="button"
                            className="product-section__paddle"
                            aria-label="Previous items"
                            onClick={() =>
                                scrollCarousel(bestSellerCarouselRef, -1)
                            }
                        >
                            <ArrowLeftIcon />
                        </button>

                        <div
                            className="product-grid"
                            ref={bestSellerCarouselRef}
                        >
                            {bestSellerProducts.map((product) => (
                                <Link
                                    key={product.id}
                                    to={`/preview-perproduk/${product.id}`}
                                    className="product-card"
                                >
                                    <div className="product-card__image">
                                        <img
                                            src={
                                                product.image ||
                                                "https://placehold.co/300x300"
                                            }
                                            alt={product.name}
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="product-card__body">
                                        <h3 className="product-card__title">
                                            {product.name}
                                        </h3>
                                        <div className="product-card__meta">
                                            <span className="product-card__rating">
                                                <StarIcon />
                                                <span>
                                                    {product.rating || "4.8"}
                                                </span>
                                            </span>
                                            <span
                                                className="product-card__dot"
                                                aria-hidden="true"
                                            />
                                            <span className="product-card__sold">
                                                {product.stock || 0} pcs
                                            </span>
                                        </div>
                                        <div className="product-card__price">
                                            Rp{" "}
                                            {Number(
                                                product.price
                                            ).toLocaleString("id-ID")}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <button
                            type="button"
                            className="product-section__paddle"
                            aria-label="Next items"
                            onClick={() =>
                                scrollCarousel(bestSellerCarouselRef, 1)
                            }
                        >
                            <ArrowRightIcon />
                        </button>
                    </div>
                </section>

                {/* ✅ Rekomendasi */}
                <section
                    className="product-section"
                    aria-labelledby="recommendations-heading"
                >
                    <header className="product-section__header">
                        <h2 id="recommendations-heading">
                            You Might Also Like
                        </h2>
                    </header>

                    <div className="product-section__carousel">
                        <button
                            type="button"
                            className="product-section__paddle"
                            aria-label="Previous recommendations"
                            onClick={() =>
                                scrollCarousel(recommendationCarouselRef, -1)
                            }
                        >
                            <ArrowLeftIcon />
                        </button>

                        <div
                            className="product-grid"
                            ref={recommendationCarouselRef}
                        >
                            {recommendedProducts.map((product) => (
                                <Link
                                    key={product.id}
                                    to={`/preview-perproduk/${product.id}`}
                                    className="product-card"
                                >
                                    <div className="product-card__image">
                                        <img
                                            src={
                                                product.image ||
                                                "https://placehold.co/300x300"
                                            }
                                            alt={product.name}
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="product-card__body">
                                        <h3 className="product-card__title">
                                            {product.name}
                                        </h3>
                                        <div className="product-card__meta">
                                            <span className="product-card__rating">
                                                <StarIcon />
                                                <span>
                                                    {product.rating || "4.9"}
                                                </span>
                                            </span>
                                            <span
                                                className="product-card__dot"
                                                aria-hidden="true"
                                            />
                                            <span className="product-card__sold">
                                                {product.stock || 0} pcs
                                            </span>
                                        </div>
                                        <div className="product-card__price">
                                            Rp{" "}
                                            {Number(
                                                product.price
                                            ).toLocaleString("id-ID")}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <button
                            type="button"
                            className="product-section__paddle"
                            aria-label="Next recommendations"
                            onClick={() =>
                                scrollCarousel(recommendationCarouselRef, 1)
                            }
                        >
                            <ArrowRightIcon />
                        </button>
                    </div>
                </section>
            </div>

            <Footer className="page-footer" />

            {/* ✅ Story Overlay */}
            {isStoryOpen && currentStory && (
                <div
                    className="seller-story-overlay"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${currentStory.handle} story`}
                    onClick={closeStory}
                >
                    {sellerStories.length > 1 && (
                        <button
                            type="button"
                            className="seller-story-overlay__nav seller-story-overlay__nav--prev"
                            onClick={(e) => {
                                e.stopPropagation();
                                goToPreviousStory();
                            }}
                            disabled={activeStoryIndex === 0}
                        >
                            <ArrowLeftIcon />
                        </button>
                    )}

                    <div
                        className="seller-story-overlay__content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="story-viewer">
                            <div
                                className="story-viewer__background"
                                style={{
                                    backgroundImage: `url(${currentStory.storyImage})`,
                                }}
                            />
                            <div className="story-viewer__inner">
                                <div className="story-viewer__header">
                                    <img
                                        src={currentStory.image}
                                        alt={currentStory.handle}
                                    />
                                    <span>{currentStory.displayName}</span>
                                    <button onClick={closeStory}>
                                        <CloseIcon />
                                    </button>
                                </div>
                                <h3>{currentStory.storyTitle}</h3>
                                <p>{currentStory.storyDescription}</p>
                            </div>
                        </div>
                    </div>

                    {sellerStories.length > 1 && (
                        <button
                            type="button"
                            className="seller-story-overlay__nav seller-story-overlay__nav--next"
                            onClick={(e) => {
                                e.stopPropagation();
                                goToNextStory();
                            }}
                            disabled={
                                activeStoryIndex === sellerStories.length - 1
                            }
                        >
                            <ArrowRightIcon />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export { Category };
export default Category;
