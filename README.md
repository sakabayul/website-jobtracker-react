# 💼 Job & Project Tracker

Website ini membantu kamu dalam **melacak proses rekrutmen** dan **mengelola proyek-proyek** yang sedang dikerjakan, dengan tampilan yang interaktif dan penyimpanan lokal menggunakan **LocalStorage**. Cocok untuk individu yang ingin memantau progress karier dan proyek secara efisien.

![Screenshot](./assets/project-portfolio-9-1.png)

Sebagai seorang web developer, saya melihat adanya kebutuhan untuk melacak proses rekrutmen dan proyek secara lebih terorganisir, terutama bagi individu yang sedang mencari pekerjaan atau mengerjakan banyak proyek secara bersamaan. Karena itu, saya membangun Job & Project Tracker — sebuah aplikasi web yang ringan dan intuitif.

---

## Getting Started

### For local development
You'll need:
- Node.js (v18 ke atas) > Bisa diunduh dari: https://nodejs.org
- NPM (terinstall otomatis bersama Node.js)
- Git (opsional, jika ingin clone dari repo) > Bisa diunduh dari: https://git-scm.com

### 🚀 Fitur

- ✅ Tambah/Edit/Hapus data pekerjaan (job) dan proyek.
- 📊 Dashboard statistik posisi pekerjaan dan status proyek.
- 📅 Tampilan kalender (FullCalendar) untuk melihat jadwal interview atau deadline proyek.
- 🔍 Fitur filter berdasarkan tanggal.
- 📈 Chart visualisasi data menggunakan **Highcharts**.
- 📦 Penyimpanan data menggunakan **LocalStorage** (tanpa database/back-end).
- ⚡ UI responsif menggunakan **Tailwind CSS**.
- 💬 Komponen input seperti dropdown `Creatable` dengan pilihan custom.

---

### 🛠️ Teknologi

- **React** + **Vite**
- **Tailwind CSS**
- **Highcharts**
- **React Select** (Creatable Select)
- **FullCalendar**
- **LocalStorage API**

---

### 📂 Local Development

Clone repository:

```bash
git clone https://github.com/username/job-tracker.git
cd job-tracker
```

Install dependencies:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Buka di browser:

```bash
http://localhost:5173/
```