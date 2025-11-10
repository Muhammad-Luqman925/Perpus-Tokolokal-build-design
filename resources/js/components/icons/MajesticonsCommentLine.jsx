const MajesticonsCommentLine = ({ className = "", ...props }) => (
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
    <path d="M5 20L5 16.5C3.34315 16.5 2 15.1569 2 13.5L2 7.5C2 5.01472 4.01472 3 6.5 3L17.5 3C19.9853 3 22 5.01472 22 7.5V13.5C22 15.9853 19.9853 18 17.5 18H9.5L5 20Z" />
    <path d="M8 8.5H16" />
    <path d="M8 12H13.5" />
  </svg>
);

export { MajesticonsCommentLine };
export default MajesticonsCommentLine;




