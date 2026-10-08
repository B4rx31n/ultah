# Web ulang tahun

Web statis tanpa instalasi paket. Alurnya: masukkan tanggal di layar ponsel, buka kado, lihat pita menyembur sebelum bunga muncul dan foto-foto kenangan turun seperti hujan tanpa henti sampai halaman ditutup, lalu scroll untuk membaca cerita dan surat. Hujan foto memakai gambar pada entri kenangan di `content.js`. Musik instrumental romantis ada di `assets/romance.wav`, sehingga tidak perlu koneksi internet. Musik mulai saat kado diketuk dan bisa diputar atau dijeda lewat tombol di atas.

## Menjalankan

Dari folder proyek:

```bash
python3 -m http.server 8000
```

Buka `http://localhost:8000` di browser. Kode masuk: **14102006** (14 Oktober 2006, format DDMMYYYY). Ini kejutan interaktif, bukan pengamanan data sungguhan karena kodenya ada di JavaScript.

## Mengisi foto dan cerita kalian

1. Buat folder `assets` dan masukkan foto kalian, misalnya `assets/pertama.jpg`.
2. Buka `content.js`. Pada setiap kenangan, isi `story` dengan cerita yang sebenarnya dan `photo` dengan jalur file fotonya. Contoh:

```js
{
  title: 'Awal cerita kita',
  story: 'Ceritakan kenangan pertama kalian di sini.',
  prompt: 'Teks petunjuk ini hanya tampil bila story masih kosong.',
  photo: 'assets/pertama.jpg',
  alt: 'Deskripsi singkat foto untuk pembaca layar',
  caption: 'awal cerita'
}
```

Saat `story` atau `photo` masih kosong, web menampilkan placeholder yang jelas. Bingkai placeholder ikut turun seperti foto sampai foto asli diisi. Jika jalur foto salah, muncul pesan kesalahan di bingkai foto. Teks surat ulang tahun ada di `index.html` bagian `letter-section` bila ingin diganti dengan pesan pribadi.

Browser biasanya mengizinkan suara hanya setelah pengguna mengetuk tombol. Karena itu musik mulai saat kado diketuk, bukan saat halaman dimuat. Jika tidak terdengar, periksa volume perangkat atau ketuk **Putar musik**. Saat pengguna mengaktifkan **reduced motion**, hujan sakura dan animasi ledakan dimatikan, tetapi kado tetap terbuka.

## Hosting dengan GitHub Pages

Workflow di `.github/workflows/deploy-pages.yml` menerbitkan situs setiap kali ada push ke branch `main`. Di GitHub, buka **Settings → Pages**, lalu pilih **GitHub Actions** sebagai sumber deployment. Setelah workflow selesai, URL situs akan tampil di **Settings → Pages** dan ringkasan workflow.

Deployment hanya mengunggah file situs (`index.html`, `styles.css`, `app.js`, `content.js`, dan `assets/`), bukan file dokumentasi atau konfigurasi lainnya.
