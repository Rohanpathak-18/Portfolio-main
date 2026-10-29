export default function BrandMark({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      className={`brand-mark ${className}`.trim()}
      fill="none"
      viewBox="0 0 32 32"
    >
      <path
        d="M9 25V7h8a5.5 5.5 0 0 1 0 11H9m8 0 7 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path d="M12 11h5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" />
    </svg>
  );
}
