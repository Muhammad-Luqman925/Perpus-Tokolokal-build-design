import "@/assets/styles/pages/Category.css";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/navigation/Navbar";
import { ButtonProperty1Default } from "@/components/ui/ButtonProperty1Default";
import { Footer } from "@/components/layout/Footer";

/* ====================== DATA: Highlight ====================== */
const highlightProduct = {
  title: "Regal Harmony - Spring Collection 2020",
  price: "Rp 225.000",
  originalPrice: "Rp 300.000",
  description:
    "A bouquet of flowers is a thoughtful way to convey messages and create lasting impressions. Each bloom represents a meaningful gesture that goes beyond words.",
  image:
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=700&q=80",
  discountLabel: "25% OFF",
  rating: "4.8",
  sold: "250+",
  reviews: "350 reviews",
};

const highlightSliderDots = [true, false, false];

/* ====================== DATA: Seller Stories ====================== */
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
    storyDescription: "Soft pastel petals arranged to ease you into the day.",
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

/* ====================== DATA: Filter & Product Lists ====================== */
const filterChips = [
  { label: "Lynn Blue", disabled: false, isActive: true },
  { label: "Limited", disabled: false, isActive: false },
  { label: "Pink", disabled: false, isActive: false },
  { label: "Summer Collection", disabled: false, isActive: false },
  { label: "More", disabled: false, isActive: false },
];

const bestSellerProducts = [
  {
    name: "Regal Harmony Flower Bouquet Series",
    image:
      "https://images.unsplash.com/photo-1526958977630-bc61b30a2000?auto=format&fit=crop&w=640&q=80",
    rating: "4.8",
    sold: "250+",
    price: "Rp 200.000",
  },
  {
    name: "Blossom Charm Bouquet - Spring Edition",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=640&q=80",
    rating: "4.9",
    sold: "300+",
    price: "Rp 236.000",
  },
  {
    name: "Pastel Serenity Bouquet - Classic Series",
    image:
      "https://images.unsplash.com/photo-1615485290382-99368b197de2?auto=format&fit=crop&w=640&q=80",
    rating: "4.7",
    sold: "400+",
    price: "Rp 178.000",
  },
  {
    name: "Crimson Elegance Bouquet",
    image:
      "https://images.unsplash.com/photo-1511288598561-89a1df3821d0?auto=format&fit=crop&w=640&q=80",
    rating: "4.8",
    sold: "280+",
    price: "Rp 347.000",
  },
  {
    name: "Sunrise Meadow Bouquet",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=640&q=80",
    rating: "4.9",
    sold: "220+",
    price: "Rp 214.000",
  },
];

const recommendationProducts = [...bestSellerProducts];

/* ====================== ICON COMPONENTS ====================== */
const ArrowLeftIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none">
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
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none">
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

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6 6L18 18" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M6 18L18 6" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

