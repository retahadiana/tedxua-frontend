# TEDx Universitas Airlangga 2026 - Frontend Architecture Blueprint

Selamat datang di repositori resmi TEDx Universitas Airlangga 2026. Proyek ini dibangun menggunakan **React.js (Vite)**, **Tailwind CSS**, dan **Framer Motion**.

Dokumen ini menjelaskan cetak biru arsitektur folder (**Clean Architecture / Feature-Driven Design**) yang dirancang untuk mendukung kolaborasi paralel oleh **6 Staff Developer Frontend (Volunteers)**.

---

## 🏗️ Prinsip Arsitektur (Clean & Feature-Driven Architecture)

Struktur direktori di dalam `src/` dibagi menjadi dua lapisan utama:

1. **Global/Shared Layer (`src/components/`, `src/context/`, etc.)**:
   Menyimpan aset, komponen UI universal, utilitas, state global, dan konfigurasi tema yang digunakan di seluruh aplikasi.
2. **Domain/Feature Layer (`src/features/`)**:
   Setiap folder di dalam `features/` merepresentasikan satu domain fungsional atau modul bisnis yang berdiri sendiri (self-contained). Fitur/modul **tidak boleh saling mengimpor file internal fitur lain secara langsung**. Interaksi antar-fitur wajib melalui file **index eksposur (`index.js`)** di root masing-masing fitur.

---

## 👥 Matriks Distribusi Tugas & Penugasan File (6 Volunteers)

### Detail Penugasan File & Target Fitur Teknis

Berikut adalah detail folder, file, dan fitur spesifik yang wajib dikerjakan oleh masing-masing developer berdasarkan pembagian di atas:

### 1. Azzam (Home Page Developer)
*   **Alokasi Halaman & Fitur Figma:**
    *   **Home Page (Landing Page)**
*   **Folder yang Dikerjakan:**
    *   `src/features/landing/`
*   **File yang Dikerjakan:**
    *   `src/features/landing/components/HeroSection.jsx`
    *   `src/features/landing/components/MascotMylo.jsx`
    *   `src/features/landing/components/WhatIsTedx.jsx`
    *   `src/features/landing/components/WhatIsTedxUA.jsx`
    *   `src/features/landing/components/VideoTeaser.jsx`
    *   `src/features/landing/components/GrandThemeMycelium.jsx`
    *   `src/features/landing/components/Subthemes.jsx`
    *   `src/features/landing/components/EventTimeline.jsx`
    *   `src/features/landing/hooks/useTimelineAnimation.js`
*   **Target Fitur Teknis:**
    *   **5-Slide Landing Page:** Slicing dan animasi Framer Motion untuk:
        *   Slide 1 & 2: Pengenalan maskot Mylo dan deskripsi "What is TEDx / TEDxUA".
        *   Slide 3: Video teaser pemutar cuplikan tahun lalu dengan watermark grand theme.
        *   Slide 4: Penjelasan grand theme "The Mycelium" dan subthemes (The Gardeners of Becoming, The Invisible String, The Slow Unfolding) dengan tombol detail sub-tema interaktif.
        *   Slide 5: Event Timeline Hub (navigasi linimasa seluruh mata acara).

---

### 2. Arvi (Info & About Developer)
*   **Alokasi Halaman & Fitur Figma:**
    *   **About Us Page**
    *   **Theme Page**
    *   **FAQ Page**
    *   **Legal Pages (Privacy Policy & Terms of Service)**
*   **Folder yang Dikerjakan:**
    *   `src/features/static/`
*   **File yang Dikerjakan:**
    *   `src/features/static/components/AboutUsDetail.jsx`
    *   `src/features/static/components/ThemePage.jsx`
    *   `src/features/static/components/FAQAccordion.jsx`
    *   `src/features/static/components/PrivacyPolicy.jsx`
    *   `src/features/static/components/TermsOfService.jsx`
*   **Target Fitur Teknis:**
    *   Slicing HTML/CSS (Tailwind) berfokus pada layout statis informatif, responsivitas mobile, dan keterbacaan:
        *   **About Us Page:** Teks informatif yang rapi beserta penyisipan aset maskot Mylo statis.
        *   **Theme Page:** Pengenalan detail visual tema utama dan sub-tema.
        *   **FAQ Page & Ticketing Support Contact:** Menu akordeon interaktif untuk tanya-jawab umum beserta jam operasional bantuan.
        *   **Ticketing Privacy & ToS:** Halaman regulasi keamanan data dan aturan transaksi tiket.

