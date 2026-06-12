// ─────────────────────────────────────────────
// PORTFOLIO DATA — Edit everything here!
// ─────────────────────────────────────────────

export const personal = {
  name:        'Veri Marpaung',
  nameShort:   'Veri.marsil',
  role:        'Back-End Developer',
  role2:       'Full-Stack Developer',
  tagline:     'Building reliable, scalable backend systems — from microservices and API gateways to production-ready, containerized services.',
  description: 'Final-year Software Engineering student at Institut Teknologi Del (graduating 2026), open to software engineering and backend roles.',
  status:      'Open to Work',
  location:    'Sumatera Utara, Indonesia',
  degree:      'S.Tr.Kom. — 2026 (Expected)',
  gpa:         '3.71 / 4.0',
  university:  'Institut Teknologi Del',
  email:       'verimarpaung98@gmail.com',
  github:      'https://github.com/VeriMarpaung',
  linkedin:    'https://www.linkedin.com/in/verimarpaung/',
  medium:      'https://medium.com/@verimarpaung98',
  cv:          '/CV_Veri Marpaung_Backend.pdf',
  semester:    8,
};

// export const skills = [
//   {
//     category: 'Frontend',
//     icon: '⚡',
//     items: ['React', 'Next.js', 'Astro', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
//   },
//   {
//     category: 'Backend',
//     icon: '🛠',
//     items: ['Node.js', 'Express', 'Laravel', 'Go', 'REST API', 'GraphQL'],
//   },
//   {
//     category: 'Database',
//     icon: '🗃',
//     items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Prisma'],
//   },
//   {
//     category: 'DevOps & Tools',
//     icon: '☁️',
//     items: ['Docker', 'GitHub Actions', 'Vercel', 'AWS (EC2, S3)', 'Linux', 'Nginx'],
//   },
// ];
export const skills = [
  {
    category: 'Languages',
    icon: '💻',
    items: ['PHP', 'Java', 'Go', 'Python', 'JavaScript', 'C'],
  },
  {
    category: 'Backend & Frameworks',
    icon: '⚡',
    items: ['Laravel', 'Spring Boot', 'Node.js', 'Flask', 'React'],
  },
  {
    category: 'Database',
    icon: '🗃',
    items: ['MySQL', 'PostgreSQL', 'Redis', 'MongoDB'],
  },
  {
    category: 'Tools & Practices',
    icon: '🛠',
    items: ['Docker', 'Git', 'JWT', 'API Gateway', 'Microservices', 'REST API', 'Scrum'],
  },
];
export const projects = [
  {
    num:     '01',
    title:   'TAPATUPA — Multi-Tenant Microservices Platform',
    desc:    'Final-year thesis: a multi-tenant microservices ecosystem with a centralized Laravel API Gateway enforcing strict tenant isolation, a dedicated JWT auth service for session governance, and Redis-backed rate limiting for resilience under high traffic.',
    tags:    ['Laravel', 'Microservices', 'API Gateway', 'JWT', 'Redis'],
    github:  '',
    demo:    '',
    ongoing: true,
    color:   '#10212a',
  },
  {
    num:    '02',
    title:  'StockFlow — Real-Time Inventory Management',
    desc:   'Concurrency-safe stock engine that prevents overselling via optimistic locking (atomic version-guarded UPDATE returning HTTP 409 on stale writes). Event-driven pipeline across 5 containerized services with a write-through Redis cache and 40+ feature tests written test-first.',
    tags:   ['Laravel', 'Next.js', 'PostgreSQL', 'Redis', 'Docker'],
    github: 'https://github.com/VeriMarpaung/StockFlow',
    demo:   '',
    ongoing: false,
    color:  '#1a2a1a',
  },
  {
    num:    '03',
    title:  'Balige Traditional Market — E-Commerce Platform',
    desc:   'Full-scale e-commerce platform delivered end-to-end while leading a team of 5. Owned backend business logic via Laravel MVC and designed optimized MySQL schemas for inventory, cart state, and order processing.',
    tags:   ['Laravel', 'MySQL', 'JavaScript'],
    github: 'https://github.com/VeriMarpaung/Website-Balige-Traditional-Market',
    demo:   '',
    ongoing: false,
    color:  '#2a1a10',
  },
  {
    num:    '04',
    title:  'Chili Leaf Disease Classification — Deep Learning',
    desc:   'CNN-based image classification using VGG16 transfer learning. Collected 442 custom images, applied augmentation techniques, and achieved 95% validation accuracy.',
    tags:   ['Python', 'TensorFlow', 'VGG16', 'Keras'],
    github: 'https://github.com/VeriMarpaung/Identifikasi-Jenis-Penyakit-Pada-Daun-Cabai---PM-03',
    demo:   '',
    ongoing: false,
    color:  '#1a1a2a',
  },
  {
    num:    '05',
    title:  'Hutanta Coffee — Ordering & Informational Website',
    desc:   'Web platform for Hutanta Coffee with a dual-role system (buyer & admin). Features WhatsApp/online ordering, real-time order tracking, and product management.',
    tags:   ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    github: 'https://github.com/VeriMarpaung/Hutanta-Coffee-PA1',
    demo:   '',
    ongoing: false,
    color:  '#2a1410',
  },
];

