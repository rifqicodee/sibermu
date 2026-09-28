# Header Redesign v2 — Meniru struktur sibermu.ac.id + skin premium

> v2: struktur & isi header mengikuti **sibermu.ac.id** (hasil analisis HTML live), tampilan mengikuti
> spesifikasi premium awal (glass, biru Muhammadiyah, micro-interaction).

## Keputusan yang disepakati

| Topik | Keputusan |
| --- | --- |
| Kedekatan visual | **Struktur asli sibermu.ac.id, skin premium** (bukan replika warna WordPress) |
| Menu utama | **Menu sibermu.ac.id**: Profil ▾, Akademik ▾, Admisi, Kampus Virtual, Karir, Repository |
| Elemen ikut | Running text kaldik (iframe), **search bar di bawah nav**, CTA **Apply Now / Visit Campus** tetap. Ikon sosial di kanan **tidak** dipakai |
| Font + submenu | **Quicksand** untuk nav/heading nav + **mega menu premium** (bukan dropdown polos) |
| Animasi | CSS keyframes + Web Animations API (tanpa `gsap`) |
| Portal (Student/Lecturer/Staff) | Ketiganya → `/akademik` (dipertahankan di top bar) |

## Header asli sibermu.ac.id (fakta dari HTML live)

```
<header elementor-1119>
  1. Top bar        bg #D3DFF6  → "Penerimaan Mahasiswa Baru SiberMu 2026/2027 Genap" + "Lihat di sini" → /admisi
  2. Main bar       bg #FFFAFA, sticky (shrink 80→64px, logo 80%) → logo | nav uppercase | (sosial)
  3. Running text   iframe https://kaldik.sibermu.ac.id/embed-running-text.php, height 45px
  4. Search bar     full-width, input radius 20px, placeholder "Cari disini...", tombol search
</header>
```

- Nav: Quicksand 14px/800 UPPERCASE, warna `#1A2A5B`, hover **pill radius 30px** isi `#086D46` teks putih.
- Submenu asli: panel gelap `#131423`, teks putih uppercase.
- Dropdown: Profil (Visi dan Misi, Sejarah, Akreditasi, Badan Pembina Harian, Pimpinan dan Pejabat, UPPS),
  Akademik (E-learning, Yudisium, Wisuda).
- Tanpa CTA/portal/login di header, tanpa mega menu, tanpa hamburger (nav wrap di mobile).

## Konteks codebase

- Entry: `components/layout/navbar.tsx` (client) dari `app/[locale]/layout.tsx:114`
  props `{ menu, admissionOpen, admissionDeadline, locale, dict }`.
- Token: `app/globals.css` (`--blue #005BAC`, `--radius-card 24px`, `glass`, `label-caps`, `shadow-blue`).
- Helper: `Magnetic`, `LogoMark`, `ThemeToggle`, `LanguageToggle`, `useReducedMotion`,
  Radix `Dialog`/`Accordion` di `components/ui/`.
- Anchor homepage: `#kampus` (virtual campus), `#agenda`, `#fakultas`, `#berita`, `#program`, `#faq`.
- Semua sub-halaman masih stub `ComingSoon` → link mega menu aman menunjuk rute yang ada.
- CMS: `getSiteSettings()` (phone/whatsapp/email/mapsUrl/socials, admissionOpen/Deadline),
  `getFaculties()`, `getProdi()`, `getNews()`.
- `next/image` sudah bisa untuk `/api/media/file/**` + unsplash/r2.
- Font sudah pakai `next/font/google` (Inter, Playfair) di layout → tambah **Quicksand** dengan pola sama.

---

## 1. Struktur file

### Baru

```
lib/nav-menus.ts                        # 6 nav item (label id/en, href, children, megaLayout) + konten statis
components/layout/header/
  site-header.tsx                       # orkestrator, export `Navbar`
  announcement-bar.tsx                  # layer 1 — top bar PMB (42px)
  main-nav.tsx                          # layer 2 — logo | nav Quicksand | CTA (88px → 72px)
  nav-link.tsx                          # 1 item: pill hover biru, chevron, indikator aktif
  mega-menu.tsx                         # panel glass radius 24 + animasi 300ms + spotlight
  mega-content.tsx                      # switch per megaLayout → kolom/kartu/timeline
  running-text.tsx                      # layer 3 — iframe kaldik 45px (+ fallback marquee)
  search-bar.tsx                        # layer 4 — input full-width yang membuka SearchDialog
  header-cta.tsx                        # Apply Now (gradient+magnetic) + Visit Campus (outline)
  mobile-nav.tsx                        # full-screen overlay + accordion + sticky bottom CTA
  use-header-scroll.ts                  # state scrolled → shrink 88→72, sticky glass
  use-mega-state.ts                     # hover-intent, Escape, click-outside, focus return
app/[locale]/repository/page.tsx        # stub route baru (pola ComingSoon), agar IA mirip situs asli
```

