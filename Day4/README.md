# Day 04: IMG to URL Converter

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](#)
[![API Integration](https://img.shields.io/badge/API-ImgBB-blue?style=flat-square)](#)

Aplikasi berbasis web sederhana untuk mengubah gambar lokal di perangkat Anda menjadi tautan URL publik yang siap dibagikan. Proyek hari keempat dari inisiatif **3R (Ramadan Rajin Recode)**.

## Fitur Utama
* **Integrasi API:** Menggunakan layanan [ImgBB API](https://api.imgbb.com/) untuk melakukan *hosting* gambar secara instan tanpa perlu membangun pangkalan data (*database*) atau peladen (*server*) mandiri.
* **Drag-and-Drop:** Antarmuka ramah pengguna yang mendukung penyeretan berkas (*drag-and-drop*) langsung dari penjelajah berkas sistem operasi.
* **Clipboard API:** Fitur salin 1-klik yang secara otomatis memasukkan tautan publik ke papan klip (*clipboard*) pengguna.
* **Responsif & Ringan:** Antarmuka *Glassmorphism/Dark Mode* yang dapat diakses di penjelajah web komputer maupun perangkat seluler.

## Prasyarat & Konfigurasi API
Karena aplikasi ini mengunggah gambar ke internet, Anda membutuhkan Kunci API (*API Key*) gratis dari ImgBB.

1. Kunjungi [https://api.imgbb.com/](https://api.imgbb.com/).
2. Buat akun gratis (atau masuk jika sudah punya akun).
3. Buat API Key baru.
4. Buka berkas `script.js` di dalam direktori proyek ini.
5. Ganti nilai pada baris awal dengan API Key Anda:
   ```javascript
   const IMGBB_API_KEY = 'tempel_api_key_anda_di_sini';