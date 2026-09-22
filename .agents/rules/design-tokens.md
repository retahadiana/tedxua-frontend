# TEDxUNAIR Design System Rules: Radius, Spacing, & Typescale

Dokumen ini adalah aturan resmi (Design System Rules) yang diekstrak langsung dari design tokens Figma (`Radius corner/`, `Spacing (1)/`, dan `Typescale/`).
Setiap developer dan AI agent **wajib** mematuhi aturan token ini saat membuat atau memodifikasi komponen UI di repository `tedxua-frontend`.

---

## 1. Corner Radius Rules (`Radius corner`)

Gunakan token radius di bawah ini. Jangan gunakan nilai border-radius sembarangan (arbitrary values) di luar skala ini.
Perhatikan adaptasi responsif antara tampilan **Desktop** dan **Mobile** untuk token `lg` ke atas.

| Token | Desktop | Mobile | Tailwind Class Rekomendasi | Penggunaan / Konteks |
| :--- | :--- | :--- | :--- | :--- |
| `radius.none` | `0px` | `0px` | `rounded-none` | Full bleed container, flat edge |
| `radius.xs` | `2px` | `2px` | `rounded-[2px]` | Pill dot kecil, micro badge, subtle borders |
| `radius.sm` | `4px` | `4px` | `rounded-sm` | Input field border, small badge, tooltips |
| `radius.md` | `8px` | `8px` | `rounded-md` | Tombol standar, dropdown menu, chip/tag |
| `radius.lg` | `12px` | `10px` | `rounded-[10px] lg:rounded-[12px]` | Card medium, notification banner, alert box |
| `radius.xl` | `16px` | `14px` | `rounded-[14px] lg:rounded-[16px]` | Modal dialog, schedule badge, secondary card |
| `radius.2xl` | `24px` | `20px` | `rounded-[20px] lg:rounded-[24px]` | Main feature card, calendar frame, venue card |
| `radius.3xl` | `32px` | `28px` | `rounded-[28px] lg:rounded-[32px]` | Large hero container, bottom sheet card |
| `radius.full` | `9999px` | `9999px` | `rounded-full` | Circular icon button, avatar, rounded pill tabs |

### 📌 Aturan Praktis Radius:
1. **Pill & Button Bulat**: Gunakan `rounded-full` (contoh: tombol prev/next carousel, status dot).
2. **Standard Card**: Gunakan `rounded-[20px] lg:rounded-[24px]` (2xl) untuk kartu showcase utama.
3. **Inner Element Radius**: Jika sebuah container memiliki radius `24px` dengan padding `16px`, elemen di dalamnya idealnya memiliki radius `12px` - `16px` (`lg` / `xl`).

---

## 2. Spacing Rules (`Spacing (1)`)

Sistem spacing menggunakan basis kelipatan **4px**.
Mulai dari token `20` ke atas, nilai pada **Mobile** mengalami reduksi proporsional agar layout tetap compact dan tidak overflow pada layar kecil.

| Token | Desktop (px) | Mobile (px) | Tailwind Utility (Desktop / Mobile) |
| :--- | :--- | :--- | :--- |
| `1` | `4px` | `4px` | `gap-1`, `p-1`, `m-1` |
| `2` | `8px` | `8px` | `gap-2`, `p-2`, `m-2` |
| `3` | `12px` | `12px` | `gap-3`, `p-3`, `m-3` |
| `4` | `16px` | `16px` | `gap-4`, `p-4`, `m-4` |
| `5` | `20px` | `20px` | `gap-5`, `p-5`, `m-5` |
| `6` | `24px` | `24px` | `gap-6`, `p-6`, `m-6` |
| `7` | `28px` | `28px` | `gap-7`, `p-7`, `m-7` |
| `8` | `32px` | `32px` | `gap-8`, `p-8`, `m-8` |
| `9` | `36px` | `36px` | `gap-9`, `p-9`, `m-9` |
| `10` | `40px` | `40px` | `gap-10`, `p-10`, `m-10` |
| `11` | `44px` | `44px` | `gap-11`, `p-11`, `m-11` |
| `12` | `48px` | `48px` | `gap-12`, `p-12`, `m-12` |
| `14` | `56px` | `56px` | `gap-14`, `p-14`, `m-14` |
| `16` | `64px` | `64px` | `gap-16`, `p-16`, `m-16` |
| `20` | `80px` | `64px` | `p-16 lg:p-20` / `gap-16 lg:gap-20` |
| `24` | `96px` | `76px` | `py-[76px] lg:py-24` |
| `28` | `112px` | `88px` | `py-[88px] lg:py-28` |
| `32` | `128px` | `104px` | `py-[104px] lg:py-32` |
| `36` | `144px` | `116px` | `py-[116px] lg:py-36` |
| `40` | `160px` | `128px` | `py-32 lg:py-40` |
| `48` | `192px` | `152px` | `py-[152px] lg:py-48` |
| `56` | `224px` | `180px` | `py-[180px] lg:py-56` |
| `64` | `256px` | `204px` | `py-[204px] lg:py-64` |

