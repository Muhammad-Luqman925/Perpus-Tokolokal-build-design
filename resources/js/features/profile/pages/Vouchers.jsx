import { useEffect, useState, useMemo } from "react";
import "@/assets/styles/pages/ProfileAccountLayout.css";
import "@/assets/styles/pages/ProfileVouchers.css";
import { Navbar } from "@/components/navigation/Navbar";
import { useNavigate } from "react-router-dom";
import CustomerVoucherAPI from "@/core/api/customerVoucher.api";
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

const VoucherIcon = ({ type }) => {
  if (type === "discount") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <rect x="6" y="6" width="20" height="20" rx="4" fill="currentColor" />
        <path
          d="M13.5 12L19 20"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="20" cy="12" r="2" fill="#ffffff" />
        <circle cx="12" cy="20" r="2" fill="#ffffff" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M6 7C6 5.895 6.895 5 8 5H24C25.105 5 26 5.895 26 7V12C24.343 12 23 13.343 23 15C23 16.657 24.343 18 26 18V23C26 24.105 25.105 25 24 25H8C6.895 25 6 24.105 6 23V18C7.657 18 9 16.657 9 15C9 13.343 7.657 12 6 12V7Z"
        fill="currentColor"
      />
      <rect x="11" y="9" width="2" height="12" rx="1" fill="#ffffff" />
      <rect x="19" y="9" width="2" height="12" rx="1" fill="#ffffff" />
    </svg>
  );
};

export const Vouchers = ({ className = "" }) => {
  const navigate = useNavigate();
  const pageClassName = ["profile-account-page", className].filter(Boolean).join(" ");

  const [vouchers, setVouchers] = useState([]);
  const [customer, setCustomer] = useState({ name: "", avatar: "" });
  const [redeemCode, setRedeemCode] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch data voucher & profile
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resProfile, resVouchers] = await Promise.all([
          CustomerProfileAPI.getProfile(),
          CustomerVoucherAPI.getAll(),
        ]);

        // --- Customer info ---
        const data = resProfile.data.customer || resProfile.data.data || {};
        setCustomer({
          name: data.name || "User",
          avatar:
            data.avatar ||
            `https://ui-avatars.com/api/?background=random&name=${encodeURIComponent(
              data.name || "User"
            )}`,
        });

        // --- Voucher list dari backend ---
        const voucherList =
          resVouchers.data?.vouchers || resVouchers.vouchers || [];
        setVouchers(voucherList);
      } catch (error) {
        console.error("❌ Failed to load vouchers:", error);
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

  // ✅ Redeem voucher manual (kode input)
  const handleRedeemSubmit = async (event) => {
  event.preventDefault();
  if (!redeemCode.trim()) return;

  try {
    const res = await CustomerVoucherAPI.redeemCode(redeemCode);
    const voucher = res.data?.voucher || res.voucher;

    if (res.data?.success && voucher) {
      alert("✅ Voucher redeemed successfully!");
      setVouchers((prev) => [...prev, voucher]);
    } else {
      alert(res.data?.message || "❌ Invalid voucher or inactive.");
    }
    setRedeemCode("");
  } catch (err) {
    // ✅ tampilkan pesan dari backend (sudah diredeem, invalid, dsb.)
    alert(err.response?.data?.message || "❌ Failed to redeem voucher.");
  }
};


  // ✅ Tampilkan semua voucher aktif milik customer
  const customerVouchers = useMemo(
    () => vouchers.filter((v) => v.is_active),
    [vouchers]
  );

  if (loading) return <p className="loading-text">Loading vouchers...</p>;

  return (
    <div className={pageClassName}>
      <Navbar className="profile-account-page__nav" />

      <main className="profile-account-layout">
        {/* Sidebar */}
        <aside className="profile-account-sidebar">
          <div className="profile-account-sidebar__card">
            <img src={customer.avatar} alt={customer.name} />
            <h2>{customer.name}</h2>
            <span>Premium Seller</span>
          </div>

          <nav className="profile-account-sidebar__menu">
            {accountMenus.map(({ label, icon, children }) => (
              <div className="profile-account-sidebar__group" key={label}>
                <button
                  type="button"
                  className={`profile-account-sidebar__item ${
                    label === "Vouchers" ? "is-active" : ""
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

        {/* --- Content --- */}
        <section className="profile-account-content">
          <header className="profile-account-content__header">
            <h1>Vouchers</h1>
            <p>Enter your redeem code or view your available vouchers below.</p>
          </header>

          <div className="voucher-board">
            {/* Redeem Form */}
            <form className="voucher-redeem" onSubmit={handleRedeemSubmit}>
              <label htmlFor="redeem-code" className="voucher-redeem__icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 6V12L16 14"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </label>
              <input
                id="redeem-code"
                type="text"
                placeholder="Enter Your Redeem Code"
                value={redeemCode}
                onChange={(e) => setRedeemCode(e.target.value)}
              />
              <button type="submit" disabled={!redeemCode.trim()}>
                Redeem
              </button>
            </form>

            {/* --- Customer Vouchers --- */}
            <div className="voucher-section">
              <h2>My Vouchers</h2>
              {customerVouchers.length === 0 ? (
                <p className="text-muted">You don’t have any vouchers yet.</p>
              ) : (
                customerVouchers.map((v) => (
                  <article className="voucher-card" key={v.id}>
                    <div className="voucher-card__icon">
                      <VoucherIcon type={v.type} />
                    </div>
                    <div className="voucher-card__body">
                      <h2>{v.title}</h2>
                      <p>{v.description}</p>
                      <small>Code: {v.code}</small>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Vouchers;
