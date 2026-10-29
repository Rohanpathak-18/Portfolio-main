export default function HeroRopes() {
  return (
    <svg
      aria-hidden="true"
      className="hero-ropes"
      preserveAspectRatio="none"
      viewBox="0 0 1440 650"
    >
      <defs>
        <linearGradient id="hero-rope-gradient" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#e23c42" stopOpacity="0" />
          <stop offset="35%" stopColor="#e23c42" stopOpacity="0.65" />
          <stop offset="72%" stopColor="#f07878" stopOpacity="0.48" />
          <stop offset="100%" stopColor="#e23c42" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path
        className="hero-rope rope-one"
        d="M-90 190 C120 40 220 510 470 350 S790 60 990 270 S1310 540 1530 170"
      />
      <path
        className="hero-rope rope-two"
        d="M-100 465 C120 610 280 120 520 225 S850 565 1080 405 S1360 180 1540 340"
      />
      <path
        className="hero-rope rope-three"
        d="M-90 325 C170 500 300 20 590 185 S920 510 1150 300 S1370 80 1530 210"
      />
      <path
        className="hero-rope-highlight highlight-one"
        d="M-90 190 C120 40 220 510 470 350 S790 60 990 270 S1310 540 1530 170"
      />
      <path
        className="hero-rope-highlight highlight-two"
        d="M-100 465 C120 610 280 120 520 225 S850 565 1080 405 S1360 180 1540 340"
      />
      <path
        className="hero-rope-highlight highlight-three"
        d="M-90 325 C170 500 300 20 590 185 S920 510 1150 300 S1370 80 1530 210"
      />
    </svg>
  );
}
