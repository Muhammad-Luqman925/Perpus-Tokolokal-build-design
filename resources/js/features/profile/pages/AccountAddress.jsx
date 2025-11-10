import "@/assets/styles/pages/ProfileAccountLayout.css";
import "@/assets/styles/pages/ProfileAccountAddress.css";
import { Navbar } from "@/components/navigation/Navbar";
import { useEffect, useState } from "react";         // ✅ penting
import { useNavigate } from "react-router-dom";
import CustomerAddressAPI from "@/core/api/customerAddress.api";
import CustomerProfileAPI from "@/core/api/customerProfile.api"; // untuk avatar & nama sidebar

const accountMenus = [
  {
    label: "My Account",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 12C14.76 12 17 9.76 17 7C17 4.24 14.76 2 12 2C9.24 2 7 4.24 7 7C7 9.76 9.24 12 12 12Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 20.2C4 16.4 7.13 13.25 10.94 13.25H13.06C16.87 13.25 20 16.4 20 20.2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    children: ["Profile", "Address", "Bank & Cards", "Change Password"],
  },
  { label: "Orders", icon: (<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5H20V11C18.34 11 17 12.34 17 14C17 15.66 18.34 17 20 17V19H4V17C5.66 17 7 15.66 7 14C7 12.34 5.66 11 4 11V5Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 9H14" strokeWidth="1.5" strokeLinecap="round"/><path d="M10 15H14" strokeWidth="1.5" strokeLinecap="round"/></svg>) },
  { label: "Vouchers", icon: (<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5H20L19 17H5L4 5Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 9H15" strokeWidth="1.5" strokeLinecap="round"/><path d="M12 9V15" strokeWidth="1.5" strokeLinecap="round"/></svg>) },
  { label: "Notifications", icon: (<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.25 14V10.18C18.25 6.96 15.72 4.18 12.5 4C9.06 3.82 6.25 6.52 6.25 9.93V14L4.75 15.5H20.25L18.25 14Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14.5 18C14.16 19.14 13.16 20 12 20C10.84 20 9.84 19.14 9.5 18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>) },
  { label: "Privacy", icon: (<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10V8C7 5.24 9.24 3 12 3C14.76 3 17 5.24 17 8V10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 10H19V17C19 19.76 16.76 22 14 22H10C7.24 22 5 19.76 5 17V10Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>) },
  { label: "Logout", icon: (<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5H6C4.895 5 4 5.895 4 7V17C4 18.105 4.895 19 6 19H10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 12H21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 9L20 12L17 15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>) },
];

const AccountAddress = ({ className = "" }) => {
  const pageClassName = ["profile-account-page", className].filter(Boolean).join(" ");
  const navigate = useNavigate();

  // ✅ sidebar profile card (tetap tampil)
  const [profileInfo, setProfileInfo] = useState({ name: "My Account", avatar: null });

  // ✅ data alamat
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ modal form
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: undefined,
    label: "",
    recipient_name: "",
    phone: "",
    address_line: "",
    city: "",
    state: "",
    postal_code: "",
    country: "Indonesia",
    notes: "",
    is_primary: false,
  });

  // Load profile (untuk avatar + nama di sidebar)
  useEffect(() => {
    (async () => {
      try {
        const res = await CustomerProfileAPI.getProfile();
        setProfileInfo(res.data.customer);
      } catch (e) {
        console.error("Gagal ambil profil:", e);
      }
    })();
  }, []);

  // Load addresses
  useEffect(() => {
    (async () => {
      try {
        const res = await CustomerAddressAPI.getAll();
        setAddresses(res.data.addresses || []);
      } catch (err) {
        console.error("Gagal ambil alamat:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleMenuSelect = (label, child) => {
    if (label === "Logout") {
      localStorage.removeItem("token");
      navigate("/");
      return;
    }
    if (label === "Orders") navigate("/profile/orders");
    else if (label === "Vouchers") navigate("/profile/vouchers");
    else if (label === "Notifications") navigate("/profile/notifications");
    else if (label === "Privacy") navigate("/profile/privacy");
    else if (label === "My Account") {
      if (!child || child === "Profile") navigate("/profile/my-account");
      else if (child === "Address") navigate("/profile/my-account/address");
      else if (child === "Bank & Cards") navigate("/profile/my-account/bank-cards");
      else if (child === "Change Password") navigate("/profile/my-account/change-password");
    }
  };

  const openAddForm = () => {
    setIsEditing(false);
    setFormData({
      id: undefined,
      label: "",
      recipient_name: "",
      phone: "",
      address_line: "",
      city: "",
      state: "",
      postal_code: "",
      country: "Indonesia",
      notes: "",
      is_primary: false,
    });
    setShowForm(true);
  };

  const openEditForm = (addr) => {
    setIsEditing(true);
    setFormData({
      id: addr.id,
      label: addr.label || "",
      recipient_name: addr.recipient_name || "",
      phone: addr.phone || "",
      address_line: addr.address_line || "",
      city: addr.city || "",
      state: addr.state || "",
      postal_code: addr.postal_code || "",
      country: addr.country || "Indonesia",
      notes: addr.notes || "",
      is_primary: !!addr.is_primary,
    });
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const reloadAddresses = async () => {
    const res = await CustomerAddressAPI.getAll();
    setAddresses(res.data.addresses || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing && formData.id) {
        await CustomerAddressAPI.update(formData.id, formData);
        alert("Alamat berhasil diperbarui!");
      } else {
        await CustomerAddressAPI.create(formData);
        alert("Alamat berhasil ditambahkan!");
      }
      await reloadAddresses();
      setShowForm(false);
    } catch (err) {
      console.error("Gagal simpan alamat:", err);
      alert("Terjadi kesalahan saat menyimpan alamat.");
    }
  };

  const handleDelete = async (id) => {
    // eslint-disable-next-line no-alert
    if (!confirm("Hapus alamat ini?")) return;
    try {
      await CustomerAddressAPI.delete(id);
      setAddresses((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error(err);
      alert("Gagal hapus alamat.");
    }
  };

  if (loading) return <p>Loading addresses...</p>;

  return (
    <div className={pageClassName}>
      <Navbar className="profile-account-page__nav" />

      <main className="profile-account-layout">
        {/* SIDEBAR — tetap seperti desain awal */}
        <aside className="profile-account-sidebar">
          <div className="profile-account-sidebar__card">
            <img
              src={
                profileInfo?.avatar
                  ? `${import.meta.env.VITE_API_BASE_URL}/storage/${profileInfo.avatar}`
                  : "https://i.pinimg.com/736x/57/75/57/577557dcdb3324ec637b1674b1b74c05.jpg"
              }
              alt={profileInfo?.name || "User"}
            />
            <h2>{profileInfo?.name || "My Account"}</h2>
            <span>Premium Seller</span>
          </div>

          <nav className="profile-account-sidebar__menu">
            {accountMenus.map(({ label, icon, children }) => (
              <div className="profile-account-sidebar__group" key={label}>
                <button
                  type="button"
                  className={`profile-account-sidebar__item ${label === "My Account" ? "is-active" : ""}`}
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
                          className={child === "Address" ? "is-active" : ""}
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

        {/* CONTENT */}
        <section className="profile-account-content">
          <header className="profile-account-content__header">
            <h1>Address</h1>
            <p>Manage and organise your saved locations for faster checkout.</p>
          </header>

          <div className="address-board">
            <div className="address-board__actions">
              <button type="button" className="address-board__add" onClick={openAddForm}>
                <span>+</span> Add New Address
              </button>
            </div>

            <ul className="address-board__list">
              {addresses.map((a) => (
                <li key={a.id} className="address-card">
                  <div className="address-card__body">
                    <div className="address-card__meta">
                      <h3>
                        {a.label} {a.is_primary ? <span className="tag">Primary</span> : null}
                      </h3>
                      <span>{a.phone}</span>
                    </div>
                    <p>{a.address_line}</p>
                    <p>
                      {a.city}, {a.state} {a.postal_code}, {a.country}
                    </p>
                  </div>
                  <div className="address-card__actions">
                        <button
                            type="button"
                            onClick={() => openEditForm(a)}
                            className="btn-action btn-edit"
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            onClick={() => handleDelete(a.id)}
                            className="btn-action btn-delete"
                        >
                            Delete
                        </button>
                        </div>


                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {/* MODAL ADD/EDIT */}
      {/* 🔹 MODAL FORM ADD/EDIT */}
{/* 🔹 MODAL FORM ADD/EDIT */}
{showForm && (
    <div className="address-modal wide">
        <div className="address-modal__overlay" onClick={() => setShowForm(false)} />
        <form className="address-modal__content wide" onSubmit={handleSubmit}>
            <h2>{isEditing ? "Edit Address" : "Add New Address"}</h2>

            <div className="address-form-grid">
                {/* Left Column */}
                <div className="address-form-column">
                    <label>Label</label>
                    <input
                        name="label"
                        value={formData.label}
                        onChange={handleChange}
                        placeholder="e.g. Home"
                    />

                    <label>Recipient Name</label>
                    <input
                        name="recipient_name"
                        value={formData.recipient_name}
                        onChange={handleChange}
                        required
                    />

                    <label>Phone</label>
                    <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                    <label>Notes</label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                    />
                </div>

                {/* Right Column */}
                <div className="address-form-column">
                    <label>Full Address</label>
                    <textarea
                        name="address_line"
                        value={formData.address_line}
                        onChange={handleChange}
                        required
                    />

                    <div className="form-row">
                        <div>
                            <label>City</label>
                            <input
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>State</label>
                            <input
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div>
                            <label>Postal Code</label>
                            <input
                                name="postal_code"
                                value={formData.postal_code}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Country</label>
                            <input
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Toggle Switch */}
                    <div className="toggle-row">
                        <label htmlFor="is_primary">Set as primary address</label>
                        <label className="switch">
                            <input
                                id="is_primary"
                                type="checkbox"
                                name="is_primary"
                                checked={formData.is_primary}
                                onChange={handleChange}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="address-modal__actions">
                <button type="button" onClick={() => setShowForm(false)} className="btn-cancel">
                    Cancel
                </button>
                <button type="submit" className="btn-save">
                    {isEditing ? "Save Changes" : "Add Address"}
                </button>
            </div>
        </form>
    </div>
)}


    </div>
  );
};

export default AccountAddress;
