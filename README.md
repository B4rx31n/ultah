# Web ulang tahun

Web statis tanpa instalasi paket. Alurnya: masukkan tanggal di layar ponsel, buka kado, lihat pita menyembur sebelum bunga muncul dan lima foto kenangan turun bersamaan dengan posisi, kemiringan, serta waktu jatuh yang berbeda-beda, jadi terlihat lebih berantakan. Setelah semuanya selesai turun, ada jeda 15 detik sebelum lima foto berikutnya muncul. Lalu scroll untuk membaca tiga cerita bergambar, surat, dan album foto. Hujan foto dan album memakai daftar `albumPhotos` di `content.js`, jadi foto yang ditambahkan otomatis bergiliran turun sekaligus masuk ke album. Album berbentuk buku hardcover pastel: buka sampulnya, lalu balik halaman demi halaman, setiap halaman berisi 9 foto dalam bingkai. Album memuat semua 140 foto dari folder `full foto/`. Halaman dibalik dengan mengklik sisi buku, menekan tombol panah kiri atau kanan saat buku difokuskan, atau memakai tombol di bawah buku. Musik Love Songs diputar dari [music/love-songs.mp3](./music/love-songs.mp3); musik mulai saat kado dibuka dan tombol di bagian atas dapat dipakai untuk putar/jeda.

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

Foto album ada di daftar `albumPhotos` pada `content.js` yang sama. Setiap 9 foto menjadi satu halaman buku dan sisanya mengisi halaman terakhir. Buku dimulai dari sampul bertuliskan "Album Kita", diakhiri halaman penutup, dan menampilkan pesan bila daftarnya kosong. Bila ada foto yang tidak bisa dibuka, bingkainya menampilkan "Foto belum bisa dibuka" tanpa mengganggu halaman lain.

Foto yang dipakai web disimpan di `assets/foto/` dalam bentuk JPEG progresif lebar maksimal 900 piksel, supaya hujan foto dan balik halaman tetap lancar. Foto asli tetap tidak berubah di folder `full foto/`. Bila kamu menambahkan foto baru, masukkan jalur aslinya ke daftar `albumPhotos`, lalu buat salinan ukuran webnya di `assets/foto/` dengan cara yang sama.

File sumber yang kamu tambahkan di `music/` berupa audio AAC dalam kontainer MP4/DASH, bukan berkas MP3 biasa. Situs memakai versi browser-compatible [music/love-songs.mp3](./music/love-songs.mp3); file sumber tetap tidak diubah. Browser biasanya mengizinkan suara hanya setelah interaksi pengguna, jadi musik mulai saat kado diketuk. Jika tidak terdengar, periksa volume perangkat atau ketuk **Putar lagu**. Saat pengguna mengaktifkan **reduced motion**, hujan sakura dan animasi ledakan dimatikan, balik halaman album menjadi instan, tetapi kado tetap terbuka.

## Hosting dengan GitHub Pages

Workflow di `.github/workflows/deploy-pages.yml` menerbitkan situs setiap kali ada push ke branch `main`. Di GitHub, buka **Settings → Pages**, lalu pilih **GitHub Actions** sebagai sumber deployment. Setelah workflow selesai, URL situs akan tampil di **Settings → Pages** dan ringkasan workflow.

Deployment mengunggah file situs (`index.html`, `styles.css`, `app.js`, `content.js`, `assets/`, dan `music/love-songs.mp3`), bukan file dokumentasi atau konfigurasi lainnya.
