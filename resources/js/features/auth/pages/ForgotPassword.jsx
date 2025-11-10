import "@/assets/styles/pages/ForgotPassword.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import ConfirmLeaveModal from "../components/ConfirmLeaveModal";
import http from "@/core/api/axios"; // ✅ axios instance kamu

const ForgotPassword = ({ className = "", ...props }) => {
    const rootClassName = ["halaman-login-user", "forgot-password-page", className].filter(Boolean).join(" ");
    const navigate = useNavigate();
    const location = useLocation();
    const source = location.state?.source === "seller" ? "seller" : "user";

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showConfirmLeave, setShowConfirmLeave] = useState(false);

    // ✅ Fungsi submit verifikasi email
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email.includes("@")) {
            setError("Please enter a valid email address.");
            return;
        }

        try {
            setError("");
            setLoading(true);

            // 🔹 Panggil endpoint Laravel
            const res = await http.post("/customer/check-email", { email });

            if (res.data.success) {
                // ✅ Email ditemukan → lanjut ke halaman reset password
                alert("✅ Email verified successfully!");
                navigate("/forgot-password/reset", { state: { email, source } });
            } else {
                setError(res.data.message || "Email not found.");
            }
        } catch (err) {
            console.error("Forgot password error:", err);
            setError(err.response?.data?.message || "Email not found or server error.");
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Modal konfirmasi keluar
    const handleClose = () => setShowConfirmLeave(true);
    const handleStay = () => setShowConfirmLeave(false);
    const handleLeave = () => {
        setShowConfirmLeave(false);
        navigate(-1);
    };

    // 🔹 Redirect ke register seller
    const handleSignUp = () => {
        navigate("/seller/register");
    };

    return (
        <div className={rootClassName} {...props}>
            <button type="button" className="close-button" aria-label="Close" onClick={handleClose}>
                &times;
            </button>

            <div className="forgot-card">
                <form className="forgot-form" autoComplete="off" onSubmit={handleSubmit}>
                    <h1 className="forgot-title">Forgot Password</h1>
                    <label className="forgot-field" htmlFor="forgot-email">
                        <span>Email</span>
                        <input
                            id="forgot-email"
                            type="email"
                            name="email"
                            placeholder="Enter email . . ."
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </label>

                    {error && <p className="forgot-error">{error}</p>}

                    <button type="submit" className="forgot-submit" disabled={loading}>
                        {loading ? "Checking..." : "Continue"}
                    </button>
                </form>

                <p className="forgot-footer">
                    New to Tokolokal? Create your account{" "}
                    <button type="button" onClick={handleSignUp}>
                        here.
                    </button>
                </p>
            </div>

            <ConfirmLeaveModal
                isOpen={showConfirmLeave}
                onStay={handleStay}
                onLeave={handleLeave}
                description="You haven't finished requesting a password reset yet. If you leave now, any information you entered will be lost."
            />
        </div>
    );
};

export { ForgotPassword };
export default ForgotPassword;
