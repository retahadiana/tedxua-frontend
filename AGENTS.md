# Project Guidelines & Design Rules for TEDxUNAIR Frontend

Repository: `tedxua-frontend`
Stack: React 18, Vite, Tailwind CSS, Framer Motion, Lucide React.

---

## 🎯 Design System Tokens (Radius, Spacing, & Typescale)

Setiap implementasi UI wajib mengacu pada token resmi yang diekstrak dari folder token Figma (`Radius corner/`, `Spacing (1)/`, `Typescale/`).
Detail lengkap tersimpan di [.agents/rules/design-tokens.md](file:///.agents/rules/design-tokens.md).

### 1. Border Radius (`Radius corner`)
Dilarang menggunakan nilai sembarangan. Gunakan token berikut:
- `none`: `0px` (`rounded-none`)
- `xs`: `2px` (`rounded-[2px]`)
- `sm`: `4px` (`rounded-sm`)
- `md`: `8px` (`rounded-md`) — Tombol reguler & chip
- `lg`: `10px` (mobile) / `12px` (desktop) (`rounded-[10px] lg:rounded-[12px]`)
- `xl`: `14px` (mobile) / `16px` (desktop) (`rounded-[14px] lg:rounded-[16px]`)
- `2xl`: `20px` (mobile) / `24px` (desktop) (`rounded-[20px] lg:rounded-[24px]`) — Card showcase & calendar
- `3xl`: `28px` (mobile) / `32px` (desktop) (`rounded-[28px] lg:rounded-[32px]`) — Large modal/hero card
- `full`: `9999px` (`rounded-full`) — Pill button, circular nav icon, badge dot

### 2. Spacing (`Spacing (1)`)
Gunakan kelipatan 4px. Jangan gunakan angka ganjil/acak seperti `17px` atau `23px`.
- Spacing 1-16 (4px - 64px): Identik di Desktop & Mobile (`gap-1` s.d. `gap-16`, `p-1` s.d. `p-16`).
- Spacing 20 ke atas (Scale down di Mobile):
  - `20`: Mobile `64px` (`p-16`) | Desktop `80px` (`lg:p-20`)
  - `24`: Mobile `76px` (`py-[76px]`) | Desktop `96px` (`lg:py-24`)
  - `28`: Mobile `88px` (`py-[88px]`) | Desktop `112px` (`lg:py-28`)
  - `32`: Mobile `104px` (`py-[104px]`) | Desktop `128px` (`lg:py-32`)
  - `40`: Mobile `128px` (`py-32`) | Desktop `160px` (`lg:py-40`)
  - `48`: Mobile `152px` (`py-[152px]`) | Desktop `192px` (`lg:py-48`)
  - `64`: Mobile `204px` (`py-[204px]`) | Desktop `256px` (`lg:py-64`)

### 3. Typescale & Typography (`Typescale`)
- **Fonts**:
  - `font-swung`: Swung Note (Artist display titles, event headings, hero).
  - `font-gordita`: Gordita (Primary UI, body copy, descriptions, buttons, tables).
  - `font-essays`: Essays1743 (Editorial serif storytelling).
- **Sizes (Mobile -> Desktop)**:
  - `2xs`: `10px` (`text-[10px]`) — sub-label, micro date
  - `xs`: `12px` (`text-xs`) — caption, table header
  - `sm`: `14px` -> `15px` (`text-sm sm:text-[15px]`) — sub-label
  - `base`: `16px` (`text-base`) — default body
  - `md`: `18px` -> `20px` (`text-lg lg:text-xl`) — prominent body
  - `lg`: `20px` -> `24px` (`text-xl lg:text-2xl`) — H4 / card title
  - `xl`: `24px` -> `32px` (`text-2xl lg:text-[32px]`) — H3
  - `2xl`: `32px` -> `40px` (`text-[32px] lg:text-[40px]`) — H2
  - `3xl`: `40px` -> `56px` (`text-4xl lg:text-[56px]`) — H1
  - `4xl`: `48px` -> `72px` (`text-5xl lg:text-[72px]`) — Hero display
- **Line Heights**:
  - Display: `105%` (`leading-[1.05]`)
  - Heading: `115%` (`leading-[1.15]`)
  - Subheading: `130%` (`leading-[1.3]`)
  - Body: `161.8%` (`leading-[1.62]`)
- **Letter Spacing**:
  - Uppercase tags/badges: `tracking-[0.15em]` s.d. `tracking-[0.3em]`
  - Headings besar: `tracking-tight` atau `tracking-[-0.015em]`

---

## 🛠️ General Frontend Best Practices
1. **Responsive First**: Desain harus fluid dan teruji baik di mobile (<640px), tablet (768px), maupun desktop (1024px, 1440px).
2. **Animation**: Gunakan `framer-motion` untuk transisi halus (`[0.16, 1, 0.3, 1]` ease curve) dan hover micro-interactions.
3. **No Arbitrary Classes**: Selalu konsisten dengan skala token di atas.
