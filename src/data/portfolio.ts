// ─────────────────────────────────────────────
// PORTFOLIO DATA — Edit everything here!
// ─────────────────────────────────────────────

export const personal = {
  name:        'Veri Marpaung',
  nameShort:   'Veri.marsil',
  role:        'Back-End Developer',
  role2:       'Full-Stack Developer',
  tagline:     'Building reliable, end-to-end web systems — from database architecture to production-ready APIs.',
  description: 'Software Engineering student at Institut Teknologi Del, open to internship and full-time opportunities.',
  status:      'Open to Work',
  location:    'Sumatera Utara, Indonesia',
  degree:      'S.Tr.Kom. — 2026 (Expected)',
  gpa:         '3.71 / 4.0',
  university:  'Institut Teknologi Del',
  email:       'verimarpaung98@gmail.com',
  github:      'https://github.com/VeriMarpaung',
  linkedin:    'https://www.linkedin.com/in/verimarpaung/',
  cv:          '/cv veri - SE-january.pdf',
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
    items: ['PHP', 'Python', 'JavaScript', 'Go', 'Java', 'C'],
  },
  {
    category: 'Database & Backend',
    icon: '🗃',
    items: ['MySQL', 'SQLite', 'MongoDB', 'REST API', 'Microservices'],
  },
  {
    category: 'Frameworks & Libraries',
    icon: '⚡',
    items: ['Laravel', 'React', 'Node.js', 'TensorFlow', 'Keras', 'Scikit-learn'],
  },
  {
    category: 'Tools & Practices',
    icon: '🛠',
    items: ['Git', 'Docker', 'Linux CLI', 'Scrum', 'Agile', 'SDLC'],
  },
];
export const projects = [
  {
    num:    '01',
    title:  'Balige Traditional Market — E-Commerce Platform',
    desc:   'Scalable e-commerce platform for Balige traditional market. Led a team of 5, conducted user research & usability testing, and delivered complete system documentation.',
    tags:   ['Laravel', 'MySQL', 'JavaScript'],
    github: 'https://github.com/VeriMarpaung/Website-Balige-Traditional-Market',
    demo:   '',
    color:  '#1a2a1a',
  },
  {
    num:    '02',
    title:  'Chili Leaf Disease Classification — Deep Learning',
    desc:   'CNN-based image classification using VGG16 transfer learning. Collected 442 custom images, applied augmentation techniques, and achieved 95% validation accuracy.',
    tags:   ['Python', 'TensorFlow', 'VGG16', 'Keras'],
    github: 'https://github.com/VeriMarpaung/Identifikasi-Jenis-Penyakit-Pada-Daun-Cabai---PM-03',
    demo:   '',
    color:  '#1a1a2a',
  },
  {
    num:    '03',
    title:  'Hutanta Coffee — Ordering & Informational Website',
    desc:   'Web platform for Hutanta Coffee with dual-role system (buyer & admin). Features WhatsApp/online ordering, real-time order tracking, and product management.',
    tags:   ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    github: 'https://github.com/VeriMarpaung/Hutanta-Coffee-PA1',
    demo:   '',
    color:  '#2a1a10',
  },
];

export const githubStats = [
  { num: 847,  label: 'Contributions' },
  { num: 24,   label: 'Repositories' },
  { num: 312,  label: 'GitHub Stars' },
  { num: 18,   label: 'Pull Requests' },
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
    date:    'Jun 2025 — Nov 2025',
    title:   'Assistant Project Controller (Intern)',
    company: 'Huawei · XLSmart Project (XL–Smartfren MOCN)',
    desc:    'Coordinated weekly meetings with 30+ subcontractors across South & Central Sumatera. Built Python automation to fetch Google Sheets data, generate Excel reports, and send scheduled email summaries — reducing manual reporting work significantly.',
  },
  {
    date:    'Jan 2025 — Jul 2025',
    title:   'Research Trainee',
    company: 'University of Chicago · System and AI Research Training Program (Remote)',
    desc:    'Selected among top 50 CS students internationally. Led by Prof. Haryadi Gunawi — analyzed 40+ technical papers and reproduced 5 software engineering papers from top conferences.',
  },
  {
    date:    'Oct 2024 — Present',
    title:   'Head of Event Division',
    company: 'HIMATERA — IT Del Software Engineering Student Association',
    desc:    'Led end-to-end organization of major campus events including Welcoming Party, Leadership Inauguration, and technical webinars. Managed stakeholders, venues, budgets, and sponsorships simultaneously.',
  },
  {
    date:    'Dec 2023 — Sep 2024',
    title:   'Co-Mentor',
    company: 'Kewirausahaan Pemuda Danau Toba (KWP) · Kemenko PMK',
    desc:    'Mentored youth entrepreneurs in the Lake Toba Region on managerial, innovation, and marketing aspects. Designed and delivered training programs to help participants start and grow their businesses.',
  },
  {
    date:    'Aug 2022 — Aug 2026',
    title:   'S.Kom — Software Engineering',
    company: 'Institut Teknologi Del · GPA: 3.67 / 4.0',
    desc:    'Focusing on software architecture, web systems, and AI/ML applications. Active in HIMATERA and GDSC. Thesis focus area: scalable backend systems.',
  },
];


export const posts = [
  {
    category: 'Architecture',
    date:     'Feb 2025',
    title:    'When to Use Microservices (And When Not To)',
    excerpt:  'A practical breakdown of when microservices genuinely help vs when they just add complexity that a monolith handles better.',
    href:     '/blog/microservices',
  },
  {
    category: 'Performance',
    date:     'Jan 2025',
    title:    'Optimizing PostgreSQL Queries: My Cheat Sheet',
    excerpt:  'The indexing strategies, EXPLAIN ANALYZE tricks, and N+1 query patterns that cost me hours — so you don\'t lose yours.',
    href:     '/blog/postgresql-optimization',
  },
  {
    category: 'Career',
    date:     'Dec 2024',
    title:    'Building Side Projects While Finishing Your Degree',
    excerpt:  'Honest tips on time management, scope control, and turning academic projects into portfolio pieces recruiters care about.',
    href:     '/blog/side-projects',
  },
];

export const testimonials = [
  {
    text:    'Veri consistently delivered clean, well-documented code. Their ability to understand business requirements and translate them into technical solutions is impressive for someone at this stage of their career.',
    name:    'Budi Wijaya',
    role:    'Senior Engineer · PT. Tech Company',
    initials:'BW',
  },
  {
    text:    'As my thesis student, Veri showed exceptional initiative. The architecture they designed for their capstone project is production-ready and demonstrates deep understanding of distributed systems.',
    name:    'Dr. Rina Sari, M.T.',
    role:    'Thesis Supervisor · Universitas XYZ',
    initials:'DR',
  },
  {
    text:    'Working with Veri on our platform was a great experience. They communicated clearly, hit every deadline, and shipped features that genuinely improved how our team operates.',
    name:    'Fajar Hidayat',
    role:    'Chairman · HMIF Universitas XYZ',
    initials:'FH',
  },
];
