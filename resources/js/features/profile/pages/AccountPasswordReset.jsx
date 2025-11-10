import "@/assets/styles/pages/ProfileAccountLayout.css";
import "@/assets/styles/pages/ProfileAccountPasswordReset.css";
import { Navbar } from "@/components/navigation/Navbar";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerPasswordAPI from "@/core/api/customerPassword.api";
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

const passwordRules = [
  { id: "lowercase", label: "At least one lowercase letter", test: (v) => /[a-z]/.test(v) },
  { id: "length", label: "Minimum 8 characters", test: (v) => v.length >= 8 },
  { id: "uppercase", label: "At least one uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { id: "number", label: "At least one number", test: (v) => /\d/.test(v) },
];

export const AccountPasswordReset = ({ className = "" }) => {
  const navigate = useNavigate();
  const pageClassName = ["profile-account-page", className].filter(Boolean).join(" ");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState({ name: "", avatar: "" });

  // ✅ Fetch profile dari API saat pertama kali load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await CustomerProfileAPI.getProfile();
        const data = res.data.customer || res.data.data || res.data; // tergantung struktur respons
        setCustomer({
          name: data.name || "User",
          avatar:
            data.avatar ||
            "https://ui-avatars.com/api/?background=random&name=" +
              encodeURIComponent(data.name || "User"),
        });
      } catch (err) {
        console.error("Failed to load customer profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const passwordValidations = useMemo(
    () =>
      passwordRules.map((rule) => ({
        ...rule,
        isValid: rule.test(password),
      })),
    [password]
  );

  const isPasswordStrong = passwordValidations.every((rule) => rule.isValid);

  const handleMenuSelect = (label, child) => {
    if (label === "Logout") {
      localStorage.removeItem("token");
      navigate("/");
      return;
    }

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

    navigate(routes[child || label] || "/profile/my-account");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isPasswordStrong) return;

    try {
      setLoading(true);
      await CustomerPasswordAPI.changePassword({
        new_password: password,
      });

      alert("✅ Password updated successfully!");
      navigate("/profile/my-account");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "❌ Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={pageClassName}>
      <Navbar className="profile-account-page__nav" />

      <main className="profile-account-layout">
        {/* ✅ SIDEBAR */}
        <aside className="profile-account-sidebar">
          <div className="profile-account-sidebar__card">
          <img
            src={
              customer.avatar ||
              "https://ui-avatars.com/api/?background=random&name=" +
                encodeURIComponent(customer.name || "User")
            }
            alt={customer.name || "User"}
          />
          <h2>{customer.name || "Loading..."}</h2>
          <span>Premium Seller</span>
        </div>

          <nav className="profile-account-sidebar__menu">
            {accountMenus.map(({ label, icon, children }) => (
              <div className="profile-account-sidebar__group" key={label}>
                <button
                  type="button"
                  className={`profile-account-sidebar__item ${
                    label === "My Account" ? "is-active" : ""
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
                          className={child === "Change Password" ? "is-active" : ""}
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

        {/* ✅ CONTENT */}
        <section className="profile-account-content">
          <header className="profile-account-content__header">
            <h1>Change Password</h1>
            <p>Create a strong password to keep your account secure.</p>
          </header>

          <div className="password-reset-card">
            <form className="password-reset-form" onSubmit={handleSubmit}>
              {/* Only New Password */}
              <div className="password-reset-form__field">
                <label htmlFor="new-password">New Password</label>
                <div className={`password-input ${isPasswordStrong ? "is-valid" : ""}`}>
                  <input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                  />
                  <button
                    type="button"
                    className="password-input__toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <ul className="password-rules">
                {passwordValidations.map(({ id, label, isValid }) => (
                  <li key={id} className={`password-rule ${isValid ? "is-valid" : ""}`}>
                    <span>{isValid ? "✅" : "❌"} {label}</span>
                  </li>
                ))}
              </ul>

              <div className="password-reset-form__actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`btn-primary ${isPasswordStrong ? "is-active" : ""}`}
                  disabled={!isPasswordStrong || loading}
                >
                  {loading ? "Updating..." : "Reset Password"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AccountPasswordReset;
