const HumbleiconsShare = ({ className = "", ...props }) => (
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
    <path d="M15 5L21 5L21 11" />
    <path d="M10.5 14.5L21 5" />
    <path d="M10 5H5.5C4.11929 5 3 6.11929 3 7.5V18.5C3 19.8807 4.11929 21 5.5 21H16.5C17.8807 21 19 19.8807 19 18.5V14" />
  </svg>
);

export { HumbleiconsShare };
export default HumbleiconsShare;




