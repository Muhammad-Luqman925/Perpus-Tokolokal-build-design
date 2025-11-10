import "@/assets/styles/pages/Landing.css";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "@/core/store";

const slides = [
    {
        id: "slide-1",
        title: "Spring Harmony",
        description:
            "Bouquets curated to brighten your day with delicate pastel tones and fresh seasonal scents.",
        image:
            "https://images.unsplash.com/photo-1481162854517-d9e353af8f61?auto=format&fit=crop&w=720&q=80",
    },
    {
        id: "slide-2",
        title: "Crimson Delight",
        description:
            "Bold blooms designed to celebrate every milestone. Elegant, modern, and undeniably vibrant.",
        image:
            "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=720&q=80",
    },
    {
        id: "slide-3",
        title: "Golden Hour",
        description:
            "Warm orange and amber petals that bring the glow of sunset indoors. Perfect for cozy evenings.",
        image:
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=720&q=80",
    },
];

const getRelativeIndex = (activeIndex, index, total) => {
    const half = Math.floor(total / 2);
    let diff = index - activeIndex;

    if (diff > half) {
        diff -= total;
    } else if (diff < -half) {
        diff += total;
    }

    return diff;
};

const Landing = ({ className = "", ...props }) => {
    const rootClassName = ["landing-page-2", className].filter(Boolean).join(" ");
    const [activeIndex, setActiveIndex] = useState(1);
    const totalSlides = slides.length;
    const navigate = useNavigate();
    const { state, dispatch } = useStore();
    const isAuthenticated = Boolean(state.auth?.isAuthenticated);

    const slideOrder = useMemo(
        () =>
            slides.map((slide, index) => ({
                ...slide,
                relativeIndex: getRelativeIndex(activeIndex, index, totalSlides),
            })),
        [activeIndex, totalSlides],
    );

    const handleThumbnailClick = (targetIndex) => {
        setActiveIndex(targetIndex);
    };

    const handleAuthAction = () => {
        if (isAuthenticated) {
            dispatch({ type: "LOGOUT" });
            navigate("/login");
        } else {
            navigate("/login");
        }
    };

    const handleExploreMore = () => {
        if (!isAuthenticated) {
            navigate("/login", { state: { redirectTo: "/halaman-setiap-kategori" } });
            return;
        }
        navigate("/halaman-setiap-kategori");
    };

    const activeSlide = slides[activeIndex];
    const authButtonClassName = [
        "landing-page-2__auth-button",
        isAuthenticated ? "landing-page-2__auth-button--logout" : "landing-page-2__auth-button--login",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={rootClassName} {...props}>
            <header className="landing-page-2__header">
                <div className="landing-page-2__header-shell">
                    <div className="landing-page-2__logo-container">
                        <span className="landing-page-2__logo-trapezoid" aria-hidden="true" />
                        <Link to="/" className="landing-page-2__logo" aria-label="Tokolokal">
                            <img src="/img/logo.png" alt="Tokolokal" className="landing-page-2__logo-img" />
                        </Link>
                    </div>
                    <button type="button" className={authButtonClassName} onClick={handleAuthAction}>
                        {isAuthenticated ? "Log Out" : "Login"}
                    </button>
                </div>
            </header>

            <main className="landing-page-2__main">
                <div className="landing-page-2__category">category</div>

                <div className="landing-page-2__slider">
                    <div className="landing-page-2__slides" role="list">
                        {slideOrder.map((slide, index) => {
                            const isActive = slide.relativeIndex === 0;
                            const isAdjacent = Math.abs(slide.relativeIndex) === 1;
                            const slideClassName = [
                                "landing-page-2__slide",
                                isActive ? "is-active" : "",
                                isAdjacent ? "is-adjacent" : "",
                                `is-offset-${slide.relativeIndex}`,
                            ]
                                .filter(Boolean)
                                .join(" ");

                            return (
                                <article
                                    key={slide.id}
                                    className={slideClassName}
                                    role="listitem"
                                    aria-hidden={!isActive && !isAdjacent}
                                    onClick={() => handleThumbnailClick(index)}
                                    tabIndex={isActive ? 0 : -1}
                                >
                                    <img src={slide.image} alt="" loading="lazy" />
                                </article>
                            );
                        })}
                    </div>
                </div>

                <section className="landing-page-2__content">
                    <h1 className="landing-page-2__title">{activeSlide.title}</h1>
                    <p className="landing-page-2__description">{activeSlide.description}</p>
                    <button type="button" className="landing-page-2__cta" onClick={handleExploreMore}>
                        Explore More
                    </button>
                </section>
            </main>
        </div>
    );
};

export default Landing;




