import "@/assets/styles/pages/Register.css";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ButtonProperty1Default } from "@/components/ui/ButtonProperty1Default";
import ConfirmLeaveModal from "../components/ConfirmLeaveModal";

const CONTACT_OPTIONS = [
    {
        id: "email",
        label: "Use Email",
        fieldLabel: "Email",
        placeholder: "Insert email . . .",
        type: "email",
    },
    {
        id: "phone",
        label: "Use Phone Numbers",
        fieldLabel: "Phone Numbers",
        placeholder: "Insert phone numbers . . .",
        type: "tel",
    },
];

const Register = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [contactMethod, setContactMethod] = useState(() => {
        const incoming = location.state?.contactMethod || location.state?.mode;
        if (incoming === "email") {
            return "email";
        }
        return "phone";
    });
    const [showConfirmLeave, setShowConfirmLeave] = useState(false);

    useEffect(() => {
        const incoming = location.state?.contactMethod || location.state?.mode;
        if (incoming === "email" || incoming === "phone") {
            setContactMethod(incoming);
        }
    }, [location.state]);

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate("/seller/login");
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

    const activeOption = CONTACT_OPTIONS.find((option) => option.id === contactMethod) ?? CONTACT_OPTIONS[0];

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
                    <div className="seller-register-card__toggle" role="tablist" aria-label="Choose registration method">
                        {CONTACT_OPTIONS.map((option) => (
                            <button
                                key={option.id}
                                type="button"
                                className={contactMethod === option.id ? "is-active" : ""}
                                aria-selected={contactMethod === option.id}
                                onClick={() => setContactMethod(option.id)}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </header>

                <form className="seller-register-card__form" autoComplete="off" onSubmit={handleSubmit}>
                    <label className="seller-register-field" htmlFor={`register-${activeOption.id}`}>
                        <span>{activeOption.fieldLabel}</span>
                        <input
                            id={`register-${activeOption.id}`}
                            name={activeOption.id}
                            type={activeOption.type}
                            placeholder={activeOption.placeholder}
                            autoComplete="off"
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

                    <ButtonProperty1Default type="submit" text="Register" className="seller-register-card__submit" />
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
