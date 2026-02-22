# Day 03: Web Image Upscaler & Enhancer

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](#)

Aplikasi berbasis web untuk meningkatkan resolusi gambar (*upscaling*) dan melakukan koreksi warna dasar secara lokal tanpa memerlukan pengunggahan ke peladen (*server*). 

## Fitur Utama
* **Client-Side Rendering:** Sepenuhnya berjalan di peramban menggunakan API HTML5 Canvas, menjamin 100% privasi data pengguna.
* **Resolusi Dinamis:** Kemampuan untuk memperbesar dimensi gambar asli (Hingga 4x lipat) memanfaatkan algoritma *Bicubic/Bilinear Resampling* tingkat tinggi dari peramban.
* **Penyempurnaan Warna (Enhancement):** Filter terintegrasi untuk mengatur kecerahan, kontras, dan saturasi gambar secara *real-time*.
* **Ekspor Kualitas Tinggi:** Mengunduh hasil manipulasi ke dalam format `.png` untuk mempertahankan detail piksel tanpa kompresi *lossy*.

## Cara Penggunaan
Aplikasi ini bersifat statis dan siap pakai tanpa memerlukan tahapan instalasi spesifik.

1. Buka file `index.html` menggunakan peramban modern (disarankan Google Chrome atau Mozilla Firefox terbaru).
2. Klik tombol **📂 Pilih Gambar** dan unggah berkas yang ingin ditingkatkan kualitasnya.
3. Sesuaikan **Skala Upscale** (1x, 2x, atau 4x) dan atur *slider* warna sesuai preferensi visual Anda.
4. Perhatikan pratinjau dan resolusi akhir pada bagian bawah layar.
5. Klik **💾 Unduh Hasil** untuk menyimpan gambar ke penyimpanan lokal.

## Catatan Performa
Meskipun aplikasi ini sangat ringan, melakukan *upscale* 4x lipat pada gambar dasar yang sudah beresolusi sangat besar (misalnya foto 4K) mungkin akan memakan jumlah RAM memori yang signifikan pada perangkat pengguna saat proses *render* *Canvas* berlangsung.