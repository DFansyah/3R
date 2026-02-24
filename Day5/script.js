const textInput = document.getElementById('qr-text');

// Input Warna & Teks
const colorDark = document.getElementById('color-dark');
const colorDarkText = document.getElementById('color-dark-text');
const colorLight = document.getElementById('color-light');
const colorLightText = document.getElementById('color-light-text');

const logoUpload = document.getElementById('logo-upload');
const logoNameDisplay = document.getElementById('logo-name');
const generateBtn = document.getElementById('generate-btn');
const downloadBtn = document.getElementById('download-btn');
const qrcodeDiv = document.getElementById('qrcode');
const placeholder = document.getElementById('placeholder-text');

let currentLogoBase64 = null;
let qrCodeInstance = null;

// Sinkronisasi Warna Depan (Dark)
colorDark.addEventListener('input', (e) => {
    colorDarkText.value = e.target.value.toUpperCase();
});
colorDarkText.addEventListener('input', (e) => {
    // Update kotak warna hanya jika format valid HEX (browser input type color hanya dukung hex)
    if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
        colorDark.value = e.target.value;
    }
});

// Sinkronisasi Warna Latar (Light)
colorLight.addEventListener('input', (e) => {
    colorLightText.value = e.target.value.toUpperCase();
});
colorLightText.addEventListener('input', (e) => {
    if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
        colorLight.value = e.target.value;
    }
});

// Membaca file logo yang diunggah
logoUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) {
        currentLogoBase64 = null;
        logoNameDisplay.innerText = "";
        return;
    }

    logoNameDisplay.innerText = file.name;

    const reader = new FileReader();
    reader.onload = function(event) {
        currentLogoBase64 = event.target.result;
    };
    reader.readAsDataURL(file);
});

// Fungsi Membuat QR Code
generateBtn.addEventListener('click', () => {
    const textValue = textInput.value.trim();
    
    if (!textValue) {
        alert("Harap masukkan tautan atau teks terlebih dahulu!");
        return;
    }

    qrcodeDiv.innerHTML = "";
    placeholder.style.display = 'none';

    // Ambil warna langsung dari kolom teks (mengizinkan format rgb(r,g,b) atau HEX)
    const finalDarkColor = colorDarkText.value.trim() || "#000000";
    const finalLightColor = colorLightText.value.trim() || "#ffffff";

    const options = {
        text: textValue,
        width: 250,
        height: 250,
        colorDark: finalDarkColor,
        colorLight: finalLightColor,
        correctLevel: QRCode.CorrectLevel.H,
        dotScale: 1
    };

    if (currentLogoBase64) {
        options.logo = currentLogoBase64;
        options.logoWidth = 60; 
        options.logoHeight = 60;
        options.logoBackgroundTransparent = true;
    }

    qrCodeInstance = new QRCode(qrcodeDiv, options);

    setTimeout(() => {
        downloadBtn.disabled = false;
    }, 500);
});

// Fungsi Mengunduh QR Code
downloadBtn.addEventListener('click', () => {
    const canvas = qrcodeDiv.querySelector('canvas');
    
    if (canvas) {
        const imageURL = canvas.toDataURL("image/png");
        
        const link = document.createElement('a');
        link.download = `QRCode_${Date.now()}.png`;
        link.href = imageURL;
        link.click();
    } else {
        alert("Gagal menemukan QR Code untuk diunduh.");
    }
});