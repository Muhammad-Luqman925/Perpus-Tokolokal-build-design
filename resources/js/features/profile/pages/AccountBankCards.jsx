import { useState, useEffect } from "react";
import "@/assets/styles/pages/ProfileAccountLayout.css";
import "@/assets/styles/pages/ProfileAccountBankCards.css";
import { Navbar } from "@/components/navigation/Navbar";
import { useNavigate } from "react-router-dom";
import CustomerPaymentAPI from "@/core/api/customerPayment.api";
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
                <path d="M14 12H21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17 9L20 12L17 15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
];


export const AccountBankCards = ({ className = "" }) => {
    const pageClassName = ["profile-account-page", className].filter(Boolean).join(" ");
    const navigate = useNavigate();

    
  // 🔹 State untuk data profil pengguna
  const [customer, setCustomer] = useState({ name: "", avatar: "" });

    // 🔹 Semua hook harus dideklarasikan di sini (urutan tetap)
    const [channels, setChannels] = useState([]);
    const [methods, setMethods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formType, setFormType] = useState(""); // 🟢 pindah ke sini
    const [formData, setFormData] = useState({
        payment_channel_id: "",
        account_number: "",
        account_name: "",
        is_primary: false,
    });
      useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await CustomerProfileAPI.getProfile();
        const data = res.data.customer || res.data.data || res.data;
        setCustomer({
          name: data.name || "User",
          avatar:
            data.avatar ||
            "https://ui-avatars.com/api/?background=random&name=" +
              encodeURIComponent(data.name || "User"),
        });
      } catch (err) {
        console.error("Gagal memuat profil pengguna:", err);
      }
    };
    fetchProfile();
  }, []);
    // 🔹 Ambil semua data
