# Day 05: Custom QR Code Generator

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](#)
[![EasyQRCodeJS](https://img.shields.io/badge/Library-EasyQRCodeJS-blue?style=flat-square)](#)

Aplikasi berbasis web untuk menghasilkan QR Code kustom secara instan. Proyek hari kelima dari inisiatif **3R (Ramadan Rajin Recode)**.

## Fitur Utama
* **Tanpa Backend (Client-Side):** Seluruh proses pembuatan QR Code dan penyisipan gambar dirender secara lokal menggunakan API HTML5 Canvas dan pustaka `easyqrcodejs`. Privasi tautan dan gambar terjamin 100%.
* **Kustomisasi Warna Lanjutan:** Pengguna dapat mengubah warna *foreground* dan *background* menggunakan pemilih warna visual (*color picker*) bawaan sistem, atau mengetikkan format spesifik seperti `HEX` (contoh: `#BB86FC`) dan `RGB` (contoh: `rgb(187,134,252)`) secara presisi.
* **Responsif & Mobile-Friendly:** Antarmuka pengguna telah dioptimalkan dengan target sentuh (*touch target*) yang lebih besar dan tata letak yang beradaptasi secara otomatis pada layar ponsel cerdas.
* **Integrasi Logo:** Mendukung penyematan logo perusahaan atau ikon pribadi di tengah QR Code. Tingkat koreksi kesalahan (*Error Correction Level*) diatur secara otomatis ke "H" (Tertinggi) untuk memastikan QR Code tetap terbaca meskipun ada gambar di tengahnya.
* **Ekspor Cepat:** Unduh hasil akhir langsung dalam format `.png` dengan resolusi yang tajam.

## Cara Penggunaan
Aplikasi ini bersifat statis dan siap pakai tanpa memerlukan *build process*.

1. Pastikan perangkat Anda terhubung ke internet untuk memuat pustaka `easyqrcodejs` dari CDN.
2. Buka berkas `index.html` menggunakan peramban modern.
3. Masukkan teks atau tautan URL yang ingin diubah menjadi QR Code.
4. Sesuaikan warna dengan mengeklik kotak warna atau mengetikkan kode warna HEX/RGB di kolom teks yang tersedia.
5. (Opsional) Klik **📂 Pilih Logo** untuk menyematkan gambar di tengah QR Code.
6. Klik **⚡ Buat QR Code**.
7. Klik **💾 Unduh QR Code** untuk menyimpannya ke perangkat Anda.

## Catatan Teknis
Jika Anda memilih warna depan yang terlalu terang dan latar belakang yang cerah, aplikasi pemindai (*scanner*) QR Code pada ponsel mungkin akan kesulitan membaca kodenya karena kurangnya rasio kontras. Pastikan selalu menggunakan warna *foreground* yang jauh lebih gelap dibandingkan warna *background*.