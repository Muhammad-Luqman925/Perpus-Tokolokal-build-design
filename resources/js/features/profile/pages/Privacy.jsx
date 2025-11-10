import { useEffect, useState } from "react";
import "@/assets/styles/pages/ProfileAccountLayout.css";
import "@/assets/styles/pages/ProfilePrivacy.css";
import { Navbar } from "@/components/navigation/Navbar";
import { useNavigate } from "react-router-dom";
import CustomerSessionAPI from "@/core/api/customerSession.api";
import CustomerProfileAPI from "@/core/api/customerProfile.api";

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
  { label: "Orders" },
  { label: "Vouchers" },
  { label: "Notifications" },
  { label: "Privacy" },
  { label: "Logout" },
];

export const Privacy = ({ className = "" }) => {
  const navigate = useNavigate();
  const pageClassName = ["profile-account-page", className]
    .filter(Boolean)
    .join(" ");

  const [customer, setCustomer] = useState({
    name: "User",
    tier: "Premium Seller",
    avatar: "",
  });
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Fetch Profile & Sessions ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resProfile, resSessions] = await Promise.all([
          CustomerProfileAPI.getProfile(),
          CustomerSessionAPI.getAll(),
        ]);

        const user = resProfile.data?.customer || resProfile.data?.data || {};
        setCustomer({
          name: user.name || "User",
          tier: "Premium Seller",
          avatar:
            user.avatar ||
            `https://ui-avatars.com/api/?background=random&name=${encodeURIComponent(
              user.name || "User"
            )}`,
        });

        setSessions(resSessions.sessions || []);
      } catch (error) {
        console.error("Failed to load privacy data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleMenuSelect = (label, child) => {
    const routes = {
      Orders: "/profile/orders",
      Vouchers: "/profile/vouchers",
      Notifications: "/profile/notifications",
      Privacy: "/profile/privacy",
      Profile: "/profile/my-account",
      Address: "/profile/my-account/address",
      "Bank & Cards": "/profile/my-account/bank-cards",
      "Change Password": "/profile/my-account/change-password",
    };

    if (label === "Logout") {
      localStorage.removeItem("token");
      navigate("/");
      return;
    }

    navigate(routes[child || label] || "/profile/my-account");
  };

  // --- Logout per session ---
  const handleLogoutSession = async (id) => {
    if (!confirm("Are you sure you want to logout this session?")) return;

    try {
      await CustomerSessionAPI.logout(id);
      alert("✅ Session logged out successfully!");
      const res = await CustomerSessionAPI.getAll();
      setSessions(res.sessions || []);
    } catch (error) {
      console.error("Failed to logout session:", error);
      alert("❌ Failed to logout session.");
    }
  };

  // --- Logout all ---
  const handleLogoutAll = async () => {
    if (!confirm("Logout from all devices?")) return;

    try {
      await CustomerSessionAPI.logoutAll();
      alert("✅ Logged out from all devices!");
      setSessions([]);
    } catch (error) {
      console.error("Failed to logout all:", error);
      alert("❌ Failed to logout all sessions.");
    }
  };

  if (loading) return <p className="loading-text">Loading login activity...</p>;

  return (
    <div className={pageClassName}>
      <Navbar className="profile-account-page__nav" />

      <main className="profile-account-layout">
        {/* Sidebar */}
        <aside className="profile-account-sidebar">
          <div className="profile-account-sidebar__card">
            <img src={customer.avatar} alt={customer.name} />
            <h2>{customer.name}</h2>
            <span>{customer.tier}</span>
          </div>

          <nav className="profile-account-sidebar__menu">
            {accountMenus.map(({ label, icon, children }) => (
              <div className="profile-account-sidebar__group" key={label}>
                <button
                  type="button"
                  className={`profile-account-sidebar__item ${
                    label === "Privacy" ? "is-active" : ""
                  }`}
                  onClick={() => handleMenuSelect(label)}
                >
                  {icon}
                  <span>{label}</span>
                </button>

                {children && (
                  <ul>
                    {children.map((child) => (
                      <li key={child}>
                        <button
                          type="button"
                          onClick={() => handleMenuSelect(label, child)}
                        >
                          {child}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <section className="profile-account-content">
          <header className="profile-account-content__header">
            <h1>Privacy</h1>
          </header>

          <div className="privacy-card">
            <div className="privacy-card__header">
              <h2>Login Activity</h2>
              <p>
                If you notice any unfamiliar activity, please{" "}
                <button
                  type="button"
                  className="privacy-card__link"
                  onClick={() => navigate("/profile/my-account/change-password")}
                >
                  log out
                </button>{" "}
                right away and{" "}
                <button
                  type="button"
                  className="privacy-card__link"
                  onClick={() =>
                    navigate("/profile/my-account/change-password/reset")
                  }
                >
                  update your password
                </button>
                .
              </p>
            </div>

            <div className="privacy-card__section">
              <h3>Current sign-in activity</h3>

              <div className="device-list">
                {sessions.length === 0 ? (
                  <p className="text-muted">No active sessions found.</p>
                ) : (
                  sessions.map((s) => (
                    <article
                      className={`device-card ${
                        s.is_current ? "is-online" : ""
                      }`}
                      key={s.id}
                    >
                      <div className="device-card__icon" aria-hidden="true">
                        <svg viewBox="0 0 48 48">
                          <rect
                            x="6"
                            y="10"
                            width="36"
                            height="24"
                            rx="4"
                            fill="currentColor"
                          />
                          <path d="M14 36h20" stroke="#fff" strokeWidth="2" />
                        </svg>
                      </div>
                      <div className="device-card__body">
                        <h4>{s.device || "Unknown Device"}</h4>
                        <span className="device-card__ip">{s.ip_address}</span>
                        {s.is_current ? (
                          <span className="device-card__status">Online</span>
                        ) : (
                          <span className="device-card__last">
                            Last active:{" "}
                            {s.last_active_at
                              ? new Date(
                                  s.last_active_at
                                ).toLocaleString("en-US")
                              : "—"}
                          </span>
                        )}
                      </div>
                      <div className="device-card__actions">
                        {!s.is_current && (
                          <button
                            type="button"
                            onClick={() => handleLogoutSession(s.id)}
                          >
                            Logout
                          </button>
                        )}
                      </div>
                    </article>
                  ))
                )}
              </div>

              {sessions.length > 0 && (
                <div className="logout-all">
                  <button
                    type="button"
                    className="btn-logout-all"
                    onClick={handleLogoutAll}
                  >
                    Logout from all devices
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Privacy;
