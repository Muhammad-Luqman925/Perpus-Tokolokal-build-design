import "@/assets/styles/pages/Chat.css";
import { Navbar } from "@/components/navigation/Navbar";

const BackIcon = ({ className = "", ...props }) => (
    <svg
        className={className}
        viewBox="0 0 13 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        {...props}
    >
        <path
            d="M11.5 21.5L1.5 11.5L11.5 1.5"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const IcRoundPlus = ({ className = "", ...props }) => (
    <svg
        className={className}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        {...props}
    >
        <circle cx="20" cy="20" r="20" fill="#111827" />
        <path
            d="M20 11V29"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
        />
        <path
            d="M11 20H29"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
        />
    </svg>
);

const SendIcon = ({ className = "", ...props }) => (
    <svg
        className={className}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        {...props}
    >
        <path
            d="M4 35L36 20L4 5L4 17.5L22 20L4 22.5L4 35Z"
            fill="#111827"
        />
    </svg>
);

const primaryAvatar = "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=140&q=80";
const secondaryAvatars = [
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
    "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=120&q=80",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
    "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=120&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
];

const Chat = ({ className = "", ...props }) => {
    const rootClassName = ["chat", className].filter(Boolean).join(" ");

    return (
        <div className={rootClassName} {...props}>
            <Navbar className="navigation-bar-instance" />

            <div className="chat__surface">
                <div className="rectangle-137" />

                <div className="frame-427318271">
                    <div className="rectangle-138" />
                    <div className="frame-427318273">
                        <BackIcon className="vector" />
                        <div className="heading-1">Chat</div>
                    </div>
                </div>

                <div className="frame-427318272">
                    <div className="rectangle-1382" />
                    <div className="rectangle-146" />
                    <img className="image-16" src={primaryAvatar} alt="Store.id avatar" />
                    <div className="heading-12">Store.id</div>
                    <div className="heading-13">Online 32 minutes ago</div>

                    <div className="frame-427318278">
                        <div className="heading-14">Okay! we can talk it later, see you.</div>
                        <div className="heading-15">16:00</div>
                    </div>

                    <div className="frame-427318279">
                        <div className="heading-14">Cant wait to discuss, see you!</div>
                        <div className="heading-15">16:03</div>
                    </div>

                    <div className="frame-427318277">
                        <div className="text-and-time">
                            <div className="heading-16">
                                Hi! Thank you so much for your kind reply. I truly appreciate the time and attention you&apos;ve given to respond to my message. It really
                                means a lot to me because good communication is the first step to building mutual understanding. I&apos;m glad we&apos;re able to connect and
                                exchange thoughts in such a positive way. I&apos;m looking forward to continuing this conversation with you, and hopefully finding some common
                                ground where we can work together or simply learn from each other. Thank you for your replies.
                            </div>
                            <div className="heading-17">12:11</div>
                        </div>
                    </div>

                    <div className="typing">
                        <div className="frame-427318280">
                            <IcRoundPlus className="ic-round-plus-instance" />
                        </div>
                        <div className="frame-427318259">
                            <div className="heading-18">Type a message</div>
                        </div>
                        <SendIcon className="iconamoon-send-fill" />
                    </div>

                    <div className="frame-427318281">
                        <div className="heading-19">Today</div>
                    </div>
                </div>

                <div className="message">
                    <img className="image-162" src={secondaryAvatars[0]} alt="Store.id conversation thumbnail" />
                    <div className="text">
                        <div className="name-and-time">
                            <div className="heading-110">Store.id</div>
                            <div className="heading-111">16:03</div>
                        </div>
                        <div className="text-and-bubble-count">
                            <div className="heading-112">Cant wait to discuss, see...</div>
                        </div>
                    </div>
                </div>

                <div className="message2">
                    <img className="image-162" src={secondaryAvatars[1]} alt="Store.id conversation thumbnail" />
                    <div className="text">
                        <div className="name-and-time">
                            <div className="heading-110">Store.id</div>
                            <div className="heading-113">Friday</div>
                        </div>
                        <div className="text-and-bubble-count">
                            <div className="frame-427318274">
                                <div className="heading-114">1</div>
                            </div>
                            <div className="heading-112">Okayy</div>
                        </div>
                    </div>
                </div>

                <div className="message3">
                    <img className="image-162" src={secondaryAvatars[2]} alt="Store.id conversation thumbnail" />
                    <div className="text">
                        <div className="name-and-time">
                            <div className="heading-110">Store.id</div>
                            <div className="heading-115">17/08/2025</div>
                        </div>
                        <div className="text-and-bubble-count">
                            <div className="heading-112">Hi! thankyou for your rep...</div>
                        </div>
                    </div>
                </div>

                <div className="message4">
                    <img className="image-162" src={secondaryAvatars[3]} alt="Store.id conversation thumbnail" />
                    <div className="text">
                        <div className="name-and-time">
                            <div className="heading-110">Store.id</div>
                            <div className="heading-116">02/02/2025</div>
                        </div>
                        <div className="text-and-bubble-count">
                            <div className="frame-427318274">
                                <div className="heading-114">2</div>
                            </div>
                            <div className="heading-112">Hi! thankyou for your rep...</div>
                        </div>
                    </div>
                </div>

                <div className="message5">
                    <img className="image-162" src={secondaryAvatars[4]} alt="Store.id conversation thumbnail" />
                    <div className="text">
                        <div className="name-and-time">
                            <div className="heading-110">Store.id</div>
                            <div className="heading-117">01/10/2024</div>
                        </div>
                        <div className="text-and-bubble-count">
                            <div className="frame-427318274">
                                <div className="heading-114">1</div>
                            </div>
                            <div className="heading-112">Hi! thankyou for your rep...</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;