### Diubah

```
components/layout/navbar.tsx             # jadi wrapper tipis / dipindah ke header/site-header.tsx
components/layout/announcement-bar.tsx   # pindah + redesign (isi mengikuti teks situs asli)
app/[locale]/layout.tsx                 # props: settings, faculties, programCounts, drop `menu`; tambah font Quicksand
lib/i18n/messages.ts                    # key baru id+en (top bar, nav, mega, search bar, mobile CTA)
app/globals.css                         # token header, pill-hover, keyframes marquee/mega, Quicksand var
components/home/hero.tsx                # header kini non-overlay → rapikan padding atas (lihat §6)
components/search/search-dialog.tsx     # recent + popular searches (tetap dibuka via search bar & ⌘K)
```

`NAV_FALLBACK` (`server/constants.ts`) tidak dipakai navbar lagi — biarkan (tidak dihapus, diff minimal).

---

## 2. Layout header: in-flow + sticky nav (mengikuti situs asli)

Perubahan penting dari rencana v1: header **tidak lagi `fixed` menimpa hero**.

- `<header>` dirender **in flow** di atas konten (seperti WordPress asli):
  `[announcement-bar] [main-nav] [running-text] [search-bar]`.
- Baris **main-nav** memakai `sticky top-0 z-50` → tetap terlihat saat scroll.
- Saat `scrollY > 24` (`use-header-scroll`):
  - baris main-nav: `88px → 72px`, background transparan → glass
    `rgba(255,255,255,.75)` + `backdrop-filter: blur(20px)` + border `rgba(0,91,172,.08)`
    + shadow `0 20px 50px rgba(0,91,172,.08)`, transisi **400ms ease-out**;
  - logo `scale 1 → 0.88`;
  - baris running-text & search-bar ikut tertinggal (bukan sticky, menggulir normal) — sama dengan aslinya.
- Mode gelap: pakai token `--glass` / `--glass-border` (sudah ada varian `.dark`), jangan hardcode putih.

## 3. Layer 1 — Top Announcement Bar (42px)

- Isi **mengikuti situs asli**: `Penerimaan Mahasiswa Baru SiberMu 2026/2027 Genap`
  + link **"Lihat di sini →"** → `/pmb` (padanan `/admisi`).
- Skin premium: latar `--blue-tint #EEF6FF` (light) / navy lembut (dark), teks `#005BAC`,
  ikon `Megaphone` kiri, tinggi `h-[42px]`.
- Marquee auto-slide untuk beberapa pesan (PMB, kalender, beasiswa) — track diduplikasi,
  `translate3d(-50%)` linear ~28s, pause saat hover, statis saat `prefers-reduced-motion`.
- Kanan (compact): `LanguageToggle`, `ThemeToggle`, dropdown **Portal Login**
  (Mahasiswa/Dosen/Staf → `/akademik`) — situs asli tidak punya ini, dipertahankan dari spesifikasi awal.
- Countdown `admissionDeadline` tetap sebagai chip kecil (dipertahankan dari implementasi lama).
- Dismissible (tombol X) + state di `sessionStorage`.
- `<aside aria-label>`, marquee track `aria-hidden` dengan teks `sr-only`.

## 4. Layer 2 — Main Navigation (88px → 72px)

**Logo**: `LogoMark` + wordmark universitas + tagline kecil (`Digital Islamic University` /
`dict.brand.tagline`) — situs asli hanya gambar logo, kita pertahankan wordmark gaya premium.
Hover: soft glow `drop-shadow(0 0 12px rgba(0,91,172,.35))`.

**Nav** (Quicksand uppercase, mengikuti situs asli):

| # | Label | href | Mega menu |
| --- | --- | --- | --- |
| 1 | Profil | `/tentang` | ✅ 3 kolom + feature card |
| 2 | Akademik | `/akademik` | ✅ kolom + quick access |
| 3 | Admisi | `/pmb` | ✅ timeline + CTA |
| 4 | Kampus Virtual | `/#kampus` | ✅ panel preview |
| 5 | Karir | `/karir` | ✅ panel singkat |
| 6 | Repository | `/repository` (stub baru) | ➖ link biasa / panel kecil |

