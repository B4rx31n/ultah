# Pemeriksaan akhir antislop

Design Read: surat ulang tahun interaktif untuk orang tersayang, gaya scrapbook editorial lembut. ENERGY 2 / RHYTHM 3 / MOTION 2.

## Hard Gate

- R-02 PASS: `index.html`, `app.js`, `content.js`, `README.md`, dan `DESIGN.md` tidak memakai em dash dalam teks buatan situs.
- R-03 PASS: browser diuji pada 1440, 768, 390, 320, 280, 240, dan 200 CSS px; tidak ada scroll horizontal atau kontrol yang terpotong.
- R-17 PASS: angka hanya tanggal sandi dan nomor urutan kenangan yang disediakan, bukan statistik tanpa sumber.
- R-18 PASS: tidak ada avatar atau testimoni rekaan.
- R-23 PASS: bunga, pita, hati kertas pada kado, dan foto diminta; foto pribadi memakai entri content.js atau placeholder berlabel, bukan foto rekaan.
- R-24 PASS: tautan hanya menuju `#atas` dan `#cerita`, keduanya ada dan dapat dikunjungi.
- R-25 PASS: pemeriksa kontras mencatat teks utama dan sekunder pada latar masing-masing di atas 4.5:1; tombol putih pada rose 7.09:1.
- R-26 PASS: PIN, hapus, buka halaman, ledakan pita/replay kado, hujan foto per kenangan, putar/jeda musik lokal, dan semua tautan memiliki perilaku yang diuji.
- R-27 PASS: kenangan kosong menampilkan instruksi; foto pada halaman cerita dan hujan foto memiliki placeholder, status memuat, serta pesan kesalahan yang diuji di browser.
- R-28 PASS: tidak ada FAQ yang dibuat-buat.
- R-32 PASS: input memiliki label, fokus terlihat, Tab mencapai navigasi dan tombol, Enter membuka kado, serta tombol asli mendukung Space.
- R-33 PASS: perilaku UI ditulis langsung di `app.js` dan `styles.css`, bukan lewat skrip patch.
- R-34 PASS: tidak ada toggle tema; tema pastel tetap sesuai permintaan.
- R-35 PASS: server HTTP dan Chromium dijalankan; animasi hujan tetap aktif setelah beberapa putaran, foto berhasil/gagal dimuat, reduced motion, dan posisi bingkai diuji tanpa overflow pada 200/280/320/390/768/1440 CSS px.
- R-36 PASS: tidak ada klaim keamanan, performa, pelanggan, atau angka fiktif.
- R-37 PASS: arah pengguna dan alasan keputusan dicatat di `DESIGN.md` sebelum pembuatan.
- R-38 PASS: cerita serta foto yang belum diberikan memakai placeholder terlihat, sementara surat hanya berisi ucapan umum tanpa kisah palsu.

## Purpose Gate

- R-01 PASS: pink pastel dan krem mengikuti brief romantis; gradasi lembut hanya menonjolkan area kejutan kado.
- R-04 PASS: ikon hati, nada, bunga, dan pita terkait langsung dengan kejutan, musik, dan tema ulang tahun.
- R-06 PASS: serif literer membangun suasana surat, sans menjaga keterbacaan petunjuk dan kontrol.
- R-07 PASS: lingkar tipis di belakang ponsel dan kado memusatkan perhatian, bukan grid dekoratif.
- R-08 PASS: panah hanya pada aksi membuka, melanjutkan cerita, dan kembali ke atas sebagai petunjuk arah.
- R-09 PASS: tidak ada badge status palsu atau pill di atas judul.
- R-10 PASS: tidak ada lapisan blur kaca.
- R-12 PASS: bayangan hanya pada ponsel, kado, bingkai foto, dan surat agar terasa seperti benda nyata.
- R-13 PASS: tidak ada glow berulang pada seluruh halaman.
- R-14 PASS: kenangan berupa bab dan bingkai foto bergantian, bukan kartu fitur seragam.
- R-19 PASS: pita menyembur, bunga muncul, lalu hujan foto kenangan berulang terus atas permintaan; reduced motion menampilkan kejutan tanpa jeda animasi.
- R-22 PASS: buket SVG merupakan isi kado yang diminta, bukan ilustrasi stok tanpa hubungan.
- R-04 PASS: motif hati kertas melambangkan kasih sayang dan tampak sebagai segel lipatan yang menempel pada kado.

