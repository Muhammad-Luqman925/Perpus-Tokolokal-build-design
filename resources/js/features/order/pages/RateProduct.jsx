import { useMemo, useState } from "react";
import "@/assets/styles/pages/RateProduct.css";
import { Navbar } from "@/components/navigation/Navbar";

const STAR_COUNT = 5;

const StarIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 3.5L14.744 9.075L20.9 9.972L16.45 14.292L17.488 20.428L12 17.6L6.512 20.428L7.55 14.292L3.1 9.972L9.256 9.075L12 3.5Z"
      fill={filled ? "#f5a623" : "none"}
      stroke="#f5a623"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

const ConfirmDialog = ({ mode, onEdit, onSubmit, onClose }) => {
  const isSubmitted = mode === "submitted";

  return (
    <div className="rate-product__confirm">
      <div className="rate-product__confirm-card">
        <button
          type="button"
          className="rate-product__confirm-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          x
        </button>

        <div className="rate-product__confirm-icon" aria-hidden="true">
          <svg viewBox="0 0 28 28">
            <path
              d="M14 2.33333C7.55667 2.33333 2.33333 7.55667 2.33333 14C2.33333 20.4433 7.55667 25.6667 14 25.6667C20.4433 25.6667 25.6667 20.4433 25.6667 14C25.6667 7.55667 20.4433 2.33333 14 2.33333Z"
              stroke="#117E40"
              strokeWidth="1.8"
              fill="none"
            />
            <path
              d="M19.6666 10.5L12.25 17.9167L8.33331 14"
              stroke="#117E40"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        <h3>{isSubmitted ? "Review submitted" : "Ready to submit"}</h3>
        <p>
          {isSubmitted
            ? "Thanks for sharing your experience. Your review is now live."
            : "Once submitted, your review will be publicly visible. You cannot edit it later."}
        </p>

        <div className="rate-product__confirm-actions">
          {isSubmitted ? (
            <button
              type="button"
              className="rate-product__confirm-btn rate-product__confirm-btn--primary"
              onClick={onClose}
            >
              Close
            </button>
          ) : (
            <>
              <button
                type="button"
                className="rate-product__confirm-btn rate-product__confirm-btn--secondary"
                onClick={onEdit}
              >
                Edit Review
              </button>
              <button
                type="button"
                className="rate-product__confirm-btn rate-product__confirm-btn--primary"
                onClick={onSubmit}
              >
                Submit Reviews
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const RateProduct = ({ order, onClose, onSubmit, className = "" }) => {
  const review = order?.review ?? {};
  const product = order?.product ?? {};

  const initialRating =
    typeof review.rating === "number" && Number.isFinite(review.rating)
      ? review.rating
      : 0;
  const initialComment =
    typeof review.comment === "string" ? review.comment : "";

  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(initialRating);
  const [comment, setComment] = useState(initialComment);
  const [dialogMode, setDialogMode] = useState("form"); // form | confirm | submitted

  const wrapperClassName = ["rate-product", className].filter(Boolean).join(" ");
  const canSubmit = rating > 0 && comment.trim().length >= 10;

  const variation =
    order?.variation ??
    (typeof product === "object" && product !== null ? product.variation : undefined);

  const productName =
    (typeof product === "string"
      ? product
      : typeof product === "object" && product !== null
        ? product.name
        : undefined) ?? "Product name";

  const productImage =
    order?.image ??
    (typeof product === "object" && product !== null ? product.image : undefined) ??
    "product-10.png";

  const stars = useMemo(() => Array.from({ length: STAR_COUNT }), []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }
    setDialogMode("confirm");
  };

  const handleConfirmSubmit = () => {
    if (typeof onSubmit === "function") {
      onSubmit({
        rating,
        comment: comment.trim(),
      });
    }
    setDialogMode("submitted");
  };

  const handleClose = () => {
    setDialogMode("form");
    if (typeof onClose === "function") {
      onClose();
    }
  };

  return (
    <div className={wrapperClassName}>
      <Navbar className="rate-product__nav" />

      <main className="rate-product__body">
        <section className="rate-product__card" role="dialog" aria-modal="true">
          <button
            type="button"
            className="rate-product__close"
            aria-label="Close rating form"
            onClick={handleClose}
          >
            x
          </button>

          <header className="rate-product__header">
            <h1>Rate Your Purchase</h1>
            <p>Share your feedback to help others!</p>
          </header>

          <article className="rate-product__product">
            <img src={productImage} alt={productName} />

            <form className="rate-product__form" onSubmit={handleFormSubmit}>
              <h2>{productName}</h2>
              {variation ? <p className="rate-product__meta">{variation}</p> : null}

              <div className="rate-product__rating">
                <span>Your Rating</span>
                <div className="rate-product__stars" role="radiogroup" aria-label="Your rating">
                  {stars.map((_, index) => {
                    const starValue = index + 1;
                    const isFilled = starValue <= (hoverRating || rating);
                    return (
                      <button
                        key={starValue}
                        type="button"
                        className={`rate-product__star ${isFilled ? "is-filled" : ""}`}
                        onMouseEnter={() => setHoverRating(starValue)}
                        onMouseLeave={() => setHoverRating(rating)}
                        onClick={() => setRating(starValue)}
                        aria-label={`Rate ${starValue} star${starValue > 1 ? "s" : ""}`}
                        aria-pressed={rating === starValue}
                      >
                        <StarIcon filled={isFilled} />
                      </button>
                    );
                  })}
                </div>
              </div>

              <label className="rate-product__comment">
                <span>Comment</span>
                <textarea
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  placeholder="Tell us about your experience..."
                  rows={5}
                />
              </label>

              <div className="rate-product__actions">
                <button type="submit" className="rate-product__submit" disabled={!canSubmit}>
                  Submit Reviews
                </button>
              </div>
            </form>
          </article>
        </section>
      </main>

      {dialogMode !== "form" ? (
        <ConfirmDialog
          mode={dialogMode}
          onEdit={() => setDialogMode("form")}
          onSubmit={handleConfirmSubmit}
          onClose={dialogMode === "submitted" ? handleClose : () => setDialogMode("form")}
        />
      ) : null}
    </div>
  );
};

export default RateProduct;