- Tipografi: `font-[Quicksand] text-[0.8rem] font-extrabold uppercase tracking-[0.06em]`.
  Warna default `#005BAC` (padanan `#1A2A5B` asli), teks putih saat bar sticky gelap? tidak perlu —
  bar selalu terang/glass.
- **Hover/active pill** (mengikuti aslinya): `::before` background biru
  `linear-gradient(135deg,#005BAC,#2F80ED)`, `border-radius: 30px`, teks putih, scale-in dari tengah
  250ms. Chevron rotate 180° saat mega menu terbuka.
- Indikator halaman aktif: titik 4px `#2F80ED` di bawah label + `aria-current="page"`
  (dihitung dengan `stripLocale(pathname)`).
- **CTA kanan** (`header-cta.tsx`):
  - **Apply Now** → `/pmb`: gradien `linear-gradient(135deg,#005BAC,#2F80ED)`, `Magnetic`,
    hover lift `-2px` + glow, radius pill.
  - **Visit Campus** → `/#kampus`: outline `border-[rgba(0,91,172,.18)] text-blue`, radius pill.
- Breakpoints: nav penuh ≥1280px; 1024–1279px nav bisa scroll-x (`scrollbar-hide`) atau
  diringkas; **<1024px** memakai mobile nav (situs asli memakai wrap tanpa hamburger — kita pakai
  full-screen overlay sesuai spesifikasi premium).

**Submenu children** (label mengikuti situs asli, href menyesuaikan rute yang ada):

- Profil: Visi dan Misi `/tentang#visi`, Sejarah `/tentang#sejarah`, Akreditasi `/tentang#akreditasi`,
  Badan Pembina Harian `/tentang#badan-pembina`, Pimpinan dan Pejabat `/tentang#pimpinan`,
  UPPS `/tentang#upps`
- Akademik: E-learning `/akademik#e-learning`, Yudisium `/akademik#yudisium`, Wisuda `/akademik#wisuda`
  + tambahan premium: Kalender Akademik `/akademik#kalender`, Kurikulum `/akademik#kurikulum`,
  Program Studi `/program`, Dosen `/dosen`
- Admisi: Jadwal `/pmb#alur`, Persyaratan `/pmb#persyaratan`, Biaya & Beasiswa `/pmb#biaya`,
  Formulir `/pmb#daftar`, FAQ `/faq`
- Karir: Magang & Industri `/karir#magang`, Alumni `/karir#alumni`, Pengembangan Karir `/karir`
- Repository: Repository `/repository`, Jurnal & Publikasi `/penelitian`, Riset Dosen `/penelitian#hibah`

## 5. Layer 3 & 4 — Running text + Search bar

**Running text** (`running-text.tsx`, 45px, full-width):
- `<iframe src="https://kaldik.sibermu.ac.id/embed-running-text.php" title="Informasi Kegiatan Hari Ini"
  height={45} loading="lazy" className="w-full border-0" />`
- Fallback (iframe gagal/blokir): marquee teks dari dict (`announcement.messages`) dengan gaya yang sama.
- Latar mengikuti skin bar (putih/glass tipis, border-b halus).

**Search bar** (`search-bar.tsx`, mengikuti aslinya di bawah nav):
- Container full-width dalam `.section`, input radius **20px**, tinggi 44–48px, background putih/glass,
  border `2px rgba(0,91,172,.10)`, focus: border `#005BAC` + glow lembut.
- Placeholder `Cari disini...` / `Search here...` (dict baru `search.barPlaceholder`).
- Tombol submit melayang di kanan: bg biru, ikon `Search`, radius pill.
- **Perilaku**: input `readOnly` + `onFocus`/`onClick` → dispatch `sibermu:search:open`
  (memakai command palette `SearchDialog` yang sudah ada, `⌘K` tetap berfungsi) —
  satu implementasi pencarian, tampilan tetap seperti search bar situs asli.

## 6. Mega menu

Panel: posisi `absolute` di bawah baris nav (bukan fixed full-width), mengikuti container `max-w-7xl`,
`w-[min(92vw,1040px)]` di-center.

- Skin premium: `rgba(255,255,255,.75)` + blur 20px, border `rgba(0,91,172,.08)`,
  radius **24px**, shadow `0 20px 50px rgba(0,91,172,.08)`, padding 28px.
  (Varian gelap `#131423` ala situs asli tersedia sebagai satu toggle class bila nanti mau —
  default tetap light glass.)
- **Animasi 300ms**: `opacity 0→1`, `translateY(-10px)→0`, `scale(.985)→1`, wrapper `blur(6px)→0`,
  easing `cubic-bezier(.22,1,.36,1)`; anak kolom stagger 40ms via `element.animate`
  (dilewati saat reduced-motion).