## Liveliness

- Dial PASS: ENERGY 2 / RHYTHM 3 / MOTION 2 tertulis di `DESIGN.md` dan terasa sepanjang alur.
- Konsistensi PASS: layar PIN, kejutan, kenangan bergantian, dan surat memakai komposisi berbeda sesuai RHYTHM 3.
- Fokus PASS: PIN menjadi fokus layar awal; kado menjadi fokus halaman hadiah; foto/cerita dan surat memimpin bagiannya.
- Ruang PASS: area hadiah longgar untuk antisipasi, sedangkan bab kenangan lebih rapat agar terasa seperti album.
- Aksen PASS: rose tua mengarahkan perhatian pada aksi utama dan kata penting, tidak dipakai sebagai latar semua elemen.
- Motif PASS: bunga dan pita berulang sebagai identitas yang berasal dari brief.
- Design Read PASS: arah dan dial dinyatakan sebelum pembuatan di `DESIGN.md`.

## Craftsmanship dan Quality Locks

- C-1 PASS: alasan warna, tata letak, huruf, jarak, bingkai, dan ilustrasi tertulis di `DESIGN.md`.
- C-2 PASS: tidak ada tombol mati; semua kontrol diuji melalui klik atau Enter.
- C-3 PASS: bagian halaman mengikuti urutan sandi, kado, kenangan, surat, bukan template promosi.
- C-4 PASS: keadaan foto berhasil/gagal, keyboard, reduced motion, serta lebar 200/280/320/390/768/1440 CSS px diuji tanpa overflow horizontal.
- C-5 PASS: tidak ada klaim fakta, testimoni, atau statistik fiktif.
- R-05 PASS: komposisi berubah mengikuti kisah, tanpa grid fitur atau struktur landing page generik.
- R-11 PASS: tombol bulat dan ponsel membulat, sementara kertas surat serta polaroid bersudut tegas.
- R-15 PASS: label aksi menyebut perilakunya, seperti `Buka kejutan` dan `Lanjut ke cerita kita`.
- R-16 PASS: teks tidak memakai jargon pemasaran AI.
- R-20 PASS: interaksi kado-ke-buket dan bingkai kenangan membuat identitas situs spesifik.
- R-21 PASS: tema terang pastel dipilih karena langsung diminta oleh pengguna.
- R-29 PASS: krem, blush, dan rose menjadi palet inti; sage hanya hadir pada daun buket.
- R-30 PASS: tidak meniru susunan atau tampilan produk populer.
- R-31 PASS: tiap keputusan visual utama memiliki alasan satu baris di `DESIGN.md`.

## Pengiriman 2026-10-09: album buku hardcover dan 41 foto

Design Read tambahan: buku album foto hardcover sekolah untuk bagian akhir situs, memakai dial ENERGY 2 / RHYTHM 3 / MOTION 2 yang sama.

