# 📁 Panduan File Management — TEDxUA Frontend

## Gambaran Besar: Alur Kerja Aplikasi

```
Browser membuka URL
       ↓ 
  index.html          ← pintu masuk HTML
       ↓
  src/main.jsx        ← JavaScript mulai berjalan
       ↓
  src/App.jsx         ← komponen root, setup provider & router
       ↓
  src/routes.jsx      ← tentukan halaman mana yang tampil
       ↓
  src/features/*/     ← halaman & komponen spesifik ditampilkan
```

---

## 🗂️ Struktur Lengkap & Fungsi Setiap File

```
tedxua-frontend/
│
├── index.html                  ← Template HTML utama (1 file saja)
├── vite.config.js              ← Konfigurasi build tool Vite
├── tailwind.config.js          ← Konfigurasi warna, font, breakpoint Tailwind
├── postcss.config.js           ← Proses CSS (diperlukan Tailwind)
├── jsconfig.json               ← Konfigurasi path alias untuk VS Code
├── package.json                ← Daftar library & script npm
│
└── src/
    ├── main.jsx                ← Entry point JS — render App ke HTML
    ├── App.jsx                 ← Root komponen — setup global provider
    ├── routes.jsx              ← Peta URL → Halaman
    ├── index.css               ← CSS global (reset, font, base style)
    │
    ├── assets/                 ← File statis (gambar, ikon)
    │   ├── images/             ← Gambar .png .jpg .webp .svg
    │   └── icons/              ← Ikon .svg .ico
    │
    ├── styles/                 ← CSS tambahan global
    │   ├── theme.css           ← Variabel warna, font (CSS custom properties)
    │   └── animations.css      ← Animasi CSS global (keyframes)
    │
    ├── components/             ← Komponen UI yang dipakai di SEMUA halaman
    │   ├── layout/             ← Komponen struktur halaman
    │   │   ├── Navbar.jsx      ← Navigasi atas (tampil di semua halaman)
    │   │   ├── Footer.jsx      ← Footer bawah (tampil di semua halaman)
    │   │   ├── PageTransition.jsx ← Animasi transisi antar halaman
    │   │   └── index.js        ← Ekspor semua layout component
    │   │
    │   └── common/             ← Komponen kecil reusable
    │       ├── Button.jsx      ← Tombol (Primary, Secondary, CTA)
    │       ├── Card.jsx        ← Kartu konten
    │       ├── Input.jsx       ← Form input field
    │       ├── Modal.jsx       ← Popup/dialog
    │       ├── Countdown.jsx   ← Timer hitung mundur
    │       ├── Stepper.jsx     ← Step indicator (1→2→3)
    │       ├── MapContainer.jsx ← Embed Google Maps
    │       └── index.js        ← Ekspor semua common component
    │
    ├── context/                ← State global (data yang dibagi antar halaman)
    │   ├── AuthContext.jsx     ← Data user login (siapa yang login?)
    │   ├── TicketOrderContext.jsx ← Data pesanan tiket aktif
    │   ├── ThemeContext.jsx    ← Dark/light mode preference
    │   └── index.js            ← Ekspor semua context
    │
    ├── hooks/                  ← Custom hooks yang dipakai di mana saja
    │   ├── useAuth.js          ← Akses data login (pakai AuthContext)
    │   ├── useMediaQuery.js    ← Deteksi ukuran layar (mobile/desktop)
    │   ├── useLocalStorage.js  ← Simpan & baca data dari localStorage
    │   ├── useScrollToTop.js   ← Auto scroll ke atas saat ganti halaman
    │   └── index.js            ← Ekspor semua global hook
    │
    ├── utils/                  ← Fungsi helper (tidak ada UI, murni logic)
    │   ├── constants.js        ← Nilai tetap (harga tiket, tanggal event, dll)
    │   ├── formatters.js       ← Format data (tanggal, harga → Rp 150.000)
    │   ├── validators.js       ← Validasi input (cek email valid, dll)
    │   ├── cn.js               ← Helper gabungkan class Tailwind
    │   └── index.js            ← Ekspor semua utils
    │
    └── features/               ← Modul per halaman/domain (INTI PROJECT)
        │
        ├── landing/            ← Halaman Home (dikerjakan Azzam)
        │   ├── index.js        ← Ekspor publik feature landing
        │   ├── LandingPage.jsx ← Halaman utama (rakit semua section)
        │   ├── components/     ← Komponen KHUSUS halaman ini
        │   │   ├── HeroSection.jsx
        │   │   ├── MascotMylo.jsx
        │   │   ├── WhatIsTedx.jsx
        │   │   ├── WhatIsTedxUA.jsx
        │   │   ├── VideoTeaser.jsx
        │   │   ├── GrandThemeMycelium.jsx
        │   │   ├── Subthemes.jsx
        │   │   ├── EventTimeline.jsx
        │   │   └── index.js
        │   └── hooks/          ← Hook KHUSUS halaman ini
        │       └── useTimelineAnimation.js
        │
        ├── static/             ← Halaman statis (dikerjakan Arvi)
        │   ├── index.js
        │   └── components/
        │       ├── AboutUsDetail.jsx
        │       ├── ThemePage.jsx
        │       ├── FAQAccordion.jsx
        │       ├── PrivacyPolicy.jsx
        │       └── TermsOfService.jsx
        │
        ├── events/             ← Halaman event (dikerjakan Daffa & Maysha)
        │   ├── index.js
        │   ├── components/
        │   │   ├── PreEventOne.jsx
        │   │   ├── PreEventTwo.jsx
        │   │   ├── PreEventThree.jsx
        │   │   ├── MainEventDetail.jsx
        │   │   ├── InteractiveWheel.jsx
        │   │   ├── EventCountdown.jsx
        │   │   ├── OpenArtSubmission.jsx  ← milik Maysha
        │   │   └── SubmissionForm.jsx     ← milik Maysha
        │   └── hooks/
        │       ├── useInteractiveWheel.js
        │       └── useArtSubmission.js    ← milik Maysha
        │
        ├── merchandise/        ← Halaman merch (dikerjakan Maysha)
        │   ├── index.js
        │   ├── components/
        │   │   ├── MerchCatalog.jsx
        │   │   ├── BundlesSection.jsx
        │   │   ├── ProductDetail.jsx
        │   │   ├── TryOnSlider.jsx
        │   │   └── TryOnDetailedView.jsx
        │   └── hooks/
        │       └── useProductTryOn.js
        │
        ├── tickets/            ← Halaman tiket (dikerjakan Adella)
        │   ├── index.js
        │   ├── components/
        │   │   ├── TicketBookingFlow.jsx  ← Halaman utama checkout
        │   │   ├── TierSelection.jsx
        │   │   ├── IdentifyStepper.jsx
        │   │   ├── PersonFormStep.jsx
        │   │   ├── SummaryPayment.jsx
        │   │   ├── QRISManualPayment.jsx
        │   │   └── SuccessVerification.jsx
        │   └── hooks/
        │       ├── useBookingStepper.js
        │       └── useQRISConfirmation.js
        │
        ├── auth/               ← Login/autentikasi (dikerjakan Adella)
        │   ├── index.js
        │   ├── components/
        │   │   └── LoginCard.jsx
        │   └── hooks/
        │       └── useLogin.js
        │
        ├── account/            ← Dashboard user (dikerjakan Adella)
        │   ├── index.js
        │   ├── components/
        │   │   ├── DashboardOverview.jsx
        │   │   ├── TicketWallet.jsx
        │   │   └── TransactionHistory.jsx
        │   └── hooks/
        │       └── useUserTickets.js
        │
        └── sponsorship/        ← Halaman sponsor (dikerjakan Alifia)
            ├── index.js
            ├── components/
            │   ├── ImpactPresenter.jsx
            │   ├── ReachMetricsGrid.jsx
            │   ├── ExposurePackages.jsx
            │   ├── SponsorMockup.jsx
            │   ├── PreviousPartners.jsx
            │   └── ContactSponsorForm.jsx
            └── hooks/
                └── useSponsorInquiry.js
```

