import "@/assets/styles/pages/ShippingDetails.css";

const DEFAULT_TIMELINE = [
  {
    id: "order-confirmed",
    title: "Order Confirmed",
    description: "Your order has been confirmed and is being prepared",
    timestamp: "20 Sep 2025, 14:30",
    icon: "check",
    state: "completed",
  },
  {
    id: "package-prepared",
    title: "Package Prepared",
    description: "Your package is being prepared for shipment",
    timestamp: "20 Sep 2025, 16:45",
    icon: "box",
    state: "completed",
  },
  {
    id: "in-transit",
    title: "In Transit",
    description: "Your package is on the way to your location",
    timestamp: "21 Sep 2025, 08:20",
    icon: "truck",
    state: "upcoming",
  },
  {
    id: "out-for-delivery",
    title: "Out for Delivery",
    description: "Your package is out for delivery",
    timestamp: "Estimated : 22 September 2025, 10:00 - 18:00",
    icon: "pin",
    state: "upcoming",
  },
];

const iconMap = {
  check: (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M7.2 10.3L9.1 12.1L12.8 8.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  box: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 7L12 3L20 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 7V17L12 21L20 17V7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 12L4 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 8L12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  truck: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3 7H15V17H3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 10H19L21 13V17H15V10Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="18" r="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="18" r="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 12C13.66 12 15 10.66 15 9C15 7.34 13.66 6 12 6C10.34 6 9 7.34 9 9C9 10.66 10.34 12 12 12Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M5 9C5 12.87 8.13 17.01 12 21C15.87 17.01 19 12.87 19 9C19 5.13 15.87 2 12 2C8.13 2 5 5.13 5 9Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

const getIcon = (name) => iconMap[name] ?? iconMap.check;

const resolveState = (step, index, completedCount, total) => {
  if (step.state) {
    return step.state;
  }
  if (index < completedCount) {
    return "completed";
  }
  if (index === completedCount && completedCount !== total) {
    return "current";
  }
  return "upcoming";
};

export const ShippingDetails = ({ order, timeline = DEFAULT_TIMELINE, onClose }) => {
  const steps = timeline.length ? timeline : DEFAULT_TIMELINE;
  const completedCount = steps.filter((item) => item.state === "completed").length;
  const progressPercent = steps.length ? Math.max((completedCount / steps.length) * 100, 5) : 0;

  return (
    <div className="shipping-details">
      <header className="shipping-details__header">
        <div>
          <span className="shipping-details__label">Shipping Details</span>
          <h2>Order #{order?.id ?? "-"}</h2>
        </div>
        {onClose ? (
          <button
            type="button"
            className="shipping-details__close"
            onClick={onClose}
            aria-label="Close shipping details"
          >
            ×
          </button>
        ) : null}
      </header>

      <section className="shipping-details__progress">
        <div className="shipping-details__progress-header">
          <span>Progress</span>
          <span>
            {completedCount} of {steps.length} completed
          </span>
        </div>
        <div className="shipping-details__progress-bar">
          <span className="shipping-details__progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </section>

      <ul className="shipping-details__steps">
        {steps.map((step, index) => {
          const state = resolveState(step, index, completedCount, steps.length);
          return (
            <li key={step.id ?? step.title} className={`shipping-step shipping-step--${state}`}>
              <div className="shipping-step__icon">{getIcon(step.icon)}</div>
              <div className="shipping-step__content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                {step.timestamp ? <time>{step.timestamp}</time> : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ShippingDetails;













