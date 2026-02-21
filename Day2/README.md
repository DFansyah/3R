# Day 02: Multi-Platform Short Video Downloader

[![Python Version](https://img.shields.io/badge/Python-3.7%2B-blue.svg?style=flat-square&logo=python)](https://www.python.org/)

Proyek hari kedua dari inisiatif **3R (Ramadan Rajin Recode)**.

Skrip Python ini dirancang untuk mengunduh video pendek secara otomatis dari berbagai platform media sosial populer seperti **TikTok**, **Instagram Reels**, dan **YouTube Shorts**. Skrip ini akan secara otomatis mencari dan mengunduh kualitas resolusi tertinggi yang tersedia.

## Fitur Utama
* **Dukungan Lintas Platform:** Satu skrip untuk berbagai platform (TikTok, Instagram, YouTube).
* **Unduh Kualitas Terbaik:** Secara otomatis menggabungkan *stream* video dan audio terbaik menggunakan FFmpeg untuk menghasilkan file `.mp4` beresolusi tinggi.
* **Bypass Geolocation:** Dilengkapi parameter untuk meminimalkan pemblokiran wilayah (*geo-blocking*), terutama pada tautan Instagram atau TikTok.
* **Mode Audio-Only:** Menyediakan opsi untuk mengekstrak hanya suara dari video menjadi format `.mp3` (cocok untuk mengunduh *sound* viral).

## Prasyarat Sistem
* **Python 3.7+**
* **FFmpeg** (Sangat direkomendasikan untuk menggabungkan video 1080p+ dan mengekstrak audio)

## Instalasi Dependensi
Navigasikan terminal Anda ke direktori proyek ini dan instal pustaka yang dibutuhkan (jika belum diinstal pada Day 01):

```bash
pip install yt-dlp
pip install curl_cffi