import os
import sys
import shutil
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import yt_dlp

# ==========================================
# SETUP KREDENSIAL SPOTIFY 
# (Dapatkan di https://developer.spotify.com/dashboard)
# ==========================================
SPOTIFY_CLIENT_ID = 'ISI_CLIENT_ID_ANDA_DISINI'
SPOTIFY_CLIENT_SECRET = 'ISI_CLIENT_SECRET_ANDA_DISINI'

def check_ffmpeg():
    """Mengecek apakah FFmpeg sudah terinstal di sistem operasi apapun."""
    if shutil.which("ffmpeg") is None:
        print("\n[ERROR KRITIS] FFmpeg tidak ditemukan di sistem Anda!")
        print("Program ini membutuhkan FFmpeg untuk mengonversi file audio.")
        print("\nCara Install berdasarkan Device Anda:")
        print("- Windows: Download dari ffmpeg.org dan tambahkan ke Environment Variables PATH.")
        print("- Linux / Ubuntu: sudo apt install ffmpeg")
        print("- macOS: brew install ffmpeg")
        print("- Android (Termux): pkg install ffmpeg")
        print("- iOS (a-Shell): FFmpeg biasanya sudah bawaan atau gunakan perintah package manager yang tersedia.")
        sys.exit(1) # Hentikan program jika tidak ada FFmpeg

def get_spotify_track_info(spotify_url):
    """Mengambil metadata lagu dari Spotify berdasarkan URL."""
    try:
        auth_manager = SpotifyClientCredentials(
            client_id=SPOTIFY_CLIENT_ID, 
            client_secret=SPOTIFY_CLIENT_SECRET
        )
        sp = spotipy.Spotify(auth_manager=auth_manager)
        
        # Ekstrak ID Track dari URL
        track_id = spotify_url.split("/")[-1].split("?")[0]
        track_info = sp.track(track_id)
        
        artist = track_info['artists'][0]['name']
        song_name = track_info['name']
        
        query = f"{artist} - {song_name} official audio"
        return query
    except Exception as e:
        print(f"\n[ERROR] Gagal mengambil data Spotify: {e}")
        print("Pastikan Anda sudah mengisi SPOTIFY_CLIENT_ID dan SPOTIFY_CLIENT_SECRET di dalam script.")
        return None

def download_audio(url, audio_format='mp3', quality='320', is_spotify=False):
    """Fungsi utama untuk mengunduh dan mengonversi audio."""
    print(f"\n[INFO] Memulai proses untuk: {url}")
    
    search_query = url
    if is_spotify:
        print("[INFO] Link Spotify terdeteksi. Mengekstrak metadata...")
        search_query = get_spotify_track_info(url)
        if not search_query:
            return
        print(f"[INFO] Mencari audio pencocokan di YouTube: '{search_query}'...")

    # Manajemen path output cross-platform (menyimpan di folder tempat script dijalankan)
    download_dir = os.path.join(os.getcwd(), 'downloads')
    if not os.path.exists(download_dir):
        os.makedirs(download_dir)
        print(f"[INFO] Membuat folder penyimpanan baru: {download_dir}")

    out_template = os.path.join(download_dir, '%(title)s.%(ext)s')

    # Konfigurasi yt-dlp
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': out_template, 
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': audio_format,
            'preferredquality': quality,
        }],
        'quiet': False, 
        'nocheckcertificate': True, # Mencegah error SSL di beberapa OS mobile/Linux lama
    }
    
    # Jika link dari Spotify, ubah mode download menjadi pencarian (ytsearch)
    if is_spotify:
        ydl_opts['default_search'] = 'ytsearch'
        search_query = f"ytsearch1:{search_query}" 

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([search_query])
        print(f"\n[SUKSES] Unduhan selesai! File disimpan di folder: {download_dir}")
    except Exception as e:
        print(f"\n[ERROR] Terjadi kesalahan saat mengunduh: {e}")

def main():
    # Cek dependencies sebelum mulai
    check_ffmpeg()
    
    print("==========================================")
    print(" 🎵 Multi-Platform Audio Downloader 🎵 ")
    print("==========================================")
    
    url = input("\nMasukkan URL (YouTube atau Spotify): ").strip()
    
    # Menu Pilihan Ekstensi
    print("\nPilih Format Audio:")
    print("1. MP3\n2. FLAC (Lossless)\n3. WAV (Lossless)\n4. M4A")
    format_choice = input("Masukkan pilihan (1-4) [default: 1]: ").strip()
    
    format_map = {'1': 'mp3', '2': 'flac', '3': 'wav', '4': 'm4a'}
    audio_format = format_map.get(format_choice, 'mp3')
    
    # Menu Pilihan Kualitas / Bitrate
    print("\nPilih Kualitas Audio (Bitrate):")
    print("1. 320 kbps (Terbaik)\n2. 256 kbps\n3. 192 kbps (Standar)\n4. 128 kbps (Rendah)")
    quality_choice = input("Masukkan pilihan (1-4) [default: 1]: ").strip()
    
    quality_map = {'1': '320', '2': '256', '3': '192', '4': '128'}
    quality = quality_map.get(quality_choice, '320')

    # Deteksi platform link
    is_spotify = 'spotify.com' in url
    
    # Eksekusi
    download_audio(url, audio_format, quality, is_spotify)

if __name__ == "__main__":
    main()