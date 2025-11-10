import "@/assets/styles/pages/ProfileAccountLayout.css";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { useNavigate } from "react-router-dom";
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
    { label: "Orders", icon: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5H20V11C18.34 11 17 12.34 17 14C17 15.66 18.34 17 20 17V19H4V17C5.66 17 7 15.66 7 14C7 12.34 5.66 11 4 11V5Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M10 9H14" strokeWidth="1.5" strokeLinecap="round" /><path d="M10 15H14" strokeWidth="1.5" strokeLinecap="round" /></svg> },
    { label: "Vouchers", icon: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5H20L19 17H5L4 5Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 9H15" strokeWidth="1.5" strokeLinecap="round" /><path d="M12 9V15" strokeWidth="1.5" strokeLinecap="round" /></svg> },
    { label: "Notifications", icon: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.25 14V10.18C18.25 6.96 15.72 4.18 12.5 4C9.06 3.82 6.25 6.52 6.25 9.93V14L4.75 15.5H20.25L18.25 14Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M14.5 18C14.16 19.14 13.16 20 12 20C10.84 20 9.84 19.14 9.5 18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> },
    { label: "Privacy", icon: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10V8C7 5.24 9.24 3 12 3C14.76 3 17 5.24 17 8V10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M5 10H19V17C19 19.76 16.76 22 14 22H10C7.24 22 5 19.76 5 17V10Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> },
    {
        label: "Logout",
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M10 5H6C4.895 5 4 5.895 4 7V17C4 18.105 4.895 19 6 19H10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 12H21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17 9L20 12L17 15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
];

export const AccountProfile = ({ className = "" }) => {
    const navigate = useNavigate();
    const pageClassName = ["profile-account-page", className].filter(Boolean).join(" ");
    const [isEditing, setIsEditing] = useState(false);
    const [profileInfo, setProfileInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({});

    // 🔹 ambil data profil dari backend
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await CustomerProfileAPI.getProfile();
                const c = res.data.customer;
                setProfileInfo(c);
                setFormData({
                    name: c.name || "",
                    email: c.email || "",
                    phone_number: c.phone_number || "",
                    gender: c.gender || "",
                    date_of_birth: c.date_of_birth || "",
                });
            } catch (err) {
                console.error("Gagal memuat profil:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // preview dulu
    const previewUrl = URL.createObjectURL(file);
    setProfileInfo((prev) => ({ ...prev, avatar: previewUrl }));

    try {
        await CustomerProfileAPI.uploadAvatar(file);
        alert("Avatar updated successfully!");
    } catch (err) {
        console.error("Gagal upload avatar:", err);
        alert("Gagal upload avatar!");
    }
};

    const handleUpdate = async () => {
        try {
            const res = await CustomerProfileAPI.updateProfile(formData);
            setProfileInfo(res.data.customer);
            alert("Profile updated successfully!");
            setIsEditing(false);
        } catch (error) {
            console.error("Gagal update profil:", error);
            alert("Gagal update profil.");
        }
    };

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

    if (loading) return <p>Loading profile...</p>;
    if (!profileInfo) return <p>Profile not found</p>;

    return (
        <div className={pageClassName}>
            <Navbar className="profile-account-page__nav" />
            <main className="profile-account-layout">
                <aside className="profile-account-sidebar">
                    <div className="profile-account-sidebar__card">
                    <img
                        src={
                        profileInfo.avatar
                        ? profileInfo.avatar.startsWith("http")
                            ? profileInfo.avatar
                            : `${import.meta.env.VITE_API_BASE_URL}/storage/${profileInfo.avatar}`
                        : "https://i.pinimg.com/736x/57/75/57/577557dcdb3324ec637b1674b1b74c05.jpg"
                        }
                        alt={profileInfo.name}
                        />
                        <h2>{profileInfo.name}</h2>
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
                                                    className={child === "Profile" ? "is-active" : ""}
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

                <section className="profile-account-content">
                    <header className="profile-account-content__header">
                        <h1>Profile</h1>
                    </header>

                    <div className="profile-account-content__body">
                        {isEditing ? (
                            <form className="profile-account-form">
                                <div className="profile-account-form__header">
                                    <div>
                                        <span>Edit your information</span>
                                        <h2>Edit Profile</h2>
                                    </div>
                                    <button
                                        type="button"
                                        className="profile-account-form__cancel"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>

                                <div className="profile-account-form__card">
                                    {/* Kolom kiri: avatar (biar layout-nya tetap seperti desain awal) */}
                                    <div className="profile-account-form__avatar">
                                        <div className="profile-account-form__avatar-wrapper">
                                            <img
                                                    src={
                                                        profileInfo.avatar
                                                            ? profileInfo.avatar.startsWith("http")
                                                                ? profileInfo.avatar
                                                                : `${import.meta.env.VITE_API_BASE_URL}/storage/${profileInfo.avatar}`
                                                            : "https://i.pinimg.com/736x/57/75/57/577557dcdb3324ec637b1674b1b74c05.jpg"
                                                    }
                                                    alt={profileInfo.name}
                                                />
                                        </div>
                                        <div className="profile-account-form__avatar-actions">
                                            <label
                                                htmlFor="avatar-upload"
                                                className="profile-account-form__avatar-button"
                                                style={{ cursor: "pointer" }}
                                            >
                                                Change Image
                                                <input
                                                    id="avatar-upload"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleAvatarChange}
                                                    style={{ display: "none" }}
                                                />
                                            </label>

                                            <span>
                                                Ukuran gambar: maks. 1 MB
                                                <br />
                                                Format gambar: .JPEG, .PNG
                                            </span>
                                        </div>
                                    </div>

                                    {/* Kolom kanan: fields */}
                                    <div className="profile-account-form__fields">
                                        <div className="profile-account-form__field">
                                            <label>Full Name</label>
                                            <input name="name" value={formData.name} onChange={handleChange} />
                                        </div>

                                        <div className="profile-account-form__field">
                                            <label>Email</label>
                                            <input
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="profile-account-form__field">
                                            <label>Phone Number</label>
                                            <input
                                                name="phone_number"
                                                type="tel"
                                                value={formData.phone_number}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="profile-account-form__field">
                                            <label>Date of Birth</label>
                                            <input
                                                type="date"
                                                name="date_of_birth"
                                                value={formData.date_of_birth || ""}
                                                onChange={handleChange}
                                            />

                                        </div>

                                        <div className="profile-account-form__field profile-account-form__field--inline">
                                            <label>Gender</label>
                                            <div className="profile-account-form__radios">
                                                <label className={formData.gender === "Female" ? "is-active" : ""}>
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value="Female"
                                                        checked={formData.gender === "Female"}
                                                        onChange={handleChange}
                                                    />
                                                    Female
                                                </label>
                                                <label className={formData.gender === "Male" ? "is-active" : ""}>
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value="Male"
                                                        checked={formData.gender === "Male"}
                                                        onChange={handleChange}
                                                    />
                                                    Male
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="profile-account-form__actions">
                                    <button
                                        type="button"
                                        className="profile-account-form__submit"
                                        onClick={handleUpdate}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="profile-account-overview">
                                <div className="profile-account-overview__card">
                                    <div className="profile-account-overview__avatar">
                                        <img
                                            src={
                                                profileInfo.avatar
                                                    ? profileInfo.avatar.startsWith("http")
                                                        ? profileInfo.avatar
                                                        : `${import.meta.env.VITE_API_BASE_URL}/storage/${profileInfo.avatar}`
                                                    : "https://i.pinimg.com/736x/57/75/57/577557dcdb3324ec637b1674b1b74c05.jpg"
                                            }
                                            alt={profileInfo.name}
                                        />
                                    </div>
                                    <div className="profile-account-overview__identity">
                                        <h2>{profileInfo.name}</h2>
                                        <span>Premium Seller</span>
                                    </div>
                                </div>

                                <div className="profile-account-overview__details">
                                    <div className="profile-account-overview__rows">
                                        <div className="profile-account-overview__row">
                                            <span>Username</span>
                                            <strong>
                                                {profileInfo.name
                                                    ? profileInfo.name.toLowerCase().replace(/\s+/g, "_")
                                                    : "-"}
                                            </strong>
                                        </div>

                                        <div className="profile-account-overview__row">
                                            <span>Date of Birth</span>
                                            <strong>{profileInfo.date_of_birth || "-"}</strong>
                                        </div>

                                        <div className="profile-account-overview__row">
                                            <span>Gender</span>
                                            <div className="profile-account-overview__tags">
                                                <span className={profileInfo.gender === "Female" ? "is-active" : ""}>Female</span>
                                                <span className={profileInfo.gender === "Male" ? "is-active" : ""}>Male</span>
                                            </div>
                                        </div>

                                        <div className="profile-account-overview__row">
                                            <span>Email</span>
                                            <strong>{profileInfo.email}</strong>
                                        </div>

                                        <div className="profile-account-overview__row">
                                            <span>Phone number</span>
                                            <strong>{profileInfo.phone_number || "-"}</strong>
                                        </div>
                                    </div>


                                    <div className="profile-account-overview__actions">
                                        <button
                                            type="button"
                                            className="profile-account-overview__edit"
                                            onClick={() => setIsEditing(true)}
                                        >
                                            Edit Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AccountProfile;
