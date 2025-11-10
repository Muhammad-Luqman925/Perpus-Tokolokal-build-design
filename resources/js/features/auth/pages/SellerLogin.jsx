import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonProperty1Default from "@/components/ui/ButtonProperty1Default";
import ConfirmLeaveModal from "../components/ConfirmLeaveModal";
import "@/assets/styles/pages/SellerLogin.css";

const SellerLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [showConfirmLeave, setShowConfirmLeave] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitting(true);
        setError("");

        // TODO: Integrasikan dengan endpoint autentikasi Laravel.
        console.info("Attempt seller login", { email, password });

        navigate("/halaman-setiap-kategori");
        setSubmitting(false);
    };

    const handleClose = () => {
        setShowConfirmLeave(true);
    };

    const handleStay = () => {
        setShowConfirmLeave(false);
    };

    const handleLeave = () => {
        setShowConfirmLeave(false);
        navigate(-1);
    };

    const handleForgotPassword = () => {
        navigate("/forgot-password", { state: { source: "seller" } });
    };

    return (
        <div className="halaman-log-in-seller">
            <button type="button" className="close-button" aria-label="Close" onClick={handleClose}>
                &times;
            </button>
            <div className="base-card">
                <div className="title-form-button-register">
                    <div className="title">
                        <div className="greetings">Welcome Back, Seller!</div>
                        <div className="another-greetings">
                            Glad to have you back! Continue your journey and reach more customers today!
                        </div>
                    </div>
                    <form className="form-button-register-here" autoComplete="off" onSubmit={handleSubmit}>
                        <div className="form">
                            <div className="email">
                                <label className="email2" htmlFor="seller-email">
                                    Email
                                </label>
                                <div className="form-email">
                                    <input
                                        id="seller-email"
                                        type="email"
                                        name="email"
                                        placeholder="Enter email..."
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        required
                                        autoComplete="off"
                                        autoCorrect="off"
                                        autoCapitalize="none"
                                    />
                                </div>
                            </div>
                            <div className="password">
                                <label className="kata-sandi" htmlFor="seller-password">
                                    Password
                                </label>
                                <div className="masukkan-kata-sandi">
                                    <input
                                        id="seller-password"
                                        type="password"
                                        name="password"
                                        placeholder="Enter password..."
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        required
                                        autoComplete="new-password"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="forgot-password-link">
                            <button type="button" onClick={handleForgotPassword} className="link-button">
                                Forgot Password ?
                            </button>
                        </div>
                        <div className="button-register-link">
                            {error ? <div className="text text-error">{error}</div> : null}
                            <ButtonProperty1Default
                                type="submit"
                                text={submitting ? "Logging in..." : "Login"}
                                className="submit-button-instance"
                                disabled={submitting}
                            />
                            <div className="text">
                                <span className="text-span">New to Tokolokal? Create your seller account </span>
                                <Link className="text-span2" to="/seller/register">
                                    here
                                </Link>
                                <span className="text-span">.</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <ConfirmLeaveModal
                isOpen={showConfirmLeave}
                onStay={handleStay}
                onLeave={handleLeave}
                description="You haven't finished logging in. Leave this page and any information you entered will be cleared."
            />
        </div>
    );
};

export { SellerLogin };
export default SellerLogin;



