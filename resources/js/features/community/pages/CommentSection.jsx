import { useNavigate } from "react-router-dom";
import "@/assets/styles/pages/CommentSection.css";
import { Navbar } from "@/components/navigation/Navbar";
const IconArrowLeft = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15 4L7 12L15 20"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


const IconComment = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6 18L4 21V6C4 4.34315 5.34315 3 7 3H17C18.6569 3 20 4.34315 20 6V14C20 15.6569 18.6569 17 17 17H6Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconHeart = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 20C12 20 4 14.5 4 9C4 6.23858 6.23858 4 9 4C10.6569 4 12.1569 4.84286 13 6.1C13.8431 4.84286 15.3431 4 17 4C19.7614 4 22 6.23858 22 9C22 14.5 14 20 14 20L12 21.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MEDIA = {
  carousel: [
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=700&q=80",
  ],
  author: "https://images.unsplash.com/photo-1542834369-f10ebf06d3cb?auto=format&fit=crop&w=120&q=80",
  comments: [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80",
    "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=120&q=80",
    "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=120&q=80",
  ],
};

const IconSend = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 20L21 12L3 4L3 10L15 12L3 14L3 20Z"
      fill="currentColor"
    />
  </svg>
);

const CommentEntry = ({ avatar, name, username, time, body, likes, replies, children }) => (
  <article className="comment-entry">
    <header className="comment-entry__header">
      <img className="comment-entry__avatar" src={avatar} alt={name} />
      <div className="comment-entry__meta">
        <div className="comment-entry__name">{name}</div>
        <div className="comment-entry__tagline">
          <span className="comment-entry__username">{username}</span>
          <span className="comment-entry__separator">&bull;</span>
          <span className="comment-entry__time">{time}</span>
        </div>
      </div>
    </header>
    <p className="comment-entry__body">{body}</p>
    <footer className="comment-entry__footer">
      <span className="comment-entry__stat">
        <IconHeart aria-hidden="true" />
        {likes}
      </span>
      {typeof replies === "number" ? (
        <span className="comment-entry__stat">
          <IconComment aria-hidden="true" />
          {replies}
        </span>
      ) : null}
      <button type="button" className="comment-entry__reply">
        Reply
      </button>
    </footer>
    {children}
  </article>
);

export const CommentSection = ({ className = "" }) => {
  const navigate = useNavigate();
  const rootClassName = ["comment-section", className].filter(Boolean).join(" ");

  return (
    <div className={rootClassName}>
      <div className="comment-section__wrapper">
        <Navbar className="comment-section__navbar" />

        <div className="comment-section__shell">
        <main className="comment-section__panel">
          <header className="comment-section__heading">
            <button
              type="button"
              className="comment-section__back"
              aria-label="Return to community discussions"
              onClick={() => navigate(-1)}
            >
              <IconArrowLeft aria-hidden="true" />
            </button>
            <h1>Return to discussions</h1>
          </header>

          <section className="comment-section__content">
            <aside className="comment-section__media">
              <button type="button" className="comment-section__carousel-btn comment-section__carousel-btn--prev" aria-label="Previous">
                <IconArrowLeft aria-hidden="true" />
              </button>

              <figure className="comment-section__media-frame">
                <img src={MEDIA.carousel[0]} alt="Product highlight" />
                <figcaption>
                  <div className="comment-section__dots">
                    <span className="is-active" />
                    <span />
                  </div>
                </figcaption>
              </figure>

              <button type="button" className="comment-section__carousel-btn comment-section__carousel-btn--next" aria-label="Next">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path
                    d="M9 4L17 12L9 20"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="comment-section__author">
                <img src={MEDIA.author} alt="Reii profile" />
                <div>
                  <div className="comment-section__author-name">Reii_12.</div>
                  <div className="comment-section__author-meta">
                    <span>@Reiinyourheart</span>
                    <span>&bull;</span>
                    <span>11h</span>
                  </div>
                </div>
              </div>
            </aside>

            <article className="comment-section__discussion">
              <div className="comment-section__post">
                <p>
                  Ini udah beli yang ketiga kalinya dan bener bener sebagus itu buat kulitku yang
                  oily, tapi inget harus reaply ya guys jangan sampe lupa.
                </p>
              <div className="comment-section__post-stats">
                  <span>
                    <IconHeart />
                    122
                  </span>
                  <span>
                    <IconComment />
                    15
                  </span>
                <button type="button" aria-label="Share">
                </button>
              </div>
                <div className="comment-section__composer">
                  <input type="text" placeholder="Add your comment . . ." />
                  <button type="button" aria-label="Send comment">
                    <IconSend aria-hidden="true" />
                  </button>
                </div>
              </div>

              <section className="comment-section__list">
                <h2>Comments</h2>

                <CommentEntry
                  avatar={MEDIA.comments[0]}
                  name="Sunny"
                  username="@Reiinyourheart"
                  time="11h"
                  body="Wah, aku jadi penasaran banget sama produknya! Kulitku kombinasi, kadang oily di T-zone. Ada yang udah coba di tipe kulit kayak gitu?"
                  likes={12}
                  replies={0}
                >
                  <div className="comment-entry__replies">
                    <CommentEntry
                      avatar={MEDIA.comments[1]}
                      name="Reii_12."
                      username="@Reiinyourheart"
                      time="2h"
                      body="Wah, aku jadi penasaran banget sama produknya! Kulitku kombinasi, kadang oily di T-zone. Ada yang udah coba di tipe kulit kayak gitu?"
                      likes={2}
                    />
                  </div>
                </CommentEntry>

                <CommentEntry
                  avatar={MEDIA.comments[2]}
                  name="Sunny"
                  username="@Reiinyourheart"
                  time="11h"
                  body="Aku sempat coba juga, tapi di aku malah agak patchy setelah beberapa jam. Mungkin karena belum reapply ya. Ada tips biar lebih tahan lama?"
                  likes={0}
                  replies={0}
                />

                <CommentEntry
                  avatar={MEDIA.comments[3]}
                  name="Sunny"
                  username="@Reiinyourheart"
                  time="11h"
                  body="Reapply tuh emang suka kelewat sih. Aku biasanya set timer biar nggak lupa. Ada yang punya cara lain biar tetap konsisten?"
                  likes={15}
                  replies={0}
                />
              </section>
            </article>
          </section>
        </main>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;