- **Spotlight**: `radial-gradient(320px circle at var(--mx) var(--my), rgba(47,128,237,.10), transparent 70%)`,
  update `--mx/--my` saat `pointermove` (rAF-throttle), hanya `pointer: fine`.
- Interaksi: hover-intent 60ms masuk / 140ms keluar, `Escape` → tutup + fokus kembali ke trigger,
  klik luar → tutup, route change → tutup; `aria-expanded`/`aria-controls`/`aria-haspopup="menu"`.

Isi per menu (dari `lib/nav-menus.ts`):

| Menu | Konten |
| --- | --- |
| **Profil** | K1: Visi & Misi, Sejarah, Akreditasi, Rektorat/Leadership, Organisasi · K2: Muhammadiyah, Manajemen Mutu, Rencana Strategis, Fasilitas Kampus · K3: **feature card** (gambar kampus `next/image` lazy, judul intro, tombol **Learn More** → `/tentang`) |
| **Akademik** | K1: Kalender, Kurikulum, E-learning, Yudisium, Wisuda · K2: Perpustakaan, Beasiswa, Program Studi, Dosen, Penelitian · K3: **quick access card** (Student Portal, Lecturer Portal, SIAKAD, Virtual Classroom → semua `/akademik`); baris bawah: 6 chip fakultas (inisial `code` + nama + badge akreditasi, dari `getFaculties()`), hover lift+glow |
| **Admisi** | **Timeline** vertikal (Jadwal → Persyaratan → Biaya → Beasiswa → FAQ) + panel CTA **Daftar Sekarang** gradien + countdown PMB |
| **Kampus Virtual** | K1: Tur 360°, Peta Kampus, Fasilitas (→ `/#kampus`) · K2: link agregat (Galeri `/galeri`, Prestasi `/prestasi`, Agenda `/#agenda`) · K3: mini preview peta (ilustrasi SVG) |
| **Karir** | Magang & Industri, Alumni, Lowongan, Pengembangan Karir + stat card (mitra industri/lulusan bekerja dari `getSiteSettings()` statistics) |
| **Repository** | Panel kecil: Repository, Jurnal & Publikasi, Riset Dosen, E-learning |

## 7. Mobile experience

- **Full-screen overlay** (Radix `Dialog` → focus-trap, ESC, `aria-modal`):
  latar `bg-background/85 backdrop-blur-xl`, animasi buka 300ms (fade + slide-up + blur), close 200ms.
- Header overlay: logo + tombol close `size-11`.
- Isi: **accordion** (Radix `Accordion`) per item — child link + deskripsi, chevron rotate,
  tinggi sentuh ≥ 44px; item tanpa child jadi link biasa.
- Aksi dalam overlay: search, `LanguageToggle`, `ThemeToggle`.
- **Bottom sticky CTA**: `Apply Now` (gradien, flex-1) · `Call Campus` (`tel:` dari `settings.phone`) ·
  `WhatsApp` (`https://wa.me/{settings.whatsapp}`), masing-masing min 44px.
- Tutup otomatis saat route berubah (pola `lastPathname` yang sudah ada).

## 8. Search experience (dialog yang sudah ada)

File: `components/search/search-dialog.tsx` (sudah lazy).

- Query kosong → **Recent Searches** (localStorage `sibermu:search:recent`, maks 6 + tombol clear)
  dan **Popular Searches** (chips: PMB, Fakultas, Beasiswa, Dosen, Kalender — dict).
- Pilih hasil → simpan ke recent; `⌘K/Ctrl+K` dipertahankan; footer hint `Enter/Esc` + `⌘K`.
- Styling command-palette: `max-w-2xl`, radius 24, glass, tinggi input 60px, grup berlabel `label-caps`.
- Tidak ada perubahan API `/api/search` (fakultas/prodi/dosen/berita/event/faq/page sudah cukup).

## 9. Font Quicksand

`app/[locale]/layout.tsx`:

```ts
const quicksand = Quicksand({ subsets: ['latin'], weight: ['400','500','600','700','800'],
                              variable: '--font-quicksand', display: 'swap' })
```

- `@theme inline` di `globals.css`: `--font-nav: var(--font-quicksand), ...` (baru) atau
  tambahkan class `font-nav` utility.
- Berlaku untuk: label nav, tombol CTA, label top bar, judul mega menu (heading besar tetap Playfair,
  body tetap Inter).

## 10. Dictionary baru (`lib/i18n/messages.ts`, id + en)

