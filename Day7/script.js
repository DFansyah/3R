const editor = document.getElementById('editor');
const preview = document.getElementById('preview');
const btnHtml = document.getElementById('btn-html');
const btnPdf = document.getElementById('btn-pdf');

// Teks bawaan (Default Markdown) saat pertama kali dimuat
const defaultMarkdown = `# Selamat datang di Editor Markdown! 🚀

Ini adalah proyek **Day 07** dari tantangan *3R (Ramadan Rajin Recode)*.

## Fitur Utama:
1. **Live Preview:** Ketik di kiri, lihat hasilnya di kanan.
2. **Export HTML:** Simpan dokumen sebagai halaman web tunggal.
3. **Export PDF:** Cetak dokumen dengan margin yang rapi.

### Contoh Kode
\`\`\`javascript
function sapaDunia() {
    console.log("Halo, Dunia!");
}
\`\`\`

> "Konsistensi adalah kunci dari kesuksesan seorang developer."

---
*Dibuat dengan ❤️ tanpa database atau server.*
`;

// Konfigurasi Marked.js untuk keamanan dasar
marked.setOptions({
    breaks: true, // Enter akan menjadi <br>
    gfm: true,    // GitHub Flavored Markdown
});

// Fungsi untuk me-render Markdown ke HTML
function updatePreview() {
    const markdownText = editor.value;
    // Mengubah Markdown menjadi HTML dan memasukannya ke div preview
    preview.innerHTML = marked.parse(markdownText);
}

// Inisialisasi awal
editor.value = defaultMarkdown;
updatePreview();

// Event Listener: Render setiap kali ada input (ketikan) di textarea
editor.addEventListener('input', updatePreview);

// ==========================================
// FUNGSI UNDUH HTML
// ==========================================
btnHtml.addEventListener('click', () => {
    // Ambil isi HTML yang sudah dirender
    const htmlContent = preview.innerHTML;
    
    // Bungkus dengan struktur HTML dasar agar menjadi file yang valid
    const fullHtml = `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Exported Document</title>
    <style>
        body { font-family: sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 40px auto; padding: 0 20px; }
        code { background: #f4f4f4; padding: 2px 5px; border-radius: 3px; color: #e83e8c; }
        pre { background: #f4f4f4; padding: 15px; overflow: auto; border-radius: 5px; }
        pre code { color: #333; }
        blockquote { border-left: 4px solid #ddd; padding-left: 15px; color: #666; margin-left: 0; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; }
        th { background: #f4f4f4; }
    </style>
</head>
<body>
    ${htmlContent}
</body>
</html>`;

    // Buat Blob dan Link untuk mengunduh
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Document_${Date.now()}.html`;
    link.click();
    URL.revokeObjectURL(url);
});

// ==========================================
// FUNGSI EKSPOR PDF (MENGGUNAKAN HTML2PDF)
// ==========================================
btnPdf.addEventListener('click', () => {
    // Ubah teks tombol saat memproses
    const originalText = btnPdf.innerText;
    btnPdf.innerText = "⏳ Memproses PDF...";
    btnPdf.disabled = true;

    // Konfigurasi opsi untuk html2pdf
    const opt = {
        margin:       15,
        filename:     `Document_${Date.now()}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Eksekusi pembuatan PDF dari elemen #preview
    html2pdf().set(opt).from(preview).save().then(() => {
        // Kembalikan tombol ke semula setelah selesai
        btnPdf.innerText = originalText;
        btnPdf.disabled = false;
    }).catch((err) => {
        alert("Terjadi kesalahan saat mengekspor PDF.");
        console.error(err);
        btnPdf.innerText = originalText;
        btnPdf.disabled = false;
    });
});