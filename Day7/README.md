# Day 07: Live Markdown Editor & Converter

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](#)
[![Library](https://img.shields.io/badge/Library-Marked.js-blue?style=flat-square)](#)
[![Library](https://img.shields.io/badge/Library-html2pdf.js-blue?style=flat-square)](#)

Aplikasi editor Markdown dengan fitur pratinjau waktu-nyata (*live preview*) dan kemampuan ekspor dokumen. Proyek hari ketujuh ini sekaligus menutup **Minggu 1** (Media, Downloader & Utilitas) dari inisiatif **3R (Ramadan Rajin Recode)**.

## Fitur Utama
* **Live Markdown Rendering:** Menerjemahkan sintaks Markdown menjadi elemen visual secara instan saat pengguna mengetik, didukung oleh pustaka `marked.js` berkinerja tinggi.
* **Tata Letak Adaptif:** Desain responsif yang otomatis menyesuaikan perangkat. Pada layar komputer, antarmuka menggunakan mode layar terbelah (*split-screen*) berdampingan. Pada layar seluler, tata letak akan tersusun ke bawah (*stack*) dengan dukungan gulir (*scroll*) yang mulus.
* **Tema Visual Ganda:** Panel editor menggunakan tema gelap (*dark mode*) agar nyaman di mata saat mengetik, sementara panel hasil pratinjau menggunakan tema terang (*light mode*) untuk menyimulasikan kertas dokumen cetak.
* **Ekspor ke HTML:** Pengguna dapat menyimpan catatan mereka menjadi berkas `.html` statis tunggal yang sudah dilengkapi dengan *styling* CSS bawaan.
* **Ekspor ke PDF:** Terintegrasi dengan pustaka `html2pdf.js` untuk merender struktur DOM secara presisi menjadi dokumen PDF berukuran A4 yang rapi dan siap dicetak atau dibagikan.

## Cara Menjalankan
Proyek ini berjalan sepenuhnya di sisi klien (*client-side*) tanpa memerlukan instalasi *backend* atau proses kompilasi (*build*).

1. Pastikan perangkat Anda terhubung ke internet untuk memuat pustaka dari CDN.
2. Buka berkas `index.html` menggunakan peramban web modern.
3. Ketikkan struktur dokumen menggunakan sintaks Markdown pada panel editor.
4. Perhatikan hasil terjemahan visualnya di panel *Live Preview*.
5. Klik **💾 Unduh HTML** atau **📄 Ekspor PDF** pada bilah navigasi atas untuk menyimpan karya Anda.