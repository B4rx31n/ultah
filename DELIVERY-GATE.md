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
