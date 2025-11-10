import { useNavigate, useParams } from "react-router-dom";
import "@/assets/styles/pages/CommunityNotifications.css";
import { Navbar } from "@/components/navigation/Navbar";
import { ButtonProperty1Default } from "@/components/ui/ButtonProperty1Default";
import { HeroiconsUserGroupSolid } from "@/components/icons/HeroiconsUserGroupSolid";
import { TdesignNotificationFilled } from "@/components/feedback/TdesignNotificationFilled";
import { IonSearch } from "@/components/icons/IonSearch";

const SIDEBAR_MENU = [
  { label: "1,311 members", icon: HeroiconsUserGroupSolid, active: false },
  { label: "Notifications", icon: TdesignNotificationFilled, active: true },
  { label: "Search", icon: IonSearch, active: false },
];

const NOTIFICATIONS = [
  {
    title: "Today",
    items: [
      {
        avatar: "image2.png",
        summary: (
          <>
            <strong>Reii_12.</strong> and 5 others liked your comment.
          </>
        ),
        time: "1h",
        body:
          '"Reapply tuh emang suka kelewat sih 😅. Aku biasanya set timer biar nggak lupa. Ada yang punya cara lain biar tetap konsisten?"',
      },
      {
        avatar: "image3.png",
        summary: (
          <>
            <strong>Reii_12.</strong> liked your post.
          </>
        ),
        time: "20h",
      },
    ],
  },
  {
    title: "Yesterday",
    items: [
      {
        avatar: "image1.png",
        summary: (
          <>
            <strong>Reii_12.</strong> replied your comment.
          </>
        ),
        time: "1d",
        body:
          '"Wah, aku jadi penasaran banget sama produknya! Kulitku kombinasi, kadang oily di T-zone. Ada yang udah coba di tipe kulit kayak gitu?"',
      },
    ],
  },
  {
    title: "Last 7 days",
    items: [
      {
        avatar: "image2.png",
        summary: (
          <>
            <strong>Reii_12.</strong> and 10 others liked your comment.
          </>
        ),
        time: "3w",
        body:
          '"Reapply tuh emang suka kelewat sih 😅. Aku biasanya set timer biar nggak lupa. Ada yang punya cara lain biar tetap konsisten?"',
      },
    ],
  },
];

const NotificationItem = ({ avatar, summary, time, body }) => (
  <article className="community-notif__item">
    <img src={avatar} alt="Notification avatar" className="community-notif__item-avatar" />
    <div className="community-notif__item-body">
      <div className="community-notif__item-header">
        <p>{summary}</p>
        <span>{time}</span>
      </div>
      {body ? <p className="community-notif__item-text">{body}</p> : null}
    </div>
  </article>
);

export const CommunityNotifications = ({ className = "" }) => {
  const navigate = useNavigate();
  const { slug = "skincares" } = useParams();
  const wrapperClassName = ["page-each-community-notifications", className].filter(Boolean).join(" ");

  return (
    <div className={wrapperClassName}>
      <div className="community-notif__wrapper">
        <Navbar className="community-notif__navbar" />

        <div className="community-notif__panel">
          <aside className="community-notif__sidebar">
            <div className="community-notif__section-title">
              <button
                type="button"
                aria-label="Back to community"
                onClick={() => navigate(`/community/${slug}`)}
              >
                <img src="vector0.svg" alt="" aria-hidden="true" />
              </button>
              <h1>Skincares</h1>
            </div>

            <ul className="community-notif__menu">
              {SIDEBAR_MENU.map(({ label, icon: Icon, active }) => (
                <li key={label} className={active ? "is-active" : ""}>
                  <Icon />
                  <span>{label}</span>
                </li>
              ))}
            </ul>

            <div className="community-notif__composer">
              <div className="community-notif__profile">
                <img src="fp0.png" alt="Marukoo" />
                <div>
                  <div className="community-notif__profile-name">Marukoo</div>
                  <div className="community-notif__profile-handle">@Marukokoko_2899</div>
                </div>
              </div>
              <div className="community-notif__input">Type Something...</div>
              <div className="community-notif__actions">
                <img src="insert-picture-icon0.svg" alt="Insert picture" />
                <img src="insert-gif-icon0.svg" alt="Insert GIF" />
                <ButtonProperty1Default text="Post" className="community-notif__post-btn" />
              </div>
            </div>
          </aside>

          <main className="community-notif__feed">
            {NOTIFICATIONS.map(({ title, items }) => (
              <section key={title} className="community-notif__group">
                <h2>{title}</h2>
                <div className="community-notif__group-items">
                  {items.map((item, index) => (
                    <NotificationItem key={`${title}-${index}`} {...item} />
                  ))}
                </div>
              </section>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CommunityNotifications;




