import "@/assets/styles/components/ConfirmLeaveModal.css";
import { useEffect, useId } from "react";

const ConfirmLeaveModal = ({
    isOpen,
    title = "Leave this page?",
    description = "You haven't saved your new password yet. If you leave now, your changes will be lost.",
    stayLabel = "Stay here",
    leaveLabel = "Leave anyway",
    onStay,
    onLeave,
}) => {
    const titleId = useId();
    const descriptionId = useId();

    useEffect(() => {
        if (!isOpen) {
            return;
        }
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                onStay?.();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onStay]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="confirm-leave-overlay" role="presentation" onClick={onStay}>
            <div
                className="confirm-leave-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
                onClick={(event) => event.stopPropagation()}
            >
                <h2 id={titleId} className="confirm-leave-title">
                    {title}
                </h2>
                <p id={descriptionId} className="confirm-leave-description">
                    {description}
                </p>
                <div className="confirm-leave-actions">
                    <button type="button" className="confirm-leave-button is-primary" onClick={onStay}>
                        {stayLabel}
                    </button>
                    <button type="button" className="confirm-leave-button" onClick={onLeave}>
                        {leaveLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export { ConfirmLeaveModal };
export default ConfirmLeaveModal;

