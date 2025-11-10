import "@/assets/styles/pages/ProfileAccountLayout.css";
import "@/assets/styles/pages/ProfileNotifications.css";
import { Navbar } from "@/components/navigation/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const accountMenus = [
  {
    label: "My Account",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 12C14.76 12 17 9.76 17 7C17 4.24 14.76 2 12 2C9.24 2 7 4.24 7 7C7 9.76 9.24 12 12 12Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 20.2C4 16.4 7.13 13.25 10.94 13.25H13.06C16.87 13.25 20 16.4 20 20.2"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    children: ["Profile", "Address", "Bank & Cards", "Change Password"],
  },
  {
    label: "Orders",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4 5H20V11C18.34 11 17 12.34 17 14C17 15.66 18.34 17 20 17V19H4V17C5.66 17 7 15.66 7 14C7 12.34 5.66 11 4 11V5Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M10 9H14" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 15H14" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Vouchers",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4 5H20L19 17H5L4 5Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9 9H15" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 9V15" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Notifications",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M18.25 14V10.18C18.25 6.96 15.72 4.18 12.5 4C9.06 3.82 6.25 6.52 6.25 9.93V14L4.75 15.5H20.25L18.25 14Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.5 18C14.16 19.14 13.16 20 12 20C10.84 20 9.84 19.14 9.5 18"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Privacy",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M7 10V8C7 5.24 9.24 3 12 3C14.76 3 17 5.24 17 8V10"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 10H19V17C19 19.76 16.76 22 14 22H10C7.24 22 5 19.76 5 17V10Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Logout",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M10 5H6C4.895 5 4 5.895 4 7V17C4 18.105 4.895 19 6 19H10"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 12H21"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 9L20 12L17 15"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const profileInfo = {
  name: "Marukooo",
  tier: "Premium Seller",
  avatar:
    "https://i.pinimg.com/736x/57/75/57/577557dcdb3324ec637b1674b1b74c05.jpg",
};

const notificationGroups = [
  {
    id: "purchase",
    title: "Purchase Notification",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M3 3H21L19.5 17.5H4.5L3 3Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9 7H15" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 7V13" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    items: [
      { id: "awaiting-payment", label: "Awaiting Payment", defaultChecked: true },
      {
        id: "awaiting-confirmation",
        label: "Awaiting Confirmation",
        defaultChecked: true,
      },
      { id: "order-processed", label: "Order Processed", defaultChecked: true },
      { id: "order-shipped", label: "Order Shipped", defaultChecked: false },
      { id: "order-completed", label: "Order Completed", defaultChecked: true },
      { id: "order-cancelled", label: "Order Cancelled", defaultChecked: false },
      { id: "return-refund", label: "Return & Refund", defaultChecked: true },
      { id: "reminders", label: "Reminders", defaultChecked: true },
    ],
  },
  {
    id: "promo",
    title: "Promo",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 3C7.02944 3 3 7.02944 3 12M12 3C16.9706 3 21 7.02944 21 12M12 3V6M12 21C7.02944 21 3 16.9706 3 12M12 21C16.9706 21 21 16.9706 21 12M12 21V18M3 12H6M21 12H18M8.46447 8.46447L10.5858 10.5858M15.5355 15.5355L13.4142 13.4142"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    items: [
      { id: "newsletter", label: "Newsletter", defaultChecked: true },
    ],
  },
];

const buildInitialPreferences = () => {
  const map = {};
  notificationGroups.forEach((group) => {
    group.items.forEach((item) => {
      map[item.id] = item.defaultChecked;
    });
  });
  return map;
};

export const Notifications = ({ className = "" }) => {
  const navigate = useNavigate();
  const pageClassName = ["profile-account-page", className]
    .filter(Boolean)
    .join(" ");
  const activeGroup = "Notifications";
  const activeChild = null;
  const [preferences, setPreferences] = useState(buildInitialPreferences);

  const handleMenuSelect = (label, child) => {
    if (label === "Logout") {
      navigate("/");
      return;
    }
    if (label === "Orders") {
      navigate("/profile/orders");
      return;
    }

    if (label === "Vouchers") {
      navigate("/profile/vouchers");
      return;
    }

  if (label === activeGroup) {
    navigate("/profile/notifications");
    return;
  }

  if (label === "Privacy") {
    navigate("/profile/privacy");
    return;
  }

  if (label === "My Account") {
    if (!child || child === "Profile") {
      navigate("/profile/my-account");
      return;
    }
    if (child === "Bank & Cards") {
      navigate("/profile/my-account/bank-cards");
      return;
    }
    if (child === "Change Password") {
      navigate("/profile/my-account/change-password");
      return;
    }
    if (child === "Address") {
      navigate("/profile/my-account/address");
    }
  }
};

  const togglePreference = (id) => {
    setPreferences((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className={pageClassName}>
      <Navbar className="profile-account-page__nav" />

      <main className="profile-account-layout">
        <aside className="profile-account-sidebar">
          <div className="profile-account-sidebar__card">
            <img src={profileInfo.avatar} alt={profileInfo.name} />
            <h2>{profileInfo.name}</h2>
            <span>{profileInfo.tier}</span>
          </div>

          <nav className="profile-account-sidebar__menu">
            {accountMenus.map(({ label, icon, children }) => (
              <div className="profile-account-sidebar__group" key={label}>
                <button
                  type="button"
                  className={`profile-account-sidebar__item ${
                    label === activeGroup ? "is-active" : ""
                  }`}
                  onClick={() => handleMenuSelect(label)}
                >
                  {icon}
                  <span>{label}</span>
                </button>

                {children ? (
                  <ul>
                    {children.map((child) => (
                      <li key={child}>
                        <button
                          type="button"
                          className={
                            label === "My Account" && child === activeChild ? "is-active" : ""
                          }
                          onClick={() => handleMenuSelect(label, child)}
                        >
                          {child}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </nav>
        </aside>

        <section className="profile-account-content">
          <header className="profile-account-content__header">
            <h1>Notifications</h1>
            <p>Set the notifications you want to receive here.</p>
          </header>

          <div className="notification-board">
            {notificationGroups.map(({ id, title, icon, items }) => (
              <section className="notification-group" key={id}>
                <header className="notification-group__header">
                  <span className="notification-group__icon" aria-hidden="true">
                    {icon}
                  </span>
                  <div>
                    <h2>{title}</h2>
                  </div>
                  <span className="notification-group__column">E-mail</span>
                </header>

                <ul className="notification-group__items">
                  {items.map(({ id: itemId, label }) => (
                    <li className="notification-item" key={itemId}>
                      <span>{label}</span>
                      <button
                        type="button"
                        className={`notification-toggle ${
                          preferences[itemId] ? "is-active" : ""
                        }`}
                        aria-pressed={preferences[itemId]}
                        onClick={() => togglePreference(itemId)}
                        aria-label={`Toggle ${label} notifications`}
                      >
                        {preferences[itemId] ? (
                          <svg viewBox="0 0 20 20" aria-hidden="true">
                            <path d="M15.312 5.312a1 1 0 0 1 0 1.415l-6.01 6.01a1 1 0 0 1-1.414 0l-3.2-3.2a1 1 0 1 1 1.414-1.414l2.493 2.493 5.303-5.303a1 1 0 0 1 1.414 0Z" />
                          </svg>
                        ) : null}
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Notifications;




