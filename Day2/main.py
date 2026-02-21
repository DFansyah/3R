import os
import sys
import shutil
import yt_dlp

def check_ffmpeg():
    """Mengecek ketersediaan FFmpeg untuk proses penggabungan video dan audio."""
    if shutil.which("ffmpeg") is None:
        print("\n[PERINGATAN] FFmpeg tidak ditemukan di sistem Anda!")
        print("Mengunduh video resolusi tinggi (1080p+) seringkali memisahkan file video dan audio.")
        print("Tanpa FFmpeg, program mungkin hanya bisa mengunduh video dengan resolusi standar (720p).")
        print("Pastikan FFmpeg terinstal untuk hasil yang maksimal.\n")

def download_media(url, format_choice):
    """Fungsi utama untuk mengunduh video atau mengekstrak audio."""
    print(f"\n[INFO] Memproses URL: {url}")
    
    # Manajemen direktori penyimpanan
    download_dir = os.path.join(os.getcwd(), 'downloads')
    if not os.path.exists(download_dir):
        os.makedirs(download_dir)
        
    out_template = os.path.join(download_dir, '%(title)s.%(ext)s')
    
    # Konfigurasi dasar yt-dlp dengan fitur Anti-Blokir (User-Agent Spoofing)
    ydl_opts = {
        'outtmpl': out_template,
        'quiet': False,
        'nocheckcertificate': True,
        'geo_bypass': True, 
        # Menyamar sebagai browser Chrome di Windows agar tidak diblokir TikTok/IG
        'http_headers': {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
        },
        # Gunakan API alternatif untuk TikTok jika web scraping gagal
        'extractor_args': {
            'tiktok': {'api_hostname': 'api16-normal-c-useast1a.tiktokv.com'}
        }
    }

    if format_choice == '1':
        # Opsi: Video MP4 Kualitas Terbaik
        ydl_opts['format'] = 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best'
        ydl_opts['merge_output_format'] = 'mp4'
    elif format_choice == '2':
        # Opsi: Ekstrak Audio Saja (MP3)
        ydl_opts['format'] = 'bestaudio/best'
        ydl_opts['postprocessors'] = [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }]
    else:
        print("[ERROR] Pilihan format tidak valid.")
        return

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
        print(f"\n[SUKSES] Berhasil! File tersimpan di: {download_dir}")
    except Exception as e:
        print(f"\n[ERROR] Gagal mengunduh: {e}")
        print("Tips: Jika error terus berlanjut, TikTok mungkin sedang memblokir IP Anda sementara waktu.")
        print("Cobalah gunakan koneksi internet/WiFi lain, atau perbarui yt-dlp dengan perintah: pip install --upgrade yt-dlp")

def main():
    check_ffmpeg()
    
    print("=====================================================")
    print(" 🎬 Multi-Platform Short Video Downloader (Day 02) 🎬 ")
    print("    (Mendukung TikTok, IG Reels, YouTube Shorts)    ")
    print("=====================================================")
    
    url = input("\nMasukkan URL Video: ").strip()
    
    print("\nPilih Format Unduhan:")
    print("1. Video Kualitas Terbaik (MP4)")
    print("2. Audio Saja (MP3)")
    
    choice = input("Masukkan pilihan (1/2) [default: 1]: ").strip()
    if not choice:
        choice = '1'
        
    download_media(url, choice)

if __name__ == "__main__":
    main()