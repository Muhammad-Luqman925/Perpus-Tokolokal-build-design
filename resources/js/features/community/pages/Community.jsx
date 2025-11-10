import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@/assets/styles/pages/Community.css";
import { Navbar } from "@/components/navigation/Navbar";
import { ButtonProperty1Default } from "@/components/ui/ButtonProperty1Default";

const MY_COMMUNITY = [
  {
    title: "Skincares",
    description:
      "Dive into product reviews, skincare routines, and ingredient breakdowns. From beginners to enthusiasts, this is your safe space for glowing skin and honest advice.",
    imageSrc: "whats-app-image-2025-05-09-at-11-55-36-843-b-70-b-90.png",
    buttonText: "View Community",
    route: "/community/skincares",
  },
  {
    title: "Tech & Tools",
    description:
      "Discuss gadgets, troubleshoot issues, and share app recommendations. From software quirks to hardware upgrades, tech lovers gather here.",
    imageSrc: "whats-app-image-2025-05-09-at-11-55-36-843-b-70-b-91.png",
    buttonText: "View Community",
    route: "/community/skincares",
  },
  {
    title: "Foodies & Recipes",
    description:
      "Discover local flavors, swap recipes, and showcase your culinary creations. Whether you're a home cook or a food hunter, this is where taste meets community.",
    imageSrc: "whats-app-image-2025-05-09-at-11-55-36-843-b-70-b-92.png",
    buttonText: "View Community",
    route: "/community/skincares",
  },
];

const YOU_MIGHT_LIKE = [
  {
    title: "Healthy Living",
    description:
      "Share tips, inspiration, and recipes for a healthier life. From workouts and nutrition to mental wellness.",
    imageSrc: "whats-app-image-2025-05-09-at-11-55-36-843-b-70-b-93.png",
    buttonText: "Join",
  },
  {
    title: "Photography",
    description:
      "Discover tips and tricks for capturing moments, editing photos, and sharing your work. From beginners to pros, let's grow our creativity together.",
    imageSrc: "whats-app-image-2025-05-09-at-11-55-36-843-b-70-b-94.png",
    buttonText: "Join",
  },
  {
    title: "Hobbies & Crafts",
    description:
      "A space for hobbyists to share ideas, tutorials, and their finished creations. From painting and knitting to crafting and DIY projects.",
    imageSrc: "whats-app-image-2025-05-09-at-11-55-36-843-b-70-b-95.png",
    buttonText: "Join",
  },
];

const CommunityCard = ({ title, description, imageSrc, buttonText, route, onOpen }) => (
  <article className="community-card">
    <button
      type="button"
      className="community-card__media"
      onClick={() => onOpen({ title, description, imageSrc, buttonText, route })}
    >
      <img className="community-card__image" src={imageSrc} alt={title} />
    </button>
    <div className="community-card__body">
      <h3 className="community-card__title">{title}</h3>
      <p className="community-card__description">{description}</p>
    </div>
    <ButtonProperty1Default
      text={buttonText}
      className="community-card__button"
      type="button"
      onClick={() => onOpen({ title, description, imageSrc, buttonText, route })}
    />
  </article>
);

const CommunitySection = ({ title, iconSrc, cards, onOpen }) => (
  <section className="community-section">
    <header className="community-section__header">
      <h2 className="community-section__title">{title}</h2>
    </header>
    <div className="community-section__grid">
      {cards.map((card) => (
        <CommunityCard key={card.title} {...card} onOpen={onOpen} />
      ))}
    </div>
  </section>
);

export const Community = ({ className = "" }) => {
  const [activeCard, setActiveCard] = useState(null);
  const navigate = useNavigate();
  const handleOpenCard = (card) => setActiveCard(card);
  const handleCloseModal = () => setActiveCard(null);
  const handleModalAction = () => {
    if (activeCard?.buttonText === "View Community" && activeCard.route) {
      const destination = activeCard.route;
      setActiveCard(null);
      navigate(destination);
      return;
    }
    setActiveCard(null);
  };
  const rootClassName = ["community", className].filter(Boolean).join(" ");

  return (
    <div className={rootClassName}>
      <Navbar className="community__navbar" />
      <main className="community__panel">
        <header className="community__hero">
          <h1 className="community__title">Community</h1>
          <p className="community__subtitle">
            The Community page is a vibrant space where members come together to connect, share
            ideas, and collaborate. Whether you're here to ask questions, offer support, showcase
            your work, or simply engage in meaningful conversations, this page is designed to foster
            a sense of belonging and mutual growth.
          </p>
        </header>
        <CommunitySection
          title="My Community"
          iconSrc="vector0.svg"
          cards={MY_COMMUNITY}
          onOpen={handleOpenCard}
        />
        <CommunitySection
          title="You might also like"
          iconSrc="vector1.svg"
          cards={YOU_MIGHT_LIKE}
          onOpen={handleOpenCard}
        />
      </main>

      {activeCard ? (
        <div className="community-modal" role="dialog" aria-modal="true">
          <div className="community-modal__backdrop" onClick={handleCloseModal} aria-hidden="true" />
          <div className="community-modal__card">
            <button
              type="button"
              className="community-modal__close"
              aria-label="Close community details"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <img
              className="community-modal__image"
              src={activeCard.imageSrc}
              alt={activeCard.title}
            />
            <div className="community-modal__body">
              <h3 className="community-modal__title">{activeCard.title}</h3>
              <p className="community-modal__description">{activeCard.description}</p>
            </div>
            <ButtonProperty1Default
              text={activeCard.buttonText}
              className="community-modal__button"
              type="button"
              onClick={handleModalAction}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Community;




