// ==========================================
// KUNCI API IMGBB (GRATIS)
// Dapatkan di: https://api.imgbb.com/
// ==========================================
const IMGBB_API_KEY = 'tempel_api_key_anda_di_sini'; 

const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-upload');
const previewContainer = document.getElementById('preview-container');
const imagePreview = document.getElementById('image-preview');
const loadingIndicator = document.getElementById('loading-indicator');
const resultArea = document.getElementById('result-area');
const urlResult = document.getElementById('url-result');
const copyBtn = document.getElementById('copy-btn');

// Mencegah perilaku default browser saat file diseret
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

// Efek visual saat file diseret ke area
['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => dropZone.classList.add('dragover'), false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => dropZone.classList.remove('dragover'), false);
});

// Menangkap file dari event drop
dropZone.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    if (files.length > 0) handleFile(files[0]);
});

// Menangkap file dari tombol pilih gambar
fileInput.addEventListener('change', function() {
    if (this.files.length > 0) handleFile(this.files[0]);
});

function handleFile(file) {
    // Validasi tipe file
    if (!file.type.startsWith('image/')) {
        alert('Tolong unggah file gambar yang valid (JPG, PNG, GIF, WEBP).');
        return;
    }

    if (IMGBB_API_KEY === 'ISI_API_KEY_ANDA_DISINI') {
        alert('Silakan masukkan API Key ImgBB Anda di dalam script.js terlebih dahulu!');
        return;
    }

    // Tampilkan pratinjau lokal
    const reader = new FileReader();
    reader.onload = (e) => {
        imagePreview.src = e.target.result;
        previewContainer.style.display = 'block';
        resultArea.style.display = 'none';
        uploadImage(file);
    };
    reader.readAsDataURL(file);
}

async function uploadImage(file) {
    loadingIndicator.style.display = 'block';
    
    const formData = new FormData();
    formData.append('image', file);
    
    try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            urlResult.value = data.data.url;
            resultArea.style.display = 'block';
            copyBtn.innerText = '📋 Salin';
            copyBtn.style.backgroundColor = '#333';
        } else {
            alert('Gagal mengunggah gambar: ' + data.error.message);
        }
    } catch (error) {
        alert('Terjadi kesalahan koneksi saat mengunggah.');
        console.error(error);
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

// Fitur Salin Tautan (Copy to Clipboard)
copyBtn.addEventListener('click', () => {
    urlResult.select();
    urlResult.setSelectionRange(0, 99999); // Untuk perangkat mobile
    
    navigator.clipboard.writeText(urlResult.value).then(() => {
        copyBtn.innerText = '✅ Tersalin!';
        copyBtn.style.backgroundColor = '#2e7d32'; // Ubah warna jadi hijau
        
        setTimeout(() => {
            copyBtn.innerText = '📋 Salin';
            copyBtn.style.backgroundColor = '#333';
        }, 2000);
    });
});