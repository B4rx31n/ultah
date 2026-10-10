# Web ulang tahun

Web statis tanpa instalasi paket. Alurnya: masukkan tanggal di layar ponsel, buka kado, lihat pita menyembur dan bunga muncul, lalu scroll untuk membaca 10 kalimat kenangan dengan satu foto di samping tiap kalimat, surat, dan album. Semua 10 foto dari `solo/` ditampilkan satu per satu dalam bingkai. Buku album mempertahankan sampul hardcover bertuliskan "Album Kita"; setelah dibuka, satu foto pembuka dari `cover/` dan lima halaman ucapan tampil sebelum 11 foto album utama: 10 foto dari `album/` dan satu foto yang dipindahkan dari `cover/`. Setiap halaman album berisi hingga 9 foto dalam bingkai. Halaman dibalik dengan mengklik sisi buku, menekan tombol panah kiri atau kanan saat buku difokuskan, atau memakai tombol di bawah buku. Musik Love Songs diputar dari [music/love-songs.mp3](./music/love-songs.mp3); musik mulai saat kado dibuka dan tombol di bagian atas dapat dipakai untuk putar/jeda.

## Menjalankan

Dari folder proyek:

```bash
python3 -m http.server 8000
```

Buka `http://localhost:8000` di browser. Kode masuk: **11102006** (11 Oktober 2006, format DDMMYYYY). Setelah kode benar, halaman berlanjut dari kalender Oktober ke ucapan ulang tahun dan kejutan bunga. Ini kejutan interaktif, bukan pengamanan data sungguhan karena kodenya ada di JavaScript.

## Mengisi foto dan cerita kalian

1. Simpan foto untuk cerita di folder `solo/`, foto album di `album/`, dan foto pembuka di `cover/`.
2. Buka `content.js`. Isi satu kalimat untuk setiap kenangan di `memories`, lalu cantumkan foto yang sesuai pada urutan yang sama di `soloPhotos`. Contoh:

```js
memories: [
  { story: 'Semoga hari ini memberimu banyak alasan untuk tersenyum.', alt: 'Kenangan ulang tahun nomor 1', caption: 'hari bahagia' }
],
soloPhotos: ['solo/pertama.jpg']
```

Saat kalimat kenangan masih kosong, web menampilkan placeholder yang jelas. Jika jalur foto salah, muncul pesan kesalahan di bingkai foto. Teks surat ulang tahun ada di `index.html` bagian `letter-section` bila ingin diganti dengan pesan pribadi.

Foto cerita, pembuka, dan album tercatat pada `soloPhotos`, `coverPhotos`, dan `albumPhotos` di `content.js`. Foto pertama di album berasal dari foto pembuka pertama; satu foto tersisa di `cover/` menjadi halaman pembuka. Lima halaman ucapan ditulis di `introPages`. Setiap 9 foto album menjadi satu halaman buku dan sisanya mengisi halaman terakhir. Buku diakhiri halaman penutup. Bila ada foto yang tidak bisa dibuka, bingkainya menampilkan pesan tanpa mengganggu halaman lain.

File sumber yang kamu tambahkan di `music/` berupa audio AAC dalam kontainer MP4/DASH, bukan berkas MP3 biasa. Situs memakai versi browser-compatible [music/love-songs.mp3](./music/love-songs.mp3); file sumber tetap tidak diubah. Browser biasanya mengizinkan suara hanya setelah interaksi pengguna, jadi musik mulai saat kado diketuk. Jika tidak terdengar, periksa volume perangkat atau ketuk **Putar lagu**. Saat pengguna mengaktifkan **reduced motion**, hujan sakura dan animasi ledakan dimatikan, balik halaman album menjadi instan, tetapi kado tetap terbuka.

## Hosting dengan GitHub Pages

Workflow di `.github/workflows/deploy-pages.yml` menerbitkan situs setiap kali ada push ke branch `main`. Di GitHub, buka **Settings → Pages**, lalu pilih **GitHub Actions** sebagai sumber deployment. Setelah workflow selesai, URL situs akan tampil di **Settings → Pages** dan ringkasan workflow.

Deployment mengunggah file situs (`index.html`, `styles.css`, `app.js`, `content.js`, folder `album/`, `cover/`, `solo/`, dan seluruh isi `music/`), bukan file dokumentasi atau konfigurasi lainnya.