---

### 3. Daffa (Event Pages Developer)
*   **Alokasi Halaman & Fitur Figma:**
    *   **Prevent Theme Page (3 Page)**
    *   **Main Events (1 Page)**
*   **Folder yang Dikerjakan:**
    *   `src/features/events/` (khusus komponen Event & Pre-Event/Prevent)
*   **File yang Dikerjakan:**
    *   `src/features/events/components/PreEventOne.jsx`
    *   `src/features/events/components/PreEventTwo.jsx`
    *   `src/features/events/components/PreEventThree.jsx`
    *   `src/features/events/components/MainEventDetail.jsx`
    *   `src/features/events/components/StudentSpeaker.jsx`
    *   `src/features/events/components/CampusList.jsx`
    *   `src/features/events/components/InteractiveWheel.jsx`
    *   `src/features/events/components/ActivityScroll.jsx`
    *   `src/features/events/components/TedTalksSessions.jsx`
    *   `src/features/events/components/InteracTedSection.jsx`
    *   `src/features/events/components/InspiraTedSection.jsx`
    *   `src/features/events/components/EventCountdown.jsx`
    *   `src/features/events/hooks/useInteractiveWheel.js`
*   **Target Fitur Teknis:**
    *   **Interactive Wheel (Pre-Event 2):** Animasi rotasi koordinat roda menggunakan CSS transform / JS scroll.
    *   **Venue & Date Widget (Pre-Event 2):** Desain widget layout bergaya iOS/Apple modern terintegrasi dengan Google Maps.
    *   **Interactive Hover Description (Main Event):** Deskripsi dinamis saat judul di-hover kursor.
    *   **Taking Root Countdown:** Penghitung mundur interaktif H-30 (`EventCountdown.jsx`).
    *   **Embed Video Teaser:** Pemutar video teaser di halaman Event.

---

### 4. Maysha (Shop & Art Pages Developer)
*   **Alokasi Halaman & Fitur Figma:**
    *   **Art Submission Page**
    *   **Merch Page Page (Katalog & Detail)**
*   **Folder yang Dikerjakan:**
    *   `src/features/merchandise/`
    *   `src/features/events/` (khusus sub-modul Art Submission)
*   **File yang Dikerjakan:**
    *   `src/features/merchandise/components/MerchCatalog.jsx`
    *   `src/features/merchandise/components/BundlesSection.jsx`
    *   `src/features/merchandise/components/ProductDetail.jsx`
    *   `src/features/merchandise/components/TryOnSlider.jsx`
    *   `src/features/merchandise/components/TryOnDetailedView.jsx`
    *   `src/features/merchandise/hooks/useProductTryOn.js`
    *   `src/features/events/components/OpenArtSubmission.jsx`
    *   `src/features/events/components/SubmissionForm.jsx`
    *   `src/features/events/hooks/useArtSubmission.js`
*   **Target Fitur Teknis:**
    *   **Dynamic Side Menu:** Toggle menu samping (titik tiga) untuk membuka katalog merch.
    *   **Katalog Grid:** Layout grid responsif untuk kategori "BUNDLES" dan "PRODUCTS".
    *   **Product Detail Pop-up / Page:** Variant Selector, Quantity Changer (+ / -), dan tombol "Buy Now" mengarah ke Google Form.
    *   **Footer Try-On Slider:** Slider horizontal menampilkan foto real-life produk.
    *   **Art Submission Page:** T&C, persyaratan, manfaat, unduh Guidebook, serta form pendaftaran (link Google Form).

---

### 5. Adella (Ticket Pages & Auth Developer)
*   **Alokasi Halaman & Fitur Figma:**
    *   **Ticketing Page (Checkout Flow & Halaman Utama)**
*   **Folder yang Dikerjakan:**
    *   `src/features/tickets/`
    *   `src/features/auth/`
    *   `src/features/account/`
    *   `src/context/` (Auth & Ticket Context)
