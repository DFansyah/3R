const urlInput = document.getElementById('long-url');
const shortenBtn = document.getElementById('shorten-btn');
const loadingIndicator = document.getElementById('loading');
const resultArea = document.getElementById('result-area');
const shortUrlInput = document.getElementById('short-url');
const copyBtn = document.getElementById('copy-btn');
const historyList = document.getElementById('history-list');
const clearHistoryBtn = document.getElementById('clear-history-btn');

// Kunci penyimpanan lokal
const STORAGE_KEY = '3R_LINK_HISTORY';

// Mengambil riwayat saat halaman dimuat
document.addEventListener('DOMContentLoaded', renderHistory);

// Event Listener Tombol Perpendek
shortenBtn.addEventListener('click', async () => {
    const longUrl = urlInput.value.trim();
    
    if (!longUrl) {
        alert("Silakan masukkan tautan yang valid!");
        return;
    }

    if (!longUrl.startsWith('http://') && !longUrl.startsWith('https://')) {
        alert("Tautan harus diawali dengan http:// atau https://");
        return;
    }

    shortenBtn.disabled = true;
    loadingIndicator.style.display = 'block';
    resultArea.style.display = 'none';

    try {
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
        
        if (!response.ok) {
            throw new Error('Gagal terhubung ke API penyedia layanan.');
        }

        const shortUrl = await response.text();

        shortUrlInput.value = shortUrl;
        resultArea.style.display = 'block';

        saveToHistory(longUrl, shortUrl);

    } catch (error) {
        alert("Terjadi kesalahan: " + error.message);
    } finally {
        shortenBtn.disabled = false;
        loadingIndicator.style.display = 'none';
    }
});

// Fitur Salin Tautan Utama
copyBtn.addEventListener('click', () => {
    copyToClipboard(shortUrlInput.value, copyBtn, '📋 Salin');
});

// Fungsi Menghapus Riwayat
clearHistoryBtn.addEventListener('click', () => {
    if (confirm("Apakah Anda yakin ingin menghapus semua riwayat tautan?")) {
        localStorage.removeItem(STORAGE_KEY);
        renderHistory();
    }
});

function saveToHistory(originalUrl, shortUrl) {
    let history = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    
    const isDuplicate = history.some(item => item.shortUrl === shortUrl);
    if (isDuplicate) return;

    const newEntry = {
        originalUrl: originalUrl,
        shortUrl: shortUrl,
        date: new Date().toLocaleDateString('id-ID', {
            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit'
        })
    };

    // Tambahkan ke paling atas (unshift) TANPA BATAS
    history.unshift(newEntry);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    const history = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    historyList.innerHTML = '';

    if (history.length === 0) {
        historyList.innerHTML = '<div class="empty-state">Belum ada riwayat tautan.</div>';
        return;
    }

    history.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'history-item';

        itemDiv.innerHTML = `
            <div class="history-info">
                <a href="${item.shortUrl}" target="_blank" class="short-link">${item.shortUrl}</a>
                <span class="original-link" title="${item.originalUrl}">${item.originalUrl}</span>
                <div class="history-date">${item.date}</div>
            </div>
            <button class="btn-sm-copy" id="copy-btn-${index}">Salin</button>
        `;

        historyList.appendChild(itemDiv);

        const smCopyBtn = document.getElementById(`copy-btn-${index}`);
        smCopyBtn.addEventListener('click', () => {
            copyToClipboard(item.shortUrl, smCopyBtn, 'Salin');
        });
    });
}

function copyToClipboard(text, buttonElement, originalText) {
    navigator.clipboard.writeText(text).then(() => {
        buttonElement.innerText = '✅ Tersalin!';
        buttonElement.style.backgroundColor = '#2e7d32'; 
        buttonElement.style.color = '#fff';
        
        setTimeout(() => {
            buttonElement.innerText = originalText;
            buttonElement.style.backgroundColor = ''; 
        }, 2000);
    });
}