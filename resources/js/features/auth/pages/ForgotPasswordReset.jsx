import "@/assets/styles/pages/ForgotPasswordReset.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import ConfirmLeaveModal from "../components/ConfirmLeaveModal";
import http from "@/core/api/axios"; // ✅ axios instance global

const requirements = [
    { id: "lowercase", label: "At least one lowercase letter", test: (v) => /[a-z]/.test(v) },
    { id: "length", label: "Minimum 8 characters", test: (v) => v.length >= 8 },
    { id: "uppercase", label: "At least one uppercase letter", test: (v) => /[A-Z]/.test(v) },
    { id: "number", label: "At least one number", test: (v) => /\d/.test(v) },
];

const ForgotPasswordReset = ({ className = "", ...props }) => {
    const rootClassName = ["forgot-reset-page", className].filter(Boolean).join(" ");
    const navigate = useNavigate();
    const location = useLocation();

    const source = location.state?.source === "seller" ? "seller" : "user";
    const redirectPath = source === "seller" ? "/seller/login" : "/login";
    const email = location.state?.email || ""; // ✅ ambil email dari halaman sebelumnya

    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmLeave, setShowConfirmLeave] = useState(false);

    const validationState = useMemo(
        () => requirements.map((r) => ({ ...r, isValid: r.test(password) })),
        [password]
    );

    const isStrong = validationState.every((item) => item.isValid);

    // ✅ Fungsi reset password
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isStrong) {
            alert("Please create a stronger password before continuing.");
            return;
        }

        if (!email) {
            alert("Email not found. Please restart the forgot password process.");
            navigate("/forgot-password");
            return;
        }

        try {
            setLoading(true);
            const res = await http.post("/customer/reset-password", {
                email,
                password,
            });

            if (res.data.success) {
                alert("✅ Password reset successfully! Please login with your new password.");
                navigate(redirectPath, { replace: true });
            } else {
                alert(res.data.message || "❌ Failed to reset password.");
            }
        } catch (error) {
            console.error("Reset password error:", error);
            alert(error.response?.data?.message || "❌ Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => navigate(redirectPath);
    const handleClose = () => setShowConfirmLeave(true);
    const handleStay = () => setShowConfirmLeave(false);
    const handleLeave = () => {
        setShowConfirmLeave(false);
        navigate(-1);
    };

    return (
        <div className={rootClassName} {...props}>
            <button type="button" className="close-button" aria-label="Close" onClick={handleClose}>
                &times;
            </button>

            <div className="forgot-reset-card">
                <form className="forgot-reset-form" autoComplete="off" onSubmit={handleSubmit}>
                    <h1 className="forgot-reset-title">Forgot Password</h1>

                    <label className="forgot-reset-field">
                        <span>New Password</span>
                        <div className="forgot-reset-input">
                            <span className="forgot-reset-input__icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24">
                                    <path d="M7 11V7C7 4.24 9.24 2 12 2C14.76 2 17 4.24 17 7V11" />
                                    <rect x="4" y="11" width="16" height="11" rx="2" ry="2" />
                                    <circle cx="12" cy="16" r="2" />
                                </svg>
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                className="forgot-reset-input__toggle"
                                onClick={() => setShowPassword((prev) => !prev)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <svg viewBox="0 0 24 24">
                                        <path d="M12 7C9.79 7 8 8.79 8 11C8 13.21 9.79 15 12 15C14.21 15 16 13.21 16 11C16 8.79 14.21 7 12 7Z" />
                                        <path d="M2 11C3.73 6.61 7.53 4 12 4C16.47 4 20.27 6.61 22 11" />
                                        <path d="M2 11C3.73 15.39 7.53 18 12 18C16.47 18 20.27 15.39 22 11" />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24">
                                        <path d="M3 3L21 21" />
                                        <path d="M9.88 9.88C9.34 10.42 9 11.17 9 12C9 13.66 10.34 15 12 15C12.83 15 13.58 14.66 14.12 14.12" />
                                        <path d="M6.71 6.71C4.98 7.86 3.63 9.56 3 12C4.73 16.39 8.53 19 13 19C14.86 19 16.61 18.53 18.17 17.71" />
                                        <path d="M9.53 3.95C10.33 3.81 11.15 3.73 12 3.73C16.47 3.73 20.27 6.34 22 10.73C21.44 12.28 20.59 13.67 19.51 14.84" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </label>

                    <ul className="forgot-reset-rules">
                        {validationState.map(({ id, label, isValid }) => (
                            <li key={id} className={isValid ? "is-valid" : ""}>
                                <span className="rule-icon" aria-hidden="true">
                                    {isValid ? (
                                        <svg viewBox="0 0 20 20">
                                            <path d="M16.707 5.293a1 1 0 0 1 0 1.414l-7.5 7.5a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 1.414-1.414L8.5 12.086l6.793-6.793a1 1 0 0 1 1.414 0z" />
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 20 20">
                                            <path d="M6.343 6.343a1 1 0 0 1 1.414 0L10 8.586l2.243-2.243a1 1 0 0 1 1.414 1.414L11.414 10l2.243 2.243a1 1 0 0 1-1.414 1.414L10 11.414l-2.243 2.243a1 1 0 0 1-1.414-1.414L8.586 10 6.343 7.757a1 1 0 0 1 0-1.414z" />
                                        </svg>
                                    )}
                                </span>
                                <span>{label}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="forgot-reset-actions">
                        <button type="button" className="btn-cancel" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-submit" disabled={!isStrong || loading}>
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </div>
                </form>
            </div>

            <ConfirmLeaveModal
                isOpen={showConfirmLeave}
                onStay={handleStay}
                onLeave={handleLeave}
            />
        </div>
    );
};

export { ForgotPasswordReset };
export default ForgotPasswordReset;