### 📌 Aturan Praktis Spacing:
1. **Dilarang Nilai Acak**: Hindari menulis arbitrary spacing seperti `p-[17px]`, `gap-[23px]`, atau `mt-[37px]`. Selalu bulatkan ke skala spacing terdekat.
2. **Section Padding**: Gunakan token `20` - `28` (`py-16 lg:py-24` atau `py-20 lg:py-28`) untuk vertical padding section.
3. **Container Padding**: Gunakan `px-4 sm:px-8 lg:px-12` (atau `px-[120px]` untuk grid 1440px desktop).
4. **Card Padding**: Gunakan `p-4 sm:p-6 lg:p-8` (token `4`, `6`, `8`).

---

## 3. Typescale & Typography Rules (`Typescale`)

### A. Font Families
*   **Brand Display**: `Bricolage Grotesque` / `Swung Note` (`font-swung` untuk judul artistik, display, hero titles).
*   **Body & UI**: `DM Sans` / `Gordita` (`font-gordita` untuk teks bacaan, paragraf, label tombol, tabel).
*   **Editorial Serif**: `Essays1743` (`font-essays` untuk kutipan filosofis & narasi cerita mendalam).

### B. Font Weights
*   `font-weight-regular`: `400` (`font-normal`)
*   `font-weight-medium`: `500` (`font-medium`)
*   `font-weight-semibold`: `600` (`font-semibold`)
*   `font-weight-bold`: `700` (`font-bold`)
*   `font-weight-extrabold`: `800` (`font-extrabold`)

### C. Font Size Hierarchy (Desktop vs Mobile)

| Token | Desktop Size | Mobile Size | Rekomendasi Tailwind | Penggunaan Utama |
| :--- | :--- | :--- | :--- | :--- |
| `font-size-2xs` | `7px` | `10px` | `text-[10px]` | Micro date tag, uppercase badge sub-labels |
| `font-size-xs` | `12px` | `12px` | `text-xs` | Caption, metadata, calendar days header, helper text |
| `font-size-sm` | `15px` | `14px` | `text-sm sm:text-[15px]` | Subtitle kecil, deskripsi card singkat, nav link |
| `font-size-base` | `16px` | `16px` | `text-base` | Body copy default, tombol standar, input text |
| `font-size-body` | `20px` | `20px` | `text-lg sm:text-xl` | Lead paragraph, ringkasan subheader |
| `font-size-md` | `20px` | `18px` | `text-lg lg:text-xl` | Card subheadings, prominent body |
| `font-size-lg` | `24px` | `20px` | `text-xl lg:text-2xl` | H4, Card titles, modal titles |
| `font-size-xl` | `32px` | `24px` | `text-2xl lg:text-[32px]` | H3, Section subheadings |
| `font-size-2xl` | `40px` | `32px` | `text-[32px] lg:text-[40px]` | H2, Section titles |
| `font-size-3xl` | `56px` | `40px` | `text-4xl lg:text-[56px]` | H1, Sub-hero display headers |
| `font-size-4xl` | `72px` | `48px` | `text-5xl lg:text-[72px]` | Massive Display / Hero Title |

### D. Line Heights
*   `line-height-display`: `105%` (`leading-[1.05]`) — untuk headline besar / title display
*   `line-height-heading`: `115%` (`leading-[1.15]`) — untuk H1 & H2
*   `line-height-subheading`: `130%` (`leading-[1.3]`) — untuk H3 & card title
*   `line-height-body`: `161.8%` (`leading-[1.62]`) — rasio golden ratio untuk paragraf agar nyaman dibaca
*   Fixed heights: `xs`: 16px, `sm`: 24-28px, `md`: 32-36px, `lg`: 40-48px, `xl`: 48-64px

### E. Letter Spacing (Tracking)
*   `letter-spacing-tighter`: `-3%` (`tracking-[-0.03em]`) — display headings besar
*   `letter-spacing-tight`: `-1.5%` (`tracking-[-0.015em]`) — heading teks umum
*   `letter-spacing-normal`: `0` (`tracking-normal`) — paragraf biasa
*   `letter-spacing-wide`: `+2%` (`tracking-[0.02em]` / `tracking-wide`) — tombol & highlight
*   `letter-spacing-wider`: `+6%` (`tracking-[0.06em]` hingga `tracking-[0.2em]`) — uppercase tracking (misal: "THE LINEUP", "SAVE THE MOMENT", "PRE-EVENT 2")

---

## 4. Checklist Kepatuhan Implementasi (Developer Checklist)

Saat membuat halaman atau komponen baru:
- [ ] Apakah border radius menggunakan salah satu dari `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, atau `full`?
- [ ] Apakah padding dan gap menggunakan kelipatan basis spacing (4, 8, 12, 16, 20, 24, 32, 48, dst.)?
- [ ] Apakah heading besar menggunakan line-height rapat (`leading-[0.95]` s.d. `leading-[1.15]`)?
- [ ] Apakah teks uppercase/badge memiliki tracking lebar (`tracking-[0.1em]` s.d. `tracking-[0.25em]`)?
- [ ] Apakah paragraf artikel/narasi memiliki line-height santai (`leading-relaxed` / `leading-[1.6]`)?
- [ ] Apakah tampilan mobile sudah disesuaikan agar font size dan spacing tidak meluap (overflow)?
