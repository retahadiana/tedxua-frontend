# 🚀 Panduan Memulai (Developer Onboarding Guide)
## TEDx Universitas Airlangga 2026 - Frontend Team

Panduan ini ditujukan bagi seluruh staff developer frontend (volunteers) untuk memulai menyiapkan lingkungan kerja lokal (local development) masing-masing. Ikuti langkah-langkah di bawah ini secara runtut.

---

## 📋 Prasyarat Sebelum Mulai (Prerequisites)

Sebelum melakukan kloning proyek, pastikan komputer Anda sudah terpasang:
1.  **Node.js**: Gunakan versi LTS terbaru (sangat disarankan **Node.js v18** atau **v20** ke atas).
    *   Cek versi Node Anda dengan mengetik perintah ini di terminal/command prompt:
        ```bash
        node -v
        ```
2.  **Git**: Untuk kebutuhan manajemen versi kode dan kolaborasi tim.
    *   Cek versi Git Anda:
        ```bash
        git --version
        ```
3.  **Visual Studio Code (VS Code)**: Text editor yang direkomendasikan untuk pengembangan web.

---

## 🛠️ Langkah-Langkah Memulai

### 1. Kloning Repositori (Git Clone)
Buka terminal Anda (CMD, PowerShell, atau Terminal macOS/Linux) dan jalankan perintah kloning berikut:

```bash
git clone https://github.com/retahadiana/tedxua-frontend.git
```
*(Catatan: Sesuaikan URL repositori di atas jika menggunakan repositori Git resmi yang berbeda).*

Setelah proses unduhan kloning selesai, masuk ke dalam folder proyek:
```bash
cd tedxua-frontend
```

---

### 2. Duplikasi Berkas Environment (.env)
Proyek ini membutuhkan variabel lingkungan untuk konfigurasi API dan konfigurasi lokal. Di root folder proyek sudah disediakan template `.env.example`. 

Buat salinannya menjadi `.env` dengan menjalankan perintah di bawah ini:

*   **Untuk Windows (PowerShell):**
    ```powershell
    Copy-Item .env.example .env
    ```
*   **Untuk Windows (CMD):**
    ```cmd
    copy .env.example .env
    ```
*   **Untuk macOS / Linux:**
    ```bash
    cp .env.example .env
    ```
*Setelah berhasil menyalin, buka berkas `.env` yang baru dibuat dan isi variabel yang dibutuhkan sesuai arahan koordinator.*

---

### 3. Instalasi Dependensi (NPM Install)
Instal seluruh library pendukung (seperti React, Tailwind CSS, Framer Motion, dll.) yang terdaftar di dalam `package.json` dengan mengetik perintah berikut:

```bash
npm install
```
> [!IMPORTANT]  
> Jangan menghapus berkas `package-lock.json` sebelum atau sesudah menjalankan perintah ini. Berkas tersebut menjaga agar versi library di komputer Anda sama persis dengan komputer rekan tim lainnya.

---

### 4. Menjalankan Website Secara Lokal (NPM Run Dev)
Untuk menjalankan server pengembangan lokal (local development server), jalankan perintah:

```bash
npm run dev
```

Jika sukses, terminal akan menampilkan tautan lokal. Buka browser Anda dan akses halaman tersebut (biasanya):
👉 **`http://localhost:5173`**

---

### 5. Aturan Pembuatan Cabang Kerja Git (Branching Policy)
Sebelum mulai menulis kode, **jangan pernah mengedit langsung di branch `main`**. Anda wajib membuat branch baru dari `main` sesuai fitur yang ditugaskan kepada Anda.

*   Pastikan posisi Anda berada di branch `main` terbaru:
    ```bash
    git checkout main
    git pull origin main
    ```
*   Buat branch baru (gunakan penamaan: `feature/nama-fitur`):
    ```bash
    # Contoh untuk Azzam (Landing Page):
    git checkout -b feature/landing-page
    ```
*   Setelah selesai mengode, lakukan *commit* dan push branch Anda ke server Git:
    ```bash
    git add .
    git commit -m "feat(landing): menyelesaikan slicing hero section dan animasi"
    git push origin feature/landing-page
    ```
*   Setelah push, buat **Pull Request (PR)** di GitHub untuk ditinjau oleh Git Buddy (Alifia) sebelum di-merge ke branch `main`.

---

### ⚠️ Pengingat Aturan Arsitektur Proyek
*   Seluruh file fitur Anda diletakkan di bawah direktori `src/features/[fitur-anda]/`.
*   **Dilarang keras melakukan lintas impor file internal antar-fitur secara langsung.**
*   Gunakan pintu gerbang `index.js` di dalam folder fitur Anda untuk mengekspos komponen yang boleh digunakan di luar modul.
