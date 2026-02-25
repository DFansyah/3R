import urllib.request
import urllib.parse
import json
import os
from datetime import datetime

# Nama file untuk menyimpan riwayat lokal
HISTORY_FILE = 'history.json'

def load_history():
    """Memuat riwayat dari file JSON."""
    if os.path.exists(HISTORY_FILE):
        with open(HISTORY_FILE, 'r') as f:
            try:
                return json.load(f)
            except json.JSONDecodeError:
                return []
    return []

def save_history(history):
    """Menyimpan riwayat ke file JSON."""
    with open(HISTORY_FILE, 'w') as f:
        json.dump(history, f, indent=4)

def shorten_url(long_url):
    """Fungsi utama memanggil API TinyURL dan menyimpan riwayat."""
    print("\n⏳ Memproses tautan...")
    try:
        api_url = "https://tinyurl.com/api-create.php?url=" + urllib.parse.quote(long_url)
        response = urllib.request.urlopen(api_url)
        short_url = response.read().decode('utf-8')
        
        history = load_history()
        
        if not any(item['short_url'] == short_url for item in history):
            history.insert(0, {
                'original_url': long_url,
                'short_url': short_url,
                'date': datetime.now().strftime("%d %b %Y, %H:%M")
            })
            # Riwayat kini disimpan tanpa batas (unlimited)
            save_history(history)
        
        print(f"✅ Berhasil! Tautan pendek Anda: {short_url}\n")
    except Exception as e:
        print(f"❌ Terjadi kesalahan saat memendekkan tautan: {e}\n")

def show_history():
    """Menampilkan riwayat tautan ke terminal."""
    history = load_history()
    print("\n📊 RIWAYAT TAUTAN LOKAL 📊")
    print("-" * 50)
    if not history:
        print("Belum ada riwayat tautan.")
    else:
        for i, item in enumerate(history, 1):
            print(f"{i}. {item['short_url']}")
            print(f"   Asli    : {item['original_url']}")
            print(f"   Tanggal : {item['date']}\n")
    print("-" * 50 + "\n")

def clear_history():
    """Menghapus file JSON riwayat."""
    confirm = input("\nApakah Anda yakin ingin menghapus semua riwayat? (y/n): ").strip().lower()
    if confirm == 'y':
        if os.path.exists(HISTORY_FILE):
            os.remove(HISTORY_FILE)
        print("✅ Riwayat berhasil dihapus!\n")
    else:
        print("❌ Penghapusan dibatalkan.\n")

def main():
    while True:
        print("====================================")
        print(" 🔗 URL Shortener CLI (Day 06) 🔗 ")
        print("====================================")
        print("1. Perpendek Tautan")
        print("2. Lihat Riwayat")
        print("3. Hapus Riwayat")
        print("4. Keluar")
        
        choice = input("Pilih menu (1-4): ").strip()
        
        if choice == '1':
            url = input("\nMasukkan tautan (awali dengan http/https): ").strip()
            if url.startswith("http://") or url.startswith("https://"):
                shorten_url(url)
            else:
                print("❌ Error: Tautan harus diawali dengan http:// atau https://\n")
        elif choice == '2':
            show_history()
        elif choice == '3':
            clear_history()
        elif choice == '4':
            print("\nTerima kasih telah menggunakan URL Shortener CLI!")
            break
        else:
            print("\n❌ Pilihan tidak valid. Silakan pilih 1-4.\n")

if __name__ == "__main__":
    main()