- R-02 PASS: teks baru (sampul "Album Kita", halaman penutup, petunjuk balik halaman) tanpa em dash.
- R-03 PASS: Chromium headless di 1440, 768, 390, 320, 280, dan 200 CSS px; scrollWidth sama dengan clientWidth di semua lebar dan buku tetap dalam viewport.
- R-23 PASS: foto adalah foto pribadi pengguna dari folder `full foto` yang didaftarkan di `content.js`, bukan foto rekaan; judul cover "Album Kita" dipilih pengguna.
- R-26 PASS: klik sisi kanan dan kiri buku, tombol prev/next, serta ArrowLeft/ArrowRight/Home/End semuanya membalik halaman dengan hasil terverifikasi; tidak ada kontrol mati.
- R-27 PASS: album kosong menampilkan pesan; setiap bingkai punya status "Memuat..." dan "Foto belum bisa dibuka" bila gagal dimuat.
- R-32 PASS: buku bisa difokuskan dengan Tab, panah keyboard membalik halaman, dan fokus terlihat dengan outline.
- R-35 PASS: server HTTP dan Chromium headless dijalankan; PIN salah dan benar, pembukaan kado, hujan 41 foto yang semuanya termuat, 5 halaman album berisi 9/9/9/9/5 foto dengan nomor halaman dan keterangan, halaman penutup, transform 3D aktif saat membalik, dan reduced motion yang membalik halaman secara instan, semuanya diperiksa tanpa kesalahan konsol.
- R-37 PASS: arah buku hardcover sekolah dan judul "Album Kita" dipinta pengguna sebelum dibuat.
- R-38 PASS: tidak ada foto contoh atau klaim palsu; foto yang tidak bisa dibuka ditandai di bingkainya.

## Pengiriman 2026-10-10: pelancaran, cover pastel, dan jeda hujan foto

- R-03 PASS: tidak ada overflow horizontal di 1440, 768, 390, 320, 280, dan 200 CSS px setelah perubahan.
- R-19 PASS: lima foto jatuh bersamaan dengan posisi horizontal dan vertikal, kemiringan, serta durasi acak, lalu gelombang berikutnya menunggu 15 detik setelah foto terakhir selesai; reduced motion melewati hujan foto.
- R-25 PASS: judul cover `#884257` (teks besar) terukur di atas 3:1 di seluruh cover dan di atas 4,5:1 di sebagian besar area; tanggal cover `#653047`, judul punggung `#5a2838`, header halaman, nomor halaman, dan petunjuk semuanya di atas 4,5:1 setelah opasitas dihapus.
- R-35 PASS: Chromium memastikan lima bingkai hujan punya posisi horizontal/vertikal, kemiringan, dan durasi berbeda; lima foto selesai jatuh sebelum jeda 15 detik dimulai. Browser memuat ketiga foto cerita dan tiga foto konversi baru; pemeriksaan daftar memastikan 140 jalur unik tersedia, semua JPEG web maksimal 900 piksel, dan halaman foto terakhir berisi kenangan 136-140.
- R-37 PASS: permintaan pengguna soal lima foto yang jatuh pada posisi acak, jeda 15 detik, dan seluruh foto album dari folder `full foto` dipakai sebagai arah perubahan.

## Pengiriman 2026-10-10: samakan format album di HP dan laptop

- R-03 PASS: buku album mempertahankan bentuk terbuka dua halaman dan grid 3x3 di semua lebar; hanya skala bukunya yang menyesuaikan viewport.
- R-35 PASS: Chromium memverifikasi viewport 360, 753, dan 1425 CSS px; rasio buku tetap 1.42, grid tetap 3x3, dan tidak ada overflow horizontal.
- R-37: pengguna memilih agar tampilan buku laptop dipakai di HP juga.

## Pengiriman 2026-10-10: musik MP3 lokal

- R-23 PASS: file audio dipasok pengguna yang mengonfirmasi memiliki izin untuk memakainya di situs; sumber bernama `.mp3` tetapi berisi AAC dalam kontainer MP4/DASH.
- R-26 PASS: tombol header memutar dan menjeda audio lokal; penolakan autoplay atau kegagalan memuat file memberi status yang terlihat oleh pembaca layar.
- R-35 PASS: sumber MP3 hasil transcode dimuat browser sebagai `audio/mpeg`, durasi 2:28.65; sumber AAC/DASH semula gagal dimainkan sebagai file audio meski path server memberi HTTP 200.
- R-37 PASS: hasil transcode `music/love-songs.mp3` menjadi sumber musik situs; file sumber yang ditambahkan pengguna tetap tidak diubah.