// export const experience = [
//   {
//     date:    'Jun 2024 — Dec 2024',
//     title:   'Full-Stack Developer Intern',
//     company: 'PT. Tech Company · Jakarta (Hybrid)',
//     desc:    'Developed and maintained 3 client-facing web applications using React and Node.js. Improved API response time by 40% through database query optimization and Redis caching.',
//   },
//   {
//     date:    'Mar 2023 — Jun 2024',
//     title:   'Lead Developer — Himpunan Mahasiswa',
//     company: 'Student Organization · Campus',
//     desc:    'Led a team of 5 developers to build and maintain the department\'s official website. Organized 2 developer workshops for 100+ attendees.',
//   },
//   {
//     date:    '2021 — Present',
//     title:   'S.Kom — Software Engineering',
//     company: 'Universitas XYZ · GPA: 3.8 / 4.0',
//     desc:    'Focusing on software architecture, distributed systems, and human-computer interaction. Thesis: "Microservices Architecture in Scalable Academic Systems".',
//   },
// ];

export const experience = [
  {
    date:    'May 2025 — Present',
    title:   'Java Developer Intern',
    company: 'Jatis Solutions · Jakarta',
    desc:    'Developing and maintaining enterprise backend services with Java, Spring Boot, and Grails. Writing unit and integration tests to safeguard code quality, and supporting performance optimization and refactoring of existing applications.',
  },
  {
    date:    'Jun 2025 — Dec 2025',
    title:   'Assistant Project Controller Intern',
    company: 'Huawei Tech Investment · Palembang',
    desc:    'Oversaw the project lifecycle across 2,000+ sites in two regions and coordinated 25 subcontractors across South & North Sumatera. Maintained Huawei\'s ISDP system and built a Python automation that pulls Google Sheets data, generates Excel reports, and sends scheduled email summaries to stakeholders.',
  },
  {
    date:    'Jan 2025 — Jul 2025',
    title:   'Research Trainee — Garuda Ace 2.0',
    company: 'University of Chicago · System & AI Research Program (Remote)',
    desc:    'Selected among the top 50 CS students internationally for a program led by Prof. Haryadi Gunawi. Critically evaluated 40+ software engineering papers from top-tier conferences and reproduced 5 technical studies, identifying reproducibility gaps.',
  },
  {
    date:    'Oct 2024 — Jun 2025',
    title:   'Head of Event Division',
    company: 'HIMATERA — IT Del Software Engineering Student Association',
    desc:    'Directed end-to-end execution of technical webinars and inauguration events, meeting strict deadlines while securing internal and external sponsorships and managing stakeholders, venues, and budgets.',
  },
  {
    date:    'Dec 2023 — Sep 2024',
    title:   'Co-Mentor — KWP Program',
    company: 'Kewirausahaan Pemuda Danau Toba · Kemenko PMK',
    desc:    'Coached 20+ youth entrepreneurs in the Lake Toba region, delivering training programs focused on managerial competence, innovation, and marketing execution.',
  },
  {
    date:    'Sep 2023 — Aug 2024',
    title:   'Member',
    company: 'Google Developer Student Club (GDSC) · IT Del',
    desc:    'Contributed to peer-led projects applying Google technologies to real-world problems and deepened practical skills through intensive coding workshops and build sessions.',
  },
  {
    date:    'Aug 2022 — Jul 2026 (Expected)',
    title:   'S.Tr.Kom — Software Engineering Technology',
    company: 'Institut Teknologi Del · GPA: 3.71 / 4.0',
    desc:    'Bachelor of Applied Science focusing on backend development, distributed systems, and server-side architecture. Active in HIMATERA and GDSC, with a thesis on multi-tenant microservices.',
  },
];


// Fallback for the Blog section. Live posts are pulled from the Medium feed
// (see src/lib/blog.ts); these only render if that fetch fails. Keep them in
// sync with real published articles so the offline fallback stays honest.
export const posts = [
  {
    category: 'Software Engineering',
    date:     'Feb 2026',
    title:    'Aku Bikin Portfolio Pakai AI dan Nggak Malu Ngakuinnya',
    excerpt:  'Cerita jujur membangun portfolio dari nol dengan bantuan AI — bagian yang berhasil, yang memalukan, dan kenapa transparan soal pakai AI justru jadi pilihan yang lebih kuat.',
    href:     'https://medium.com/@verimarpaung98/aku-bikin-portfolio-pakai-ai-dan-nggak-malu-ngakuinnya-8ad66caabc62',
  },
];