---

## 🔄 Alur Data: Dari Entry Point Sampai Komponen

### Layer 1 — Bootstrap (saat pertama kali dibuka)
```
index.html
  └── <div id="root">        ← tempat React "ditanam"

main.jsx
  └── createRoot('#root')    ← React mulai berjalan
  └── render(<App />)        ← render komponen App
```

### Layer 2 — Setup Global (App.jsx)
```jsx
// App.jsx — urutan bungkus provider PENTING!
<AuthProvider>              ← data login tersedia di seluruh app
  <TicketOrderProvider>     ← data pesanan tersedia di seluruh app
    <BrowserRouter>         ← routing aktif
      <Navbar />            ← tampil di semua halaman
      <PageTransition>      ← animasi ganti halaman
        <AppRoutes />       ← halaman yang aktif
      </PageTransition>
      <Footer />            ← tampil di semua halaman
    </BrowserRouter>
  </TicketOrderProvider>
</AuthProvider>
```

### Layer 3 — Routing (routes.jsx)
```
URL /              → LandingPage
URL /about         → AboutUs
URL /events        → MainEventDetail
URL /tickets       → TicketBookingFlow  (protected, harus login)
URL /login         → LoginCard
URL /account       → DashboardOverview  (protected, harus login)
URL /sponsorship   → ImpactPresenter
```

