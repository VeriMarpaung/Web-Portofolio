# Portfolio — Veri Marsil Marpaung

Personal portfolio website built with **Astro**, **React**, and **Tailwind CSS**.

## Tech Stack

- **Astro 4** — Framework utama, zero-JS by default
- **React 18** — Untuk komponen interaktif (GitHub activity, Contact form)
- **Tailwind CSS** — Utility-first styling
- **TypeScript** — Type safety di seluruh codebase
- **Netlify** — Hosting & auto-deploy

## Fitur

- Dark / Light mode toggle (disimpan di localStorage)
- Custom animated cursor dengan smooth follower
- Scroll reveal animations di setiap section
- Animated GitHub contribution graph
- Animated stat counters
- Fully responsive (mobile-first)
- SEO ready — meta tags, OG tags, semantic HTML
- SSG (Static Site Generation) — semua halaman jadi HTML statis saat build

## Struktur Project

```
src/
├── components/
│   ├── Cursor.astro
│   ├── Navbar.astro
│   ├── Footer.astro
│   ├── Hero.astro
│   ├── About.astro
│   ├── Skills.astro
│   ├── Projects.astro
│   ├── GithubActivity.tsx   (React)
│   ├── Experience.astro
│   ├── Blog.astro
│   ├── Testimonials.astro
│   └── Contact.tsx          (React)
├── data/
│   └── portfolio.ts         <- Edit semua konten di sini
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro
│   └── blog/
│       └── index.astro
└── styles/
    └── global.css
```

## Quick Start

```bash
# Install dependencies
npm install

# Jalankan dev server
npm run dev

# Build untuk production
npm run build

# Preview hasil build
npm run preview
```

Buka [http://localhost:4321](http://localhost:4321) di browser.

## Kustomisasi Konten

Semua konten ada di satu file:

```
src/data/portfolio.ts
```

Edit bagian berikut sesuai data kamu:

- `personal` — nama, role, email, social links, CV
- `skills` — tech stack per kategori
- `projects` — project dengan link GitHub dan demo
- `githubStats` — statistik GitHub kamu
- `experience` — pengalaman kerja dan pendidikan
- `posts` — artikel blog
- `testimonials` — testimoni dari rekan/dosen

## Menambah Foto

Taruh file foto di `/public/photo.jpg`, lalu di `About.astro` ganti placeholder dengan:

```astro
<img
  src="/photo.jpg"
  alt="Veri Marsil Marpaung"
  class="w-full h-full object-cover object-top"
/>
```

## Deploy ke Netlify

1. Push repo ke GitHub
2. Login ke [netlify.com](https://netlify.com)
3. New site → Import from GitHub → pilih repo ini
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy

Setiap `git push` ke branch `main` akan trigger auto-deploy di Netlify.

## Update Portfolio

```bash
# Edit src/data/portfolio.ts
# Lalu:
git add .
git commit -m "update: deskripsi perubahan"
git push
# Netlify otomatis rebuild dalam ~1 menit
```