/* ====================== MAIN COMPONENT ====================== */
const Category = ({ className = "", ...props }) => {
  const pageClassName = ["halaman-setiap-kategori", className]
    .filter(Boolean)
    .join(" ");

  const [activeStoryIndex, setActiveStoryIndex] = useState(null);
  const bestSellerCarouselRef = useRef(null);
  const recommendationCarouselRef = useRef(null);

  const isStoryOpen = activeStoryIndex !== null;
  const currentStory =
    activeStoryIndex !== null && sellerStories[activeStoryIndex]
      ? sellerStories[activeStoryIndex]
      : null;

  const displayedStories = sellerStories.slice(0, 4);

  const openStory = (index) => setActiveStoryIndex(index);
  const closeStory = () => setActiveStoryIndex(null);

  const goToPreviousStory = () => {
    if (activeStoryIndex === null) return;
    setActiveStoryIndex((prev) => (prev === 0 ? prev : prev - 1));
  };

  const goToNextStory = () => {
    if (activeStoryIndex === null) return;
    setActiveStoryIndex((prev) =>
      prev === sellerStories.length - 1 ? prev : prev + 1
    );
  };

  const scrollCarousel = (carouselRef, direction) => {
    const container = carouselRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.9 || 0;
    container.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  };

  useEffect(() => {
    if (!isStoryOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeStory();
      else if (event.key === "ArrowLeft") goToPreviousStory();
      else if (event.key === "ArrowRight") goToNextStory();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isStoryOpen, activeStoryIndex]);

  return (
    <div className={pageClassName} {...props}>
      <Navbar className="navigation-bar-instance" />

      <div className="layout-container">
        <main className="category-layout">
          {/* ====================== Highlight Section ====================== */}
          <section className="highlight-section">
            <article className="highlight-card">
              <div className="highlight-card__content">
                    <div className="highlight-card__topline">
                    <span className="highlight-card__pill">Flash Sale! ⚡</span>
                    </div>
                    <h1 className="highlight-card__label">{highlightProduct.title}</h1>
                    <p className="highlight-card__description">
                    {highlightProduct.description}
                    </p>
                    <div className="highlight-card__pricing">
                    <span className="highlight-card__price">
                        {highlightProduct.price}
                    </span>
                    <span className="highlight-card__price--was">
                        {highlightProduct.originalPrice}
                    </span>
                    </div>
                    <div className="highlight-card__actions">
                    <span className="highlight-card__discount">
                        {highlightProduct.discountLabel}
                    </span>
                    <ButtonProperty1Default
                        type="button"
                        text="View Items"
                        className="highlight-card__cta highlight-card__cta--primary"
                    />
                    </div>
                </div>

              <div className="highlight-card__media">
                <img
                  src={highlightProduct.image}
                  alt={highlightProduct.title}
                  loading="lazy"
                />
              </div>
            </article>

            <div className="highlight-slider">
              <button type="button" aria-label="Previous highlight">
                <ArrowLeftIcon aria-hidden="true" />
              </button>
              <div className="highlight-slider__dots">
                {highlightSliderDots.map((isActive, index) => (
                  <span
                    key={`highlight-dot-${index}`}
                    className={`highlight-slider__dot ${
                      isActive ? "is-active" : ""
                    }`}
                  />
                ))}
              </div>
              <button type="button" aria-label="Next highlight">
                <ArrowRightIcon aria-hidden="true" />
              </button>
            </div>
          </section>

          {/* ====================== Sidebar (Stories & Filter) ====================== */}
          <aside className="category-sidebar">
            <section className="seller-stories">
              <h2 className="seller-stories__title">Seller Stories</h2>
              <div className="seller-stories__list">
                {displayedStories.map((story, index) => (
                  <button
                    type="button"
                    key={story.handle}
                    className="seller-story"
                    onClick={() => openStory(index)}
                    aria-label={`Open story ${story.handle}`}
                  >
                    <div className="seller-story__avatar">
                      <img src={story.image} alt={story.handle} loading="lazy" />
                    </div>
                    <span className="seller-story__handle">{story.handle}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="filter-panel">
              <h2 className="filter-panel__title">Filter</h2>
              <div className="filter-panel__tags">
                {filterChips.map((tag) => (
                  <button
                    key={tag.label}
                    type="button"
                    className={`filter-chip ${tag.isActive ? "is-active" : ""} ${
                      tag.disabled ? "is-disabled" : ""
                    }`}
                    disabled={tag.disabled}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </section>
          </aside>
        </main>

        {/* ====================== Product Section: Best Seller ====================== */}
        <section className="product-section" aria-labelledby="best-sellers-heading">
          <div className="product-section__carousel">
            <button
              type="button"
              className="product-section__paddle"
              aria-label="Previous items"
              onClick={() => scrollCarousel(bestSellerCarouselRef, -1)}
            >
              <ArrowLeftIcon />
            </button>

            <div className="product-grid" ref={bestSellerCarouselRef}>
              {bestSellerProducts.map((product) => (
                <Link
                  key={product.name}
                  to="/preview-perproduk"
                  className="product-card"
                  aria-label={`View ${product.name}`}
                >
                  <div className="product-card__image">
                    <img src={product.image} alt={product.name} loading="lazy" />
                  </div>
                  <div className="product-card__body">
                    <h3 className="product-card__title">{product.name}</h3>
                    <div className="product-card__meta">
                      <span className="product-card__rating">
                        <StarIcon />
                        <span>{product.rating}</span>
                      </span>
                      <span className="product-card__dot" aria-hidden="true" />
                      <span className="product-card__sold">{product.sold} Sold</span>
                    </div>
                    <div className="product-card__price">{product.price}</div>
                  </div>
                </Link>
              ))}
            </div>

            <button
              type="button"
              className="product-section__paddle"
              aria-label="Next items"
              onClick={() => scrollCarousel(bestSellerCarouselRef, 1)}
            >
              <ArrowRightIcon />
            </button>
          </div>
        </section>

        {/* ====================== Product Section: Recommendation ====================== */}
        <section
          className="product-section"
          aria-labelledby="recommendations-heading"
        >
          <header className="product-section__header">
            <p className="product-section__eyebrow">You might also likes</p>
            <h2 id="recommendations-heading">You Might Also Likes</h2>
          </header>

          <div className="product-section__carousel">
            <button
              type="button"
              className="product-section__paddle"
              aria-label="Previous recommendations"
              onClick={() => scrollCarousel(recommendationCarouselRef, -1)}
            >
              <ArrowLeftIcon />
            </button>

            <div className="product-grid" ref={recommendationCarouselRef}>
              {recommendationProducts.map((product) => (
                <Link
                  key={product.name}
                  to="/preview-perproduk"
                  className="product-card"
                  aria-label={`View ${product.name}`}
                >
                  <div className="product-card__image">
                    <img src={product.image} alt={product.name} loading="lazy" />
                  </div>
                  <div className="product-card__body">
                    <h3 className="product-card__title">{product.name}</h3>
                    <div className="product-card__meta">
                      <span className="product-card__rating">
                        <StarIcon />
                        <span>{product.rating}</span>
                      </span>
                      <span className="product-card__dot" aria-hidden="true" />
                      <span className="product-card__sold">{product.sold} Sold</span>
                    </div>
                    <div className="product-card__price">{product.price}</div>
                  </div>
                </Link>
              ))}
            </div>

            <button
              type="button"
              className="product-section__paddle"
              aria-label="Next recommendations"
            >
              <ArrowRightIcon />
            </button>
          </div>
        </section>
      </div>

      <Footer className="page-footer" />

      {/* ====================== Seller Story Modal ====================== */}
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
              aria-label="Previous seller story"
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
                style={{ backgroundImage: `url(${currentStory.storyImage})` }}
                aria-hidden="true"
              />
              <div className="story-viewer__gradient" aria-hidden="true" />
              <div className="story-viewer__inner">
                <div className="story-viewer__progress" aria-hidden="true">
                  <span />
                </div>

                <div className="story-viewer__header">
                  <div className="story-viewer__profile">
                    <span className="story-viewer__avatar">
                      <img src={currentStory.image} alt={currentStory.handle} />
                    </span>
                    <div className="story-viewer__profile-details">
                      <span className="story-viewer__name">
                        {currentStory.displayName}
                      </span>
                      <span className="story-viewer__time">Just now</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="story-viewer__close"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeStory();
                    }}
                    aria-label="Close seller story"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className="story-viewer__content">
                  {currentStory.storyBadge && (
                    <span className="story-viewer__badge">
                      {currentStory.storyBadge}
                    </span>
                  )}
                  {currentStory.storySubtitle && (
                    <p className="story-viewer__subtitle">
                      {currentStory.storySubtitle}
                    </p>
                  )}
                  <h3 className="story-viewer__title">
                    {currentStory.storyTitle}
                  </h3>
                  {currentStory.storyDescription && (
                    <p className="story-viewer__description">
                      {currentStory.storyDescription}
                    </p>
                  )}
                  {currentStory.storyCta && (
                    <button type="button" className="story-viewer__cta">
                      {currentStory.storyCta}
                    </button>
                  )}
                </div>

                <button type="button" className="story-viewer__message">
                  {currentStory.messagePlaceholder || "Send message"}
                </button>
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
              aria-label="Next seller story"
              disabled={activeStoryIndex === sellerStories.length - 1}
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
