# Portfolio - Veri Marsil Marpaung

Personal portfolio website built with Astro, React, and Tailwind CSS.  
Project ini sekarang sudah memakai data real untuk GitHub Activity, integrasi artikel Medium, dan serverless function untuk contact form.

## Stack

- Astro 5
- React 18
- Tailwind CSS
- TypeScript
- Netlify Functions

## Ringkasan Update Terbaru

- GitHub Activity tidak lagi dummy: menampilkan stats, repositories, dan public events dari GitHub API.
- Contribution calendar 12 bulan: prioritas dari GitHub GraphQL (jika token tersedia), fallback ke mode public di local/dev.
- Contact form sudah terhubung ke backend serverless (`netlify/functions/contact.mjs`) dengan provider Resend.
- Blog section bisa ambil artikel terbaru dari Medium (`personal.medium`), dengan fallback ke data lokal di `posts`.
- Route blog detail lokal sudah tersedia di `src/pages/blog/[slug].astro`.
- Konsistensi theme/accent dan beberapa perapihan UI sudah disinkronkan.
- Section testimonials saat ini dinonaktifkan di halaman utama (komponen tetap ada untuk dipakai lagi kapan pun).

## Fitur

- Dark/light mode (persist ke localStorage)
- Custom animated cursor
- Scroll reveal animation
- GitHub activity real data (stats, repos, events)
- Contribution calendar 12 bulan (token mode + public fallback)
- Contact form via Netlify Function + Resend
- Blog feed Medium + fallback local posts
- Fully responsive (mobile-first)
- SEO-ready metadata
- Static Site Generation untuk halaman Astro

## Struktur Project

```text
src/
  components/
    GithubActivity.tsx
    Contact.tsx
    Blog.astro
    Testimonials.astro
    ...
  data/
    portfolio.ts
  lib/
    blog.ts
  layouts/
    BaseLayout.astro
  pages/
    index.astro
    blog/
      index.astro
      [slug].astro
  styles/
    global.css

netlify/
  functions/
    github-activity.mjs
    contact.mjs
```

## Menjalankan Project

```bash
npm install
```

### Mode Frontend Biasa

```bash
npm run dev
```

### Mode Full (dengan Netlify Functions)

Gunakan ini saat ingin mengetes endpoint serverless lokal:

```bash
npx netlify dev
```

### Build Production

```bash
npm run build
npm run preview
```

## Environment Variables

Template env tersedia di `.env.example`.

```env
GITHUB_TOKEN=
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>
```

Penjelasan:

- `GITHUB_TOKEN`: dipakai untuk GraphQL contribution calendar agar data heatmap 12 bulan lebih akurat.
- `RESEND_API_KEY`: API key Resend untuk kirim email dari contact form.
- `CONTACT_TO_EMAIL`: email tujuan pesan masuk.
- `CONTACT_FROM_EMAIL`: sender email yang sudah diverifikasi di Resend.

Catatan fallback:

- Tanpa `GITHUB_TOKEN`, komponen GitHub tetap jalan dalam public mode.
- Tanpa konfigurasi Resend, contact form akan fallback membuka mail app (mailto).

## Kustomisasi Konten

Edit data utama di:

```text
src/data/portfolio.ts
```

Field yang paling sering diubah:

- `personal` (nama, role, email, links, CV)
- `personal.medium` (contoh: `https://medium.com/@username`)
- `skills`
- `projects`
- `experience`
- `posts` (fallback blog lokal)

## Deploy ke Netlify

1. Push project ke GitHub.
2. Login ke Netlify.
3. Import repository dari GitHub.
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Tambahkan Environment Variables di Netlify Site Settings.
6. Deploy.

Setiap push ke branch deploy (mis. `main`) akan trigger auto-deploy.

## Workflow Setelah Update (Push ke GitHub)

```bash
git add .
git commit -m "docs: update project documentation after feature upgrades"
git push origin main
```

Jika branch kerja Anda bukan `main`, ganti nama branch di command push.