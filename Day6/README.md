# Day 06: Link Shortener (Web & CLI Version)

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](#)
[![Python Version](https://img.shields.io/badge/Python-3.7%2B-blue.svg?style=flat-square&logo=python)](#)
[![API Integration](https://img.shields.io/badge/API-TinyURL-blue?style=flat-square)](#)

Proyek hari keenam dari inisiatif **3R (Ramadan Rajin Recode)**. 

Direktori ini memuat DUA versi dari aplikasi pemendek tautan (*URL Shortener*):
1. **Versi Web App** (Berbasis peramban, *client-side rendering*).
2. **Versi CLI** (Skrip interaktif melalui Terminal/Command Prompt).

## Fitur Utama (Berlaku untuk kedua versi)
* **Integrasi API Publik:** Memanfaatkan API pihak ketiga (TinyURL) untuk memendekkan tautan panjang secara instan tanpa memerlukan pengaturan *database server*.
* **Manajemen Riwayat Tanpa Batas:** * *Versi Web:* Menyimpan riwayat otomatis ke dalam penyimpanan lokal peramban (*browser localStorage*) tanpa batasan jumlah tautan.
  * *Versi CLI:* Menyimpan riwayat ke dalam berkas `history.json` di dalam direktori yang sama secara otomatis dan berkelanjutan.
* **Tanpa Dependensi Eksternal:** Versi CLI murni menggunakan pustaka standar bawaan Python (`urllib`, `json`), sehingga Anda tidak perlu menjalankan `pip install` apa pun.

## Cara Menjalankan Versi Web (HTML/JS)
1. Buka berkas `index.html` menggunakan peramban web modern.
2. Tempelkan tautan panjang pada kolom yang tersedia (Pastikan tautan diawali dengan `http://` atau `https://`).
3. Klik tombol **Perpendek!**.
4. Gulir ke bawah untuk melihat dasbor riwayat yang tersimpan.

## Cara Menjalankan Versi CLI (Python)
1. Buka Terminal atau Command Prompt / Termux.
2. Navigasikan ke direktori proyek ini.
3. Jalankan perintah berikut:
   ```bash
   python main.py