useEffect(() => {
  const fetchData = async () => {
    try {
      const [resChannels, resMethods] = await Promise.all([
        CustomerPaymentAPI.getChannels(),
        CustomerPaymentAPI.getAll(),
      ]);

      console.log("🔍 Channels:", resChannels);
      console.log("🔍 Methods:", resMethods);

      setChannels(resChannels.data.channels || resChannels.channels || []);
      const methodList =
        resMethods.data.payment_methods ||
        resMethods.data.methods ||
        resMethods.payment_methods ||
        resMethods.methods ||
        resMethods.data ||
        [];
      setMethods(methodList);
    } catch (err) {
      console.error("Gagal memuat data:", err);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
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

        const openAddForm = (type) => {
            setFormType(type);
            setIsEditing(false);
            setFormData({
                payment_channel_id: "",
                account_number: "",
                account_name: "",
                is_primary: false,
            });
            setShowForm(true);
        };

    const openEditForm = (m) => {
        setIsEditing(true);
        setFormData({
            id: m.id,
            payment_channel_id: m.payment_channel_id,
            account_number: m.account_number,
            account_name: m.account_name,
            is_primary: m.is_primary,
        });
        setShowForm(true);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await CustomerPaymentAPI.update(formData.id, formData);
                alert("Payment method updated successfully.");
            } else {
                await CustomerPaymentAPI.create(formData);
                alert("Payment method added successfully.");
            }

            const res = await CustomerPaymentAPI.getAll();
            setMethods(res.data.methods || []);
            setShowForm(false);
        } catch (err) {
            console.error("Gagal menyimpan:", err);
            alert("Terjadi kesalahan saat menyimpan data.");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Hapus akun ini?")) return;
        try {
            await CustomerPaymentAPI.delete(id);
            setMethods((prev) => prev.filter((m) => m.id !== id));
        } catch {
            alert("Gagal hapus data.");
        }
    };
    
    if (loading) return <p>Loading payment methods...</p>;

    const bankAccounts = methods.filter((m) => m.channel.type === "bank");
    const ewalletAccounts = methods.filter((m) => m.channel.type === "ewallet");
    

    return (
        <div className={pageClassName}>
            <Navbar className="profile-account-page__nav" />
            <main className="profile-account-layout">
                {/* 🔹 Sidebar */}
                <aside className="profile-account-sidebar">
                    <div className="profile-account-sidebar__card">
                        <img
                        src={customer.avatar}
                        alt={customer.name}
                        className="profile-account-sidebar__avatar"
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
                                                    className={child === "Bank & Cards" ? "is-active" : ""}
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

                {/* 🔹 Main Content */}
                <section className="profile-account-content">
                    <header className="profile-account-content__header">
                        <h1>Bank & Cards</h1>
                        <p>Manage linked bank accounts and e-wallets connected to your Tokolokal account.</p>
                    </header>

                    <div className="bank-cards">
                        {/* BANK */}
                        <section className="bank-cards__section">
                            <header>
                                <h2>Bank</h2>
                                <button type="button" className="bank-cards__add" onClick={() => openAddForm("bank")}>
                                    <span>+</span> Add New Bank
                                </button>
                            </header>
                            <ul>
                                {bankAccounts.map((b) => (
                                    <li key={b.id}>
                                        <div className="bank-cards__info">
                                            <div className="bank-cards__logo">
                                                <img src={b.channel.logo} alt={b.channel.name} />
                                            </div>
                                            <div className="bank-cards__copy">
                                                <span>{b.channel.name}</span>
                                                <p>{b.account_number}</p>
                                            </div>
                                        </div>
                                        <div className="bank-cards__actions">
                                            <button onClick={() => openEditForm(b)}>Edit</button>
                                            <button onClick={() => handleDelete(b.id)} className="delete-btn">Delete</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* E-WALLET */}
                        <section className="bank-cards__section">
                            <header>
                                <h2>E-wallet</h2>
                                <button type="button" className="bank-cards__add" onClick={() => openAddForm("ewallet")}>
                                    <span>+</span> Add New E-wallet
                                </button>
                            </header>
                            <ul>
                                {ewalletAccounts.map((w) => (
                                <li key={w.id}>
                                    <div className="bank-cards__info">
                                        <div className="bank-cards__logo">
                                            <img src={w.channel.logo} alt={w.channel.name} />
                                        </div>
                                        <div className="bank-cards__copy">
                                            <span>{w.channel.name}</span>
                                            <p>{w.account_number}</p>
                                        </div>
                                    </div>
                                    <div className="bank-cards__actions">
                                        <button onClick={() => openEditForm(w)}>Edit</button>
                                        <button onClick={() => handleDelete(w.id)} className="delete-btn">
                                            Delete
                                        </button>
                                    </div>
                                </li>   
                            ))}

                            </ul>
                        </section>
                    </div>
                </section>
            </main>

            {/* 🔹 Modal Add/Edit */}
            {showForm && (
                <div className="payment-modal">
                    <div className="payment-modal__overlay" onClick={() => setShowForm(false)} />
                    <form className="payment-modal__content" onSubmit={handleSubmit}>
                        <h2>{isEditing ? "Edit Payment Method" : "Add New Payment Method"}</h2>

                        <label>Payment Channel</label>
                        <select
                            name="payment_channel_id"
                            value={formData.payment_channel_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select {formType === "bank" ? "Bank" : "E-wallet"}</option>
                            {channels
                                .filter((c) => c.type === formType)
                                .map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                        </select>


                        <label>Account Number</label>
                        <input
                            type="text"
                            name="account_number"
                            value={formData.account_number}
                            onChange={handleChange}
                            required
                        />

                        <label>Account Holder Name</label>
                        <input
                            type="text"
                            name="account_name"
                            value={formData.account_name}
                            onChange={handleChange}
                            required
                        />

                        <label className="checkbox">
                            <input
                                type="checkbox"
                                name="is_primary"
                                checked={formData.is_primary}
                                onChange={handleChange}
                            />
                            Set as primary account
                        </label>

                        <div className="payment-modal__actions">
                            <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>
                                Cancel
                            </button>
                            <button type="submit" className="btn-save">
                                {isEditing ? "Save Changes" : "Add Account"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AccountBankCards;