### Layer 4 — Halaman Feature
```
LandingPage.jsx
  ├── HeroSection.jsx       ← ambil data dari props / hook
  ├── MascotMylo.jsx
  ├── WhatIsTedx.jsx
  ├── VideoTeaser.jsx       ← ambil URL video dari constants.js
  ├── GrandThemeMycelium.jsx
  ├── Subthemes.jsx
  └── EventTimeline.jsx     ← pakai useTimelineAnimation hook
```

---

## 📏 Aturan Import — Wajib Dipatuhi

### ✅ Yang BOLEH
```jsx
// 1. Import komponen dari feature SENDIRI (langsung)
import HeroSection from './components/HeroSection'

// 2. Import komponen global
import { Button } from '../../components/common'
import { Navbar } from '../../components/layout'

// 3. Import hook global
import useMediaQuery from '../../hooks/useMediaQuery'
import { useAuth } from '../../hooks'

// 4. Import utils & constants
import { formatCurrency } from '../../utils/formatters'
import { TICKET_PRICES } from '../../utils/constants'

// 5. Import context
import { useAuth } from '../../context/AuthContext'

// 6. Import dari feature LAIN → WAJIB lewat index.js
import { TicketBookingFlow } from '../tickets'
import { LandingPage } from '../landing'

// 7. Import asset
import logoImg from '../../assets/images/logo.png'
```

### ❌ Yang DILARANG
```jsx
// ❌ Import langsung ke file internal feature lain
import TicketBookingFlow from '../tickets/components/TicketBookingFlow'

// ❌ Import langsung tanpa lewat index.js
import { useBookingStepper } from '../tickets/hooks/useBookingStepper'
```

---

## 🧩 Fungsi Setiap Tipe File

| Tipe File | Fungsi | Contoh |
|---|---|---|
| `*Page.jsx` | Halaman lengkap, rakit semua section | `LandingPage.jsx` |
| `components/*.jsx` | Potongan UI yang bisa dipakai ulang | `HeroSection.jsx`, `Button.jsx` |
| `hooks/use*.js` | Logic yang bisa dipakai ulang, tanpa UI | `useMediaQuery.js` |
| `context/*Context.jsx` | State global antar halaman | `AuthContext.jsx` |
| `utils/*.js` | Fungsi murni, tidak ada React | `formatters.js` |
| `index.js` | Gerbang ekspor, tentukan apa yang "publik" | `features/landing/index.js` |
| `constants.js` | Nilai tetap yang tidak berubah | Harga tiket, URL API |
| `*.css` | Styling global | `theme.css`, `animations.css` |

---

## 💡 Tips Praktis untuk Tim

### Saat mulai mengerjakan feature baru:
```
1. Buka folder feature kamu di src/features/[namamu]/
2. Kerjakan di dalam komponen masing-masing
3. Kalau butuh komponen umum (Button, Modal) → ambil dari src/components/common/
4. Kalau butuh data login user → pakai useAuth() dari src/hooks/
5. Kalau sudah selesai → ekspor di index.js feature kamu
```

### Cara buat komponen baru:
```jsx
// src/features/landing/components/NamaKomponen.jsx

function NamaKomponen({ prop1, prop2 }) {
  // 1. Hooks di paling atas
  const [state, setState] = useState(null)

  // 2. Logic / handler
  const handleClick = () => { ... }

  // 3. Return UI (JSX) di paling bawah
  return (
    <div className="...">
      ...
    </div>
  )
}

export default NamaKomponen
```

### Cara daftarkan ke index.js:
```js
// src/features/landing/index.js
export { default as LandingPage } from './LandingPage'
export { HeroSection } from './components/HeroSection'
// tambahkan di sini setiap ada komponen baru
```
