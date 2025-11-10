import "@/assets/styles/pages/Register.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonProperty1Default } from "@/components/ui/ButtonProperty1Default";
import ConfirmLeaveModal from "../components/ConfirmLeaveModal";
import SellerAuthAPI from "@/core/api/sellerAuth.api";

const Register = () => {
    const navigate = useNavigate();
    const [showConfirmLeave, setShowConfirmLeave] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const storeName = (formData.get("store_name") || "").trim();
        const email = (formData.get("email") || "").trim();
        const password = (formData.get("password") || "").trim();
        const confirmPassword = (formData.get("confirmPassword") || "").trim();

        if (!email || !password || !confirmPassword) {
            alert("Please fill in all required fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Password and confirmation do not match.");
            return;
        }

        const payload = {
            store_name: storeName || null,
            email,
            password,
        };

        setIsSubmitting(true);
        try {
            await SellerAuthAPI.register(payload);
            alert("Registration successful! Please login.");
            navigate("/admin/login");
        } catch (error) {
            const backendErrors = error.response?.data?.errors;
            const firstError =
                (backendErrors && Object.values(backendErrors)[0]?.[0]) ||
                error.response?.data?.message ||
                "Failed to register seller.";
            alert(firstError);
        } finally {
            setIsSubmitting(false);
        }
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

    return (
        <div className="seller-register-page">
            <button type="button" className="close-button" aria-label="Close" onClick={handleClose}>
                &times;
            </button>
            <section className="seller-register-page__intro">
                <Link to="/" className="seller-register-page__logo-link" aria-label="Back to Tokolokal homepage">
                    <img className="seller-register-page__logo" src="/img/logo.png" alt="Tokolokal" loading="lazy" />
                </Link>
                <p className="seller-register-page__description">
                    Grow your store with Tokolokal. Start now in just a few simple steps.
                </p>
            </section>

            <section className="seller-register-card" aria-label="Register your Tokolokal store">
                <header className="seller-register-card__header">
                    <h2>Register Your Store</h2>
                </header>

                <form className="seller-register-card__form" autoComplete="off" onSubmit={handleSubmit}>
                    <label className="seller-register-field" htmlFor="register-store-name">
                        <span>Store Name</span>
                        <input
                            id="register-store-name"
                            name="store_name"
                            type="text"
                            placeholder="Enter your store name..."
                            autoComplete="off"
                        />
                    </label>
                    <label className="seller-register-field" htmlFor="register-email">
                        <span>Email</span>
                        <input
                            id="register-email"
                            name="email"
                            type="email"
                            placeholder="Insert email..."
                            autoComplete="off"
                            required
                        />
                    </label>

                    <label className="seller-register-field" htmlFor="register-password">
                        <span>Password</span>
                        <input
                            id="register-password"
                            type="password"
                            name="password"
                            placeholder="Insert password . . ."
                            autoComplete="new-password"
                        />
                    </label>

                    <label className="seller-register-field" htmlFor="register-confirm-password">
                        <span>Re-enter Password</span>
                        <input
                            id="register-confirm-password"
                            type="password"
                            name="confirmPassword"
                            placeholder="Insert password . . ."
                            autoComplete="new-password"
                        />
                    </label>

                    <ButtonProperty1Default
                        type="submit"
                        text={isSubmitting ? "Registering..." : "Register"}
                        className="seller-register-card__submit"
                        disabled={isSubmitting}
                    />
                </form>
            </section>

            <ConfirmLeaveModal
                isOpen={showConfirmLeave}
                onStay={handleStay}
                onLeave={handleLeave}
                description="You haven't finished registering your store yet. Leave the page and your information will be lost."
            />
        </div>
    );
};

export { Register };
export default Register;
