const IonSearch = ({ className = "", ...props }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <circle cx="11" cy="11" r="6.5" />
    <path d="M20 20L16.3 16.3" />
  </svg>
);

export { IonSearch };
export default IonSearch;




