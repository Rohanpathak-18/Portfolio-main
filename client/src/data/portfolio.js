export const profile = {
  name: 'Rohan Kumar Pathak',
  shortName: 'Rohan Pathak',
  role: 'Full Stack Developer',
  location: 'Greater Noida, Uttar Pradesh',
  email: 'rohanpathak9813@gmail.com',
  phone: '+91 63921 29011',
  links: {
    linkedin: 'https://www.linkedin.com/in/rohan-pathak-76367b329/',
    github: 'https://github.com/Rohanpathak-18',
    leetcode: 'https://leetcode.com/u/rohanpathak-18/',
  },
  intro:
    'I build thoughtful digital experiences, reliable web products, and AI-powered tools that make complex things feel simple.',
  bio: 'Computer Science undergraduate with hands-on experience across the MERN stack, real-time applications, and Generative AI. I enjoy taking an idea from its first sketch to a polished, useful product.',
  education: 'B.Tech. in Computer Science and Engineering',
  school: 'IEC College of Engineering and Technology',
  years: '2023 — 2027',
  cgpa: '7.0 / 10',
};

export const projects = [
  {
    number: '01',
    name: 'StudyMate AI',
    category: 'AI LEARNING PLATFORM',
    description:
      'Turn your notes into a study partner. Ask grounded questions, generate quizzes, and make revision flashcards from your own learning materials.',
    stack: ['React', 'FastAPI', 'LangChain', 'FAISS'],
    visual: 'study',
    link: 'https://github.com/Rohanpathak-18/StudyMate-AI',
    demo: 'https://studymate-ai-4ne6.onrender.com/',
    mark: 'S',
  },
  {
    number: '02',
    name: 'LifeLedger',
    category: 'PERSONAL ORGANIZATION',
    description:
      'A private home for the things worth keeping track of: belongings, documents, important dates, warranties, and reminders.',
    stack: ['MERN', 'MongoDB', 'JWT', 'REST API'],
    visual: 'ledger',
    mark: 'L',
    link: 'https://github.com/Rohanpathak-18/LifeLedger.git',
    demo: 'https://lifeledger-rl62.onrender.com/',
  },
  {
    number: '03',
    name: 'ChatSphere',
    category: 'MESSAGING EXPERIENCE',
    description:
      'A secure messaging experience with persistent conversations, authenticated users, and instant updates between connected people.',
    stack: ['React', 'Socket.IO', 'Express', 'MongoDB'],
    visual: 'chat',
    mark: 'C',
    link: 'https://github.com/Rohanpathak-18/ChatSphere.git',
    demo: 'https://chatsphere-web.onrender.com/',
  },
  {
    number: '04',
    name: 'MediBot',
    category: 'RAG HEALTH ASSISTANT',
    description:
      'A RAG-powered assistant that retrieves relevant context to answer health questions through a React and Next.js interface.',
    stack: ['React', 'Next.js', 'RAG', 'Generative AI'],
    visual: 'medibot',
    mark: 'M',
    link: 'https://github.com/Rohanpathak-18/MediBot.git',
    demo: 'https://medibot-web.onrender.com/',
  },
  {
    number: '05',
    name: 'VoteVerse',
    category: 'SECURE VOTING PLATFORM',
    description:
      'A secure voting platform built with the MERN stack, with a focused digital experience for participating in votes.',
    stack: ['MongoDB', 'Express', 'React', 'Node.js'],
    visual: 'voteverse',
    mark: 'V',
    link: 'https://github.com/Rohanpathak-18/VoteVerse.git',
    demo: 'https://voteverse-frontend.onrender.com/',
  },
  {
    number: '06',
    name: 'Star Technovation',
    category: 'TRADING PLATFORM',
    description:
      'A simple trading platform built with the MERN stack, with a straightforward interface for exploring trading workflows.',
    stack: ['MongoDB', 'Express', 'React', 'Node.js'],
    visual: 'star',
    mark: 'ST',
    link: 'https://github.com/Rohanpathak-18/Star-Technovation.git',
    demo: 'https://star-technovation.vercel.app/',
  },
  {
    number: '07',
    name: 'Harmes',
    category: 'AI CONTENT OPERATING SYSTEM',
    description:
      'An AI-powered content operating system for idea discovery, research, planning, script and asset generation, quality checks, approvals, publishing, analytics, and learning. It coordinates specialized agents through provider-independent tools and approval-controlled workflows.',
    stack: ['Agentic AI', 'Content workflows', 'Approvals', 'Analytics'],
    visual: 'harmes',
    mark: 'H',
    link: 'https://github.com/Rohanpathak-18/Harmes_Agent.git',
    demo: 'https://harmes-agent.onrender.com/',
  },
  {
    number: '08',
    name: 'Vitra AI',
    category: 'GEMINI AI ASSISTANT',
    description:
      'A React-based AI assistant that uses the Gemini API to answer user questions.',
    stack: ['React', 'Gemini API'],
    visual: 'vitra',
    mark: 'V',
    link: 'https://github.com/Rohanpathak-18/Vitra.AI.git',
  },
];

export const skills = [
  {
    label: 'Frontend',
    items: ['React', 'JavaScript', 'HTML & CSS', 'Tailwind CSS', 'Bootstrap', 'Axios'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Express.js', 'REST APIs', 'Socket.IO', 'FastAPI'],
  },
  {
    label: 'Data & AI',
    items: ['MongoDB', 'Mongoose', 'MySQL', 'RAG', 'LangChain', 'FAISS'],
  },
  {
    label: 'Foundations',
    items: ['C++', 'Python', 'SQL', 'DSA', 'OOP', 'DBMS', 'Operating Systems'],
  },
];

export const experience = {
  company: 'The Developer Arena',
  role: 'Full Stack Developer Intern',
  dates: 'JUL 2025 — JAN 2026',
  summary:
    'Built reusable React interfaces and connected them to dependable backend services, with AI features woven into the product experience.',
  points: [
    'Created reusable React components and search-driven interfaces.',
    'Built REST APIs with Express, including validation and error handling.',
    'Integrated LLM APIs into backend workflows for intelligent features.',
  ],
};

export const achievements = [
  '200+ LeetCode problems solved',
  'Top 3 — GeeksforGeeks hackathon',
];