*   **File yang Dikerjakan:**
    *   `src/features/tickets/components/TicketBookingFlow.jsx`
    *   `src/features/tickets/components/TierSelection.jsx`
    *   `src/features/tickets/components/IdentifyStepper.jsx`
    *   `src/features/tickets/components/PersonFormStep.jsx`
    *   `src/features/tickets/components/SummaryPayment.jsx`
    *   `src/features/tickets/components/QRISManualPayment.jsx`
    *   `src/features/tickets/components/SuccessVerification.jsx`
    *   `src/features/tickets/hooks/useBookingStepper.js`
    *   `src/features/tickets/hooks/useQRISConfirmation.js`
    *   `src/features/auth/components/LoginCard.jsx`
    *   `src/features/auth/hooks/useLogin.js`
    *   `src/features/account/components/DashboardOverview.jsx`
    *   `src/features/account/components/TicketWallet.jsx`
    *   `src/features/account/components/TransactionHistory.jsx`
    *   `src/features/account/hooks/useUserTickets.js`
    *   `src/context/AuthContext.jsx`
    *   `src/context/TicketOrderContext.jsx`
*   **Target Fitur Teknis:**
    *   **Authentication Guard:** Proteksi halaman checkout agar otomatis mengarahkan user belum login ke Sign-In.
    *   **Mushroom Event Selector:** Animasi tanaman jamur berakar interaktif sebagai navigasi auto-scroll ke bagian tier tiket.
    *   **Tier Ticket Selector:** Pilihan tier interaktif (Early Bird, Presale 1 & 2, Normal, Terusan) dengan validasi stok/kuantitas.
    *   **Dynamic Checkout Form (Identify):** Perulangan form data diri dinamis (Nama, Email, No. WA) berdasarkan kuantitas tiket yang dibeli.
    *   **QRIS Payment & WA Chatbot Integration:** Gambar QRIS statis dengan tombol konfirmasi direct API WhatsApp ke CP (Lila/Dimas) beserta format draf pesan konfirmasi otomatis.
    *   **Confirmation State:** Halaman penutup proses verifikasi pasca-transaksi tiket berhasil.

---

### 6. Alifia (Sponsorship Developer & Git Buddy)
*   **Alokasi Halaman & Fitur Figma:**
    *   **Sponsorship Page (1 Page)**
*   **Folder yang Dikerjakan:**
    *   `src/features/sponsorship/`
*   **File yang Dikerjakan:**
    *   `src/features/sponsorship/components/ImpactPresenter.jsx`
    *   `src/features/sponsorship/components/ReachMetricsGrid.jsx`
    *   `src/features/sponsorship/components/ExposurePackages.jsx`
    *   `src/features/sponsorship/components/SponsorMockup.jsx`
    *   `src/features/sponsorship/components/PreviousPartners.jsx`
    *   `src/features/sponsorship/components/ContactSponsorForm.jsx`
    *   `src/features/sponsorship/hooks/useSponsorInquiry.js`
*   **Target Fitur Teknis:**
    *   **Git Buddy / Git Management:** Bertanggung jawab mengatur setup Git, review branch sebelum merge, menyelesaikan konflik merge, serta koordinasi alur kerja tim.
    *   **Segmented Landing Panel:** Navigasi interaktif masuk ke 3 sektor sponsor/partner.
    *   **Infographics & Data Visualization:** Visualisasi data audiens (gender, demografi, kecepatan penjualan tiket) secara interaktif (CSS/SVG murni atau Chart.js ringan).
    *   **Logo Partner Grid:** Grid logo mitra terdahulu yang responsif.
    *   **Direct Contact CTAs:** Tombol kontak email (mailto:) dan tautan langsung ke WhatsApp penanggung jawab sponsorship.

---

## 🔗 Alur Integrasi Kerja Front End

Agar koordinasi berjalan mulus, pastikan alur berikut dipatuhi:
1.  **Alifia** menyelesaikan struktur dasar repositori Git sebelum anggota tim melakukan push pertama.
2.  **Arvi** merancang komponen/halaman statis (About Us & Theme Page) terlebih dahulu (bisa menggunakan data tiruan/dummy).
3.  **Maysha** berkoordinasi dengan **Azzam** untuk menampilkan modal Detail Produk langsung dari menu samping yang ada di Landing Page.
4.  **Daffa** dan **Adella** harus aktif berkomunikasi mengenai transisi data state dari tombol "Buy Ticket" di Halaman Event (Daffa) menuju alur Checkout Sistem Tiket (Adella).
#   t e d x u a - f r o n t e n d  
 