`announcement.label`, `announcement.headline` ("Penerimaan Mahasiswa Baru SiberMu 2026/2027 Genap"),
`announcement.cta` ("Lihat di sini"), `announcement.messages[]`, `portal.student/lecturer/staff`,
`nav.items.*` (6 label), `nav.applyNow`, `nav.visitCampus`,
`mega.*` (judul kolom, feature card, quick access, timeline steps, karir, repository),
`search.barPlaceholder`, `search.recent`, `search.popular`, `search.clear`,
`runningText.title`, `runningText.fallback`,
`mobile.call`, `mobile.whatsapp`.

Label 6 menu + children id/en disimpan di `lib/nav-menus.ts` (static config).

## 11. globals.css — token & keyframes

```css
--header-h: 88px;                 /* saat scrolled → 72px (inline style) */
--header-glass: rgba(255,255,255,.75);
--header-border: rgba(0,91,172,.08);
--header-shadow: 0 20px 50px rgba(0,91,172,.08);
--header-radius: 24px;
--blue-secondary: #1976D2;
--blue-accent-spec: #2F80ED;      /* hover/CTA — jangan menimpa --blue-hover global */
--blue-tint: #EEF6FF;
--topbar-bg: #EEF6FF;
```
Keyframes: `mega-in`, `marquee`, `pill-in` (underline/pill dari tengah), `accordion-down`.
Guard `prefers-reduced-motion` sudah ada global — pastikan marquee jadi statis penuh (bukan berhenti
di tengah) dan mega menu tampil tanpa transform.

## 12. Data wiring (`app/[locale]/layout.tsx`)

```ts
const [settings, faculties, prodi, homepage, news] = await Promise.all([
  safe(getSiteSettings()), safe(getFaculties({ limit: 6 })),
  safe(getProdi({ limit: 200 })), safe(getHomepage()), safe(getNews({ limit: 3 })),
])
// programsPerFaculty: Record<facultyId, number>  ← dihitung dari prodi[].faculty
```
- Props `Navbar`: `{ settings, faculties, programsPerFaculty, news, admissionOpen, admissionDeadline, locale, dict }`
  (drop `menu`), tetap dibungkus `try/catch` seperti sekarang.
- Karena header in-flow: `components/home/hero.tsx` tidak lagi tertimpa → sesuaikan padding atas
  (`pt-28` dikurangi, mis. `pt-6`/`pt-10`) setelah dilihat di browser.
- Anchor tetap butuh `scroll-margin-top: 96px` untuk target `#...` saat nav sticky.

## 13. Aksesibilitas & performa

- Keyboard: Tab urut (logo → nav → CTA → search bar), Enter/Space buka mega menu, Escape tutup,
  panah ↑/↓ pada accordion, `⌘K` search.
- `aria-current="page"`, `aria-expanded`, `aria-haspopup="menu"`, label sr-only, focus ring global
  (`:focus-visible` sudah ada).
- Touch target ≥ 44px (icon buttons `size-11` di breakpoint sentuh).
- Gambar mega menu di-mount hanya saat panel terbuka + `loading="lazy"` + `sizes` tepat → tanpa CLS.
- Iframe running text `loading="lazy"` + fallback → tidak memengaruhi LCP.
- Animasi hanya `transform`/`opacity`/`backdrop-filter`; scroll listener `passive`; pointermove rAF.
- Tanpa dependency baru.

## 14. Verifikasi

1. `npm run lint` → 2. `npm run typecheck` → 3. `npm run build`
4. Manual `npm run dev`:
   - 1440 / 1024 / 768 / 390px: 4 baris header, sticky shrink 88→72, pill hover, mega menu tiap item.
   - Running text iframe tampil (cek fallback bila diblokir), search bar membuka palette, `⌘K`.
   - Keyboard-only, reduced-motion, dark mode.
   - `/program`, `/karir`, `/kontak`, `/berita` tetap terjangkau (mega menu + footer).

## Risko / catatan

- Header kini **in-flow** (bukan overlay hero) — mengikuti situs asli; konsekuensi: efek
  "transparan di atas hero" dari spesifikasi awal gugur, digantikan sticky glass saat scroll.
  Hero perlu padding atas dikurangi.
- Route baru `/repository` (stub) dibuat agar IA mirip situs asli; `/kehidupan-mahasiswa` (rencana v1)
  dibatalkan — "Student Life" tidak ada di menu asli.
- Ikon sosial kanan **tidak** dipasang (tidak dipilih); sosial tetap di footer.
- Running text bergantung pada domain `kaldik.sibermu.ac.id` → sediakan fallback marquee.
