# Day 01: Multi-Platform YouTube & Spotify Audio Downloader

[![Python Version](https://img.shields.io/badge/Python-3.7%2B-blue.svg?style=flat-square&logo=python)](https://www.python.org/)

Proyek perdana dari inisiatif **3R (Ramadan Rajin Recode)**. 

Program ini adalah skrip berbasis *Command Line Interface* (CLI) yang ditulis dalam Python untuk mengunduh audio dari YouTube dan mengekstrak metadata dari Spotify. Skrip ini dirancang secara *cross-platform* dengan fitur deteksi dependensi otomatis untuk memastikan kompatibilitas di berbagai lingkungan sistem operasi.

## Fitur Utama
* **Multi-Platform:** Mendukung Windows, macOS, Linux, dan perangkat *mobile* (Android via Termux / iOS via a-Shell).
* **Dukungan Format Lossless:** Pilihan konversi ke MP3, FLAC, WAV, dan M4A.
* **Kontrol Kualitas (Bitrate):** Opsi kualitas audio mulai dari 128 kbps hingga 320 kbps.
* **Integrasi Spotify API:** Mampu membaca tautan Spotify, mengekstrak metadata lagu (artis & judul), dan secara otomatis mencari versi audio resminya.
* **Deteksi FFmpeg Otomatis:** Memvalidasi ketersediaan *environment* FFmpeg sebelum skrip dieksekusi untuk mencegah *crash*.

## Prasyarat Sistem
Sebelum menjalankan skrip ini, pastikan sistem Anda telah memasang:
1. **Python 3.7+**
2. **FFmpeg** (Sangat krusial untuk proses konversi audio)

### Panduan Instalasi FFmpeg
* **Windows:** Unduh dari situs resmi [FFmpeg](https://ffmpeg.org/download.html) dan tambahkan direktori `bin` ke dalam *Environment Variables PATH*.
* **Linux / Ubuntu:** `sudo apt install ffmpeg`
* **macOS:** `brew install ffmpeg`
* **Android (Termux):** `pkg install ffmpeg`

## Instalasi Dependensi Python
Kloning repositori ini (atau unduh folder proyek), navigasikan terminal Anda ke dalam direktori proyek ini, lalu jalankan perintah berikut untuk memasang pustaka yang dibutuhkan:

```bash
pip install yt-dlp spotipy
python main.py