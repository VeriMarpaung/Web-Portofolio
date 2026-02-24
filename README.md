# 🚀 Portfolio — Astro + React + Tailwind CSS

> Personal portfolio website for Software Engineering students & developers.
> Built with **Astro 4**, **React 18**, **Tailwind CSS**, and **TypeScript**.

![Astro](https://img.shields.io/badge/Astro-4.5-orange?logo=astro)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178c6?logo=typescript)
![Deploy](https://img.shields.io/badge/Deploy-Netlify-00c7b7?logo=netlify)

---

## 📋 Daftar Isi

- [Demo & Preview](#-demo--preview)
- [Fitur](#-fitur)
- [Tech Stack](#-tech-stack)
- [Struktur Project](#-struktur-project)
- [Cara Kerja Project](#-cara-kerja-project)
- [Quick Start](#-quick-start)
- [Kustomisasi Konten](#-kustomisasi-konten)
- [Menambah Halaman Baru](#-menambah-halaman-baru)
- [Deploy ke Netlify](#-deploy-ke-netlify)
- [Konfigurasi Domain Custom](#-konfigurasi-domain-custom)
- [FAQ & Troubleshooting](#-faq--troubleshooting)
- [Checklist Sebelum Launch](#-checklist-sebelum-launch)

---

## 🎨 Demo & Preview

| Mode | Tampilan |
|------|----------|
| 🌙 Dark (default) | Background hitam pekat `#0a0a0a`, accent hijau `#7fff6e` |
| ☀️ Light | Background off-white `#f8f8f5`, accent hijau gelap `#1a7a10` |

**Sections yang tersedia:**
`Hero` → `About` → `Skills` → `Projects` → `GitHub Activity` → `Experience` → `Blog` → `Testimonials` → `Contact`

---

## ✨ Fitur

### UI & Interaksi
- 🌙 **Dark / Light mode toggle** — pilihan disimpan di `localStorage`, persist setelah refresh
- 🖱️ **Custom animated cursor** — dot + follower dengan smooth lerp interpolation
- ✨ **Scroll reveal animations** — setiap section fade + slide-up saat masuk viewport
- 📊 **Animated stat counters** — angka GitHub count-up dengan easing cubic saat di-scroll

### Performa
- ⚡ **Zero-JS by default** — Astro render semua section sebagai HTML statis
- 🏝️ **Islands Architecture** — React hanya dimuat untuk komponen interaktif (`client:visible`)
- 🔤 **Font optimization** — Google Fonts dengan `preconnect` dan `display=swap`
- 🖼️ **Lazy loading** — komponen berat hanya dimuat saat dibutuhkan

### Developer Experience
- 🔷 **TypeScript** — seluruh data dan komponen React menggunakan strict typing
- 📁 **Single source of truth** — semua konten di satu file `portfolio.ts`
- 🧩 **Komponen modular** — setiap section adalah file terpisah, mudah diedit
- 📱 **Fully responsive** — mobile-first, breakpoint di 768px

### SEO & Aksesibilitas
- 🔍 **Meta tags & OG tags** — siap untuk sharing di sosial media
- ♿ **Semantic HTML** — heading hierarchy yang benar, aria-labels
- 🗺️ **SSG (Static Site Generation)** — semua halaman jadi HTML murni saat build

---

## 🛠 Tech Stack

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| [Astro](https://astro.build) | ^4.5 | Framework utama, SSG, routing |
| [React](https://react.dev) | ^18.2 | Komponen interaktif (form, counter) |
| [Tailwind CSS](https://tailwindcss.com) | ^3.4 | Utility-first styling |
| [TypeScript](https://typescriptlang.org) | ^5.4 | Type safety untuk data & komponen |
| [Netlify](https://netlify.com) | — | Hosting & CD (Continuous Deployment) |

**Kenapa stack ini?**

Astro dipilih karena filosofinya cocok untuk portfolio: *ship less JavaScript*. Berbeda dengan Next.js atau Vite+React yang mengirim seluruh framework ke browser, Astro hanya mengirim HTML dan CSS murni kecuali untuk bagian yang benar-benar butuh JavaScript. Hasilnya: loading lebih cepat, SEO lebih baik, dan Lighthouse score lebih tinggi.

---

## 📁 Struktur Project

```
astro-portfolio/
│
├── public/                     # File statis (langsung di-serve tanpa proses build)
│   ├── favicon.svg             # Icon tab browser
│   ├── photo.jpg               # ← Taruh foto kamu di sini (perlu ditambah manual)
│   └── cv-namakamu.pdf         # ← Taruh file CV kamu di sini (perlu ditambah manual)
│
├── src/
│   ├── data/
│   │   └── portfolio.ts        # ⭐ SATU-SATUNYA FILE YANG PERLU DIEDIT untuk konten
│   │
│   ├── styles/
│   │   └── global.css          # Design tokens (CSS variables), base styles, animasi global
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro    # HTML shell: <head>, font, Navbar, Footer, script global
│   │
│   ├── components/             # Setiap section = satu file
│   │   ├── Cursor.astro        # HTML untuk custom cursor (logika di BaseLayout)
│   │   ├── Navbar.astro        # Navigasi + dark/light toggle + mobile menu
│   │   ├── Footer.astro        # Footer dengan copyright dan social links
│   │   ├── Hero.astro          # Section pertama: nama, tagline, CTA buttons
│   │   ├── About.astro         # Foto, deskripsi, meta info, download CV
│   │   ├── Skills.astro        # Grid tech stack per kategori
│   │   ├── Projects.astro      # Cards project dengan thumbnail, tags, links
│   │   ├── GithubActivity.tsx  # [React] Stats counter + contribution graph
│   │   ├── Experience.astro    # Timeline pengalaman & pendidikan
│   │   ├── Blog.astro          # Cards artikel blog
│   │   ├── Testimonials.astro  # Cards testimonial
│   │   └── Contact.tsx         # [React] Form kontak + social links
│   │
│   └── pages/                  # Setiap file = satu URL (file-based routing)
│       ├── index.astro         # → / (homepage, menyusun semua komponen)
│       └── blog/
│           └── index.astro     # → /blog (daftar semua artikel)
│
├── astro.config.mjs            # Konfigurasi Astro (integrations, site URL)
├── tailwind.config.mjs         # Konfigurasi Tailwind (custom fonts, colors, animations)
├── tsconfig.json               # Konfigurasi TypeScript
├── package.json                # Dependencies & npm scripts
└── README.md                   # Dokumentasi ini
```

---

## 🔍 Cara Kerja Project

Bagian ini menjelaskan bagaimana setiap layer bekerja dan saling terhubung.

### Alur Data

```
src/data/portfolio.ts
    │
    │  (di-import oleh setiap komponen)
    ▼
src/components/*.astro / *.tsx
    │
    │  (di-import dan disusun oleh)
    ▼
src/pages/index.astro
    │
    │  (dibungkus oleh)
    ▼
src/layouts/BaseLayout.astro
    │
    │  (dikompilasi saat: npm run build)
    ▼
dist/                           ← Output final: HTML + CSS + JS minimal
    └── index.html              ← Yang di-upload ke Netlify
```

### Layer 1 — Design Tokens (`global.css`)

Semua warna didefinisikan sebagai CSS variables di `:root`. Semua komponen menggunakan variable ini, bukan hardcode warna langsung.

```css
:root {
  --accent: #7fff6e;   /* Semua elemen hijau menggunakan ini */
}

/* Saat toggle ke light mode, hanya override variable-nya */
.light {
  --accent: #1a7a10;   /* Semua elemen otomatis berubah */
}
```

Inilah kenapa dark/light toggle bisa bekerja hanya dengan menambah/menghapus class `light` di tag `<html>`.

### Layer 2 — Data (`portfolio.ts`)

File TypeScript murni yang hanya berisi data — tidak ada HTML, tidak ada styling. Ini adalah *single source of truth*, satu-satunya tempat yang perlu diedit untuk mengubah konten.

```typescript
export const personal = { name: 'Alex Doe', ... };
export const projects = [{ title: 'E-Commerce', ... }];
```

Komponen mengimport data ini:
```astro
---
import { personal } from '../data/portfolio';
---
<h1>{personal.name}</h1>
```

### Layer 3 — Komponen Astro vs React

Project ini menggunakan dua jenis komponen dengan tujuan berbeda:

**Komponen `.astro` — Dirender saat BUILD, menghasilkan HTML murni:**

```
Astro template → dieksekusi di build time → HTML statis → dikirim ke browser
→ ZERO JavaScript untuk komponen ini
```

Digunakan untuk: Hero, About, Skills, Projects, Experience, Blog, Testimonials — bagian yang tidak butuh interaksi dinamis.

**Komponen `.tsx` / React — Dirender di BROWSER:**

```
React component → dikirim sebagai JavaScript → dieksekusi di browser
→ bisa update tampilan tanpa reload halaman (state, event handlers)
```

Digunakan untuk: GithubActivity (counter animasi dengan state) dan Contact (form dengan state).

Di `index.astro`, perbedaannya terlihat dari directive `client:`:

```astro
<Skills />                         <!-- Astro: 0 JS ke browser -->
<GithubActivity client:visible />  <!-- React: muat JS hanya saat di-scroll ke sini -->
<Contact client:visible />         <!-- React: sama -->
```

### Layer 4 — Routing (`pages/`)

Astro menggunakan file-based routing — nama file otomatis menjadi URL:

```
src/pages/index.astro        →  https://namakamu.dev/
src/pages/blog/index.astro   →  https://namakamu.dev/blog/
src/pages/about.astro        →  https://namakamu.dev/about/  (jika ditambah)
```

### Layer 5 — Layout (`BaseLayout.astro`)

Setiap halaman membungkus dirinya dengan `BaseLayout` yang menyediakan `<head>` dengan meta tags, Navbar, Footer, dan semua script global. Tag `<slot />` adalah lubang tempat konten halaman masuk.

### Mekanisme Scroll Reveal

Semua elemen dengan class `reveal` dianimasikan saat masuk viewport menggunakan `IntersectionObserver`:

```css
/* CSS: keadaan awal dan akhir */
.reveal         { opacity: 0; transform: translateY(30px); transition: 0.7s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }
```

```javascript
// JavaScript: pantau kapan elemen masuk viewport, lalu tambah class
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

### Mekanisme Dark/Light Mode

```javascript
// Toggle: tambah/hapus class "light" di <html>
toggle.addEventListener('click', () => {
  html.classList.toggle('light');
  localStorage.setItem('theme', html.classList.contains('light') ? 'light' : 'dark');
});

// Persistence: baca localStorage saat halaman pertama dibuka
const saved = localStorage.getItem('theme') || 'dark';
if (saved === 'light') document.documentElement.classList.add('light');
```

---

## 🚀 Quick Start

### Prerequisites

Pastikan sudah terinstall Node.js versi 18 atau lebih baru dari [nodejs.org](https://nodejs.org).

```bash
node --version   # Harus v18.0.0 atau lebih baru
npm --version    # Harus v8.0.0 atau lebih baru
```

### Instalasi

```bash
# 1. Masuk ke folder project
cd astro-portfolio

# 2. Install semua dependencies
npm install
# Proses ini mengunduh Astro, React, Tailwind ke node_modules/
# Bisa memakan waktu 1-3 menit

# 3. Jalankan development server
npm run dev
# → Buka http://localhost:4321 di browser
# → Hot reload aktif: setiap perubahan file langsung terlihat
```

### Scripts yang Tersedia

```bash
npm run dev      # Development server dengan hot reload
npm run build    # Build untuk production → output ke folder dist/
npm run preview  # Preview hasil build production di localhost
```

---

## ✏️ Kustomisasi Konten

> **Aturan utama:** Semua konten diubah di `src/data/portfolio.ts` saja.
> Tidak perlu menyentuh file komponen apapun hanya untuk ganti teks atau data.

### 1. Informasi Pribadi

```typescript
export const personal = {
  name:        'Alex Doe',             // Nama lengkap
  nameShort:   'alex.doe',             // Logo navbar, format bebas
  role:        'Full-Stack Developer', // Spesialisasi
  tagline:     'Building elegant...', // Kalimat utama di Hero
  description: 'Currently...',        // Lanjutan tagline
  status:      'Open to Work',        // Status karir saat ini
  location:    'Indonesia',           // Kota atau negara
  degree:      'S.Kom — 2025',        // Gelar dan tahun lulus
  gpa:         '3.8 / 4.0',          // IPK
  university:  'Universitas XYZ',     // Nama kampus
  email:       'kamu@email.com',      // Email aktif
  github:      'https://github.com/username',
  linkedin:    'https://linkedin.com/in/username',
  cv:          '/cv-namakamu.pdf',    // File harus ada di folder /public
  semester:    8,
};
```

### 2. Menambah Foto Diri

1. Taruh foto (format `.jpg` atau `.webp`, ukuran minimal 400×400px) di folder `public/`
2. Buka `src/components/About.astro`
3. Temukan div placeholder dan ganti dengan tag `<img>`:

```astro
<!-- HAPUS div placeholder, GANTI dengan: -->
<img
  src="/photo.jpg"
  alt="Nama Kamu"
  class="w-full h-full object-cover object-top"
/>
```

### 3. Skills

```typescript
export const skills = [
  {
    category: 'Frontend',
    icon: '⚡',
    items: ['React', 'TypeScript', 'Tailwind CSS'],
  },
  // Tambah atau hapus kategori sesuai kebutuhan
];
```

### 4. Projects

```typescript
export const projects = [
  {
    num:    '01',
    title:  'Nama Project',
    desc:   'Deskripsi singkat. Sebutkan masalah, dampak, dan skala project.',
    tags:   ['React', 'Node.js', 'PostgreSQL'],  // Max 3-4 tag
    github: 'https://github.com/username/repo',
    demo:   'https://project.com',               // Isi '' jika tidak ada demo
    color:  '#1a2a1a',                           // Warna background thumbnail
  },
];
```

**Tips deskripsi project yang menarik untuk recruiter:**
- Sebutkan masalah yang diselesaikan
- Cantumkan angka/metric konkret ("mengurangi loading 40%", "dipakai 200+ user")
- Highlight keputusan teknis yang menarik

### 5. GitHub Stats

```typescript
export const githubStats = [
  { num: 847, label: 'Contributions' },  // Cek di profil GitHub kamu
  { num: 24,  label: 'Repositories'  },
  { num: 312, label: 'GitHub Stars'  },
  { num: 18,  label: 'Pull Requests' },
];
```

> Contribution graph di portfolio ini di-generate secara acak sebagai visualisasi.
> Untuk data real, integrasikan [GitHub Readme Stats](https://github.com/anuraghazra/github-readme-stats).

### 6. Experience & Education

```typescript
export const experience = [
  {
    date:    'Jun 2024 — Des 2024',
    title:   'Full-Stack Developer Intern',
    company: 'PT. Nama Perusahaan · Kota',
    desc:    'Apa yang dikerjakan dan pencapaian konkretnya.',
  },
  // Urutkan dari yang terbaru di atas
  // Sertakan juga pendidikan sebagai entry
];
```

### 7. Blog Posts

```typescript
export const posts = [
  {
    category: 'Architecture',
    date:     'Feb 2025',
    title:    'Judul Artikel',
    excerpt:  'Ringkasan 1-2 kalimat.',
    href:     '/blog/slug-artikel',  // Harus sesuai nama file di pages/blog/
  },
];
```

### 8. Testimonials

```typescript
export const testimonials = [
  {
    text:     'Kutipan testimonial lengkap dari pemberi testimonial.',
    name:     'Nama Lengkap',
    role:     'Jabatan · Nama Perusahaan',
    initials: 'NL',  // 2 huruf inisial untuk avatar placeholder
  },
];
```

### 9. Mengubah Warna Accent

Buka `src/styles/global.css`:

```css
:root {
  --accent:      #7fff6e;               /* Warna utama */
  --accent-dim:  rgba(127,255,110,0.12);
  --accent-glow: rgba(127,255,110,0.25);
}
.light {
  --accent:      #1a7a10;
  --accent-dim:  rgba(26,122,16,0.08);
  --accent-glow: rgba(26,122,16,0.15);
}
```

Juga update warna di `src/components/GithubActivity.tsx` — cari array `levelColors` dan sesuaikan.

### 10. Mengubah Font

Di `src/layouts/BaseLayout.astro`, ganti nama font di URL Google Fonts. Lalu update `tailwind.config.mjs`:

```javascript
fontFamily: {
  display: ['NamaFontBaru', 'sans-serif'],  // Menggantikan Syne
  body:    ['NamaFontBody', 'sans-serif'],  // Menggantikan DM Sans
  mono:    ['NamaFontMono', 'monospace'],  // Menggantikan DM Mono
},
```

---

## 📄 Menambah Halaman Baru

### Artikel Blog

Buat file baru di `src/pages/blog/`:

```astro
---
// src/pages/blog/nama-artikel.astro
import BaseLayout from '../../layouts/BaseLayout.astro';
---

<BaseLayout title="Judul Artikel — Nama Kamu">
  <article class="pt-32 pb-24 max-w-3xl mx-auto px-8">
    <div class="section-label">Kategori</div>
    <h1 class="font-display font-bold text-5xl mb-4" style="color:var(--text)">
      Judul Artikel
    </h1>
    <p class="font-mono text-sm mb-12" style="color:var(--text-muted)">
      Feb 2025 · 8 min read
    </p>
    <div style="color:var(--text-muted); line-height:1.8">
      <p>Isi artikel kamu...</p>
    </div>
  </article>
</BaseLayout>
```

URL otomatis tersedia di `/blog/nama-artikel`.

### Halaman Lainnya

Cukup buat file `.astro` di `src/pages/`:

```
src/pages/uses.astro      →  /uses
src/pages/now.astro       →  /now
src/pages/projects.astro  →  /projects
```

---

## 🌐 Deploy ke Netlify

### Metode 1 — Via GitHub (Direkomendasikan)

Dengan metode ini, setiap `git push` otomatis men-trigger build dan deploy baru.

```bash
# Inisialisasi git dan push ke GitHub
git init
git add .
git commit -m "initial commit: portfolio"
git remote add origin https://github.com/username/portfolio.git
git push -u origin main
```

Di [netlify.com](https://netlify.com):
1. **New site** → **Import an existing project** → pilih GitHub
2. Pilih repo portfolio kamu
3. Isi konfigurasi:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Klik **Deploy site** — selesai! 🎉

### Metode 2 — Drag & Drop

```bash
npm run build   # Generate folder dist/
```

Buka [app.netlify.com](https://app.netlify.com), drag & drop folder `dist/` ke area deploy. Selesai dalam 30 detik.

---

## 🔗 Konfigurasi Domain Custom

**Registrar domain yang direkomendasikan:**
- [Niagahoster](https://niagahoster.co.id) — untuk `.id`, `.co.id`
- [Namecheap](https://namecheap.com) — untuk `.dev`, `.com`, `.io`
- [Porkbun](https://porkbun.com) — harga kompetitif untuk `.dev`

**Langkah konfigurasi:**
1. Di Netlify: **Site settings** → **Domain management** → **Add custom domain**
2. Masukkan domain kamu (contoh: `namakamu.dev`)
3. Copy nameserver yang diberikan Netlify
4. Di panel domain kamu, ganti nameserver ke nameserver Netlify
5. Tunggu propagasi DNS 15 menit hingga 24 jam
6. HTTPS otomatis aktif via Let's Encrypt — tidak perlu setup manual

Setelah domain aktif, update `astro.config.mjs`:
```javascript
export default defineConfig({
  site: 'https://namakamu.dev', // Ganti dengan domain asli
});
```

---

## ❓ FAQ & Troubleshooting

**`npm install` error atau sangat lama?**

```bash
# Coba dengan flag ini
npm install --legacy-peer-deps

# Atau bersihkan cache dan install ulang
rm -rf node_modules package-lock.json
npm install
```

**Font tidak muncul atau tampilan berantakan?**

Pastikan ada koneksi internet saat development — font dimuat dari Google Fonts. Untuk penggunaan offline, download font dan taruh di `public/fonts/`, lalu update URL import di `BaseLayout.astro`.

**Halaman putih atau error saat `npm run dev`?**

Cek terminal untuk pesan error. Paling sering disebabkan syntax error di `portfolio.ts` — pastikan tidak ada koma yang kurang atau tanda kutip yang tidak tertutup.

**Ingin tambah Google Analytics?**

Tambahkan di `BaseLayout.astro` dalam `<head>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Contact form tidak mengirim email?**

Form saat ini hanya simulasi UI. Untuk form yang benar-benar mengirim email, integrasikan salah satu:
- [Netlify Forms](https://docs.netlify.com/forms/setup/) — gratis, cukup tambah atribut `netlify` ke tag `<form>`
- [Formspree](https://formspree.io) — gratis untuk 50 submission/bulan
- [EmailJS](https://emailjs.com) — kirim email langsung dari JavaScript frontend

**Contribution graph ingin pakai data GitHub asli?**

Ganti komponen `ContribGraph` di `GithubActivity.tsx` dengan embed dari GitHub Readme Stats:
```tsx
<img
  src="https://github-readme-streak-stats.herokuapp.com/?user=USERNAME&theme=dark"
  alt="GitHub streak stats"
  style={{ width: '100%', borderRadius: 8 }}
/>
```

---

## ✅ Checklist Sebelum Launch

Sebelum share portfolio ke recruiter atau publik, pastikan semua ini sudah selesai:

### Konten
- [ ] Semua info di `portfolio.ts` sudah diisi data asli (nama, email, link)
- [ ] Foto diri sudah ditambah (bukan placeholder SVG)
- [ ] File CV sudah ada di `public/` dan link di `portfolio.ts` sudah benar
- [ ] Link GitHub dan LinkedIn sudah benar dan bisa diklik
- [ ] Minimal 2-3 project dengan GitHub repo aktif yang bisa dilihat
- [ ] Link demo project berfungsi (jika ada)
- [ ] Testimonial dari orang nyata (dosen, senior, rekan magang)
- [ ] Angka GitHub stats sudah diganti dengan data asli

### Technical
- [ ] `npm run build` berhasil tanpa error
- [ ] Semua halaman dicek di browser (Home, Blog)
- [ ] Dark mode dan Light mode dicek tampilannya
- [ ] Tampilan mobile dicek via DevTools (F12 → Toggle device toolbar)
- [ ] Semua link internal dan eksternal berfungsi (tidak ada 404)
- [ ] `astro.config.mjs` sudah diupdate dengan URL domain asli

### Deploy & SEO
- [ ] Deploy berhasil ke Netlify
- [ ] Domain custom sudah dipasang (sangat disarankan: `namakamu.dev`)
- [ ] HTTPS aktif (Netlify otomatis mengaktifkan ini)
- [ ] Favicon sudah diganti (edit `public/favicon.svg`)
- [ ] URL portfolio sudah ditambah ke profil GitHub, LinkedIn, dan CV kamu

---

<div align="center">

Dibuat dengan ❤️ dan ☕ menggunakan [Astro](https://astro.build) · [React](https://react.dev) · [Tailwind CSS](https://tailwindcss.com)

</div>
#   W e b - P o r t o f o l i o  
 