function ProjectArtwork({ visual }) {
  const scenes = {
    study: (
      <>
        <rect x="30" y="28" width="180" height="122" rx="10" />
        <path d="M47 53h78M47 66h58M47 93h143M47 106h120" />
        <circle cx="165" cy="56" r="18" />
        <path d="m159 56 4 4 8-9" />
      </>
    ),
    ledger: (
      <>
        <rect x="38" y="27" width="164" height="126" rx="10" />
        <path d="M38 61h164M62 27v126" />
        <rect x="76" y="76" width="44" height="30" rx="4" />
        <rect x="133" y="76" width="48" height="30" rx="4" />
        <path d="M77 122h94" />
      </>
    ),
    chat: (
      <>
        <rect x="30" y="30" width="180" height="116" rx="12" />
        <path d="M48 54h78v24H48zM116 91h75v24h-75zM48 108h42" />
        <circle cx="57" cy="66" r="3" />
        <circle cx="125" cy="103" r="3" />
      </>
    ),
    medibot: (
      <>
        <path d="M120 27v17M85 47h70a14 14 0 0 1 14 14v48a14 14 0 0 1-14 14h-70a14 14 0 0 1-14-14V61a14 14 0 0 1 14-14Z" />
        <circle cx="99" cy="79" r="5" />
        <circle cx="141" cy="79" r="5" />
        <path d="M97 99h46M120 116v20m-22 0h44" />
      </>
    ),
    voteverse: (
      <>
        <path d="M52 37h136v105H52zM71 58h98v58H71z" />
        <path d="m94 88 15 14 35-34" />
        <path d="M91 142v12m58-12v12" />
      </>
    ),
    star: (
      <>
        <path d="M35 132h175M50 120l34-35 27 17 48-55" />
        <path d="M145 47h14v14" />
        <circle cx="84" cy="85" r="4" />
        <circle cx="111" cy="102" r="4" />
        <path d="M50 139v-14m26 14v-26m26 26v-20m26 20v-39m26 39V83m26 56v-64" />
      </>
    ),
    harmes: (
      <>
        <rect x="32" y="32" width="70" height="42" rx="7" />
        <rect x="138" y="32" width="70" height="42" rx="7" />
        <rect x="85" y="112" width="70" height="42" rx="7" />
        <path d="M102 53h36M67 74v18h53v20m69-38v18h-69" />
        <circle cx="120" cy="53" r="5" />
      </>
    ),
    vitra: (
      <>
        <circle cx="120" cy="85" r="48" />
        <path d="M120 53v64m-32-32h64M97 62l46 46m0-46-46 46" />
        <circle cx="120" cy="85" r="12" />
      </>
    ),
  };

  return (
    <svg
      className="project-illustration"
      viewBox="0 0 240 180"
      role="img"
      aria-label={`${visual} project illustration`}
    >
      <defs>
        <linearGradient id={`glow-${visual}`} x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="currentColor" stopOpacity=".3" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle
        cx="120"
        cy="88"
        r="74"
        fill={`url(#glow-${visual})`}
        stroke="currentColor"
        strokeOpacity=".18"
      />
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {scenes[visual]}
      </g>
    </svg>
  );
}

export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className={`project-art art-${project.visual}`} aria-hidden="true">
        <div className="art-top">
          <span>RP / DIGITAL WORK</span>
          <span>SELECTED WORK</span>
        </div>
        <ProjectArtwork visual={project.visual} />
        <span className="art-caption">{project.category}</span>
      </div>
      <div className="project-meta">
        <div>
          <span className="eyebrow">
            {project.number} / {project.category}
          </span>
          <h3>{project.name}</h3>
        </div>
        <div className="project-actions">
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer">
              GITHUB
            </a>
          )}
          {project.demo && (
            <>
              <span className="project-live-label">LIVE &gt;</span>
              <a
                className="round-link"
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${project.name} live demo`}
              >
                &gt;
              </a>
            </>
          )}
        </div>
      </div>
      <p className="project-description">{project.description}</p>
      <div className="tag-list">
        {project.stack.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </article>
  );
}
