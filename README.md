duit.io 💸
Aplikasi pengelolaan keuangan pribadi yang simpel, cepat, dan intuitif untuk melacak pemasukan serta pengeluaran harianmu.

Fitur Utama
📊 Dashboard Ringkas: Lihat total saldo, pemasukan, dan pengeluaran secara real-time.

🏷️ Kategorisasi Transaksi: Kelompokkan pengeluaran (makanan, transportasi, hiburan, dll.) dengan mudah.

📈 Laporan & Grafik: Visualisasi tren keuangan harian, mingguan, hingga bulanan.

💾 Penyimpanan Lokal: Data tersimpan aman di peranti pengguna tanpa pengumpulan data pribadi.

📱 Desain Responsif: Tampilan optimal untuk perangkat desktop maupun smartphone.

Prakondisi & Instalasi
Pastikan kamu sudah menginstal Node.js dan peramban web modern di perangkatmu.

1. Klon Repository
Bash
git clone https://github.com/fellyonhart/Expanse-tracker-duit
cd Expanse-tracker-duit
2. Instal Dependensi
Bash
npm install
3. Jalankan Server Pengembang
Bash
npm run dev
Buka http://localhost:5173 (atau port yang tertera pada terminal) di peramban web kamu.

Struktur Proyek
Plaintext
duit.io/
├── public/          # Aset statis (favicon, logo)
├── src/
│   ├── assets/      # Gambar dan berkas gaya global
│   ├── components/  # Komponen UI (Card, Form, Navbar, dll.)
│   ├── utils/       # Fungsi pembantu (format mata uang, tanggal)
│   ├── App.jsx      # Komponen utama
│   └── main.jsx     # Titik masuk aplikasi
├── package.json
└── README.md
Teknologi yang Digunakan
Frontend: React / HTML5 & CSS3

Styling: Tailwind CSS

Build Tool: Vite

Icon: Lucide React / FontAwesome

Kontribusi
Kontribusi selalu terbuka! Jika kamu ingin mengembangkan fitur baru atau memperbaiki kutu (bug):

Fork repositori ini.

Buat branch fitur baru (git checkout -b fitur/FiturBaru).

Lakukan commit perubahan (git commit -m 'Menambahkan FiturBaru').

Push ke branch tersebut (git push origin fitur/FiturBaru).

Buat Pull Request.
