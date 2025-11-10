import "@/assets/styles/pages/Contact.css";
import { Navbar } from "@/components/navigation/Navbar";
import { ButtonProperty1Default } from "@/components/ui/ButtonProperty1Default";

const contactDetails = [
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.6" />
                <path d="M4.5 6.5L12 12.5L19.5 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
        ),
        text: "Logo@gmail.com",
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                    d="M12 21s-6.5-5-6.5-11.2C5.5 6.15 8.41 3 12 3s6.5 3.15 6.5 6.8C18.5 16 12 21 12 21Z"
                    fill="currentColor"
                />
                <circle cx="12" cy="9.5" r="2.2" fill="#ffffff" />
            </svg>
        ),
        text: "Samarinda, East Kalimantan, Indonesia",
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                    d="M8.5 4.5L9.7 7.9C9.82655 8.25583 9.77775 8.65621 9.56618 8.96818L8.3 10.85C9.49426 12.9812 11.0188 14.5057 13.15 15.7L15.0318 14.4338C15.3438 14.2222 15.7442 14.1734 16.1 14.3L19.5 15.5C19.8551 15.6244 20.1392 15.9085 20.2636 16.2636C20.8645 18.0071 18.0071 20.8645 16.2636 20.2636C10.2176 18.1274 5.87256 13.7825 3.73644 7.73644C3.13553 5.99286 5.99286 3.13553 7.73644 3.73644C8.09152 3.86083 8.37561 4.1449 8.5 4.5Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
        text: "+62 81234567890",
    },
];

const Contact = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: integrate with submission backend
    };

    return (
        <div className="halaman-hubungi-kami">
            <Navbar className="hubungi-navbar" />

            <main className="hubungi-container">
                <section className="hubungi-info">
                    <p className="hubungi-subtitle">Let&apos;s</p>
                    <h1 className="hubungi-title">
                        Work
                        <span>Together</span>
                    </h1>
                    <p className="hubungi-description">
                        Partner with us and <strong>grow</strong> your business today.
                    </p>

                    <ul className="hubungi-details">
                        {contactDetails.map((item) => (
                            <li key={item.text} className="hubungi-detail-item">
                                <span className="hubungi-icon">{item.icon}</span>
                                <span>{item.text}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="hubungi-form-shell" aria-label="Contact form">
                    <form className="hubungi-form-card" onSubmit={handleSubmit} autoComplete="off">
                        <label className="hubungi-field" htmlFor="contact-name">
                            <span>Name</span>
                            <input id="contact-name" name="name" type="text" placeholder="Name" />
                        </label>

                        <label className="hubungi-field" htmlFor="contact-email">
                            <span>Email</span>
                            <input id="contact-email" name="email" type="email" placeholder="Email" />
                        </label>

                        <label className="hubungi-field" htmlFor="contact-message">
                            <span>Message</span>
                            <textarea id="contact-message" name="message" placeholder="Message" />
                        </label>

                        <ButtonProperty1Default type="submit" text="Submit" className="hubungi-submit" />
                    </form>
                </section>
            </main>
        </div>
    );
};

export { Contact };
export default Contact;




