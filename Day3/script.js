const uploadInput = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const placeholder = document.getElementById('placeholder-text');
const downloadBtn = document.getElementById('download-btn');
const infoBar = document.getElementById('info-bar');
const originalSizeTxt = document.getElementById('original-size');
const newSizeTxt = document.getElementById('new-size');

// Controls
const scaleFactor = document.getElementById('scale-factor');
const brightness = document.getElementById('brightness');
const contrast = document.getElementById('contrast');
const saturation = document.getElementById('saturation');

// Value displays
const brightVal = document.getElementById('bright-val');
const contrastVal = document.getElementById('contrast-val');
const satVal = document.getElementById('sat-val');

let img = new Image();
let originalFileName = '';

// Event Listeners for Controls
[scaleFactor, brightness, contrast, saturation].forEach(el => {
    el.addEventListener('input', applyEnhancements);
});

brightness.addEventListener('input', (e) => brightVal.innerText = `${e.target.value}%`);
contrast.addEventListener('input', (e) => contrastVal.innerText = `${e.target.value}%`);
saturation.addEventListener('input', (e) => satVal.innerText = `${e.target.value}%`);

uploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    originalFileName = file.name.split('.')[0];
    const reader = new FileReader();

    reader.onload = (event) => {
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

img.onload = () => {
    placeholder.style.display = 'none';
    canvas.style.display = 'block';
    infoBar.style.display = 'flex';
    downloadBtn.disabled = false;
    applyEnhancements();
};

function applyEnhancements() {
    if (!img.src) return;

    const scale = parseInt(scaleFactor.value);
    const bright = brightness.value;
    const cont = contrast.value;
    const sat = saturation.value;

    const newWidth = img.width * scale;
    const newHeight = img.height * scale;

    // Update info text
    originalSizeTxt.innerText = `Asli: ${img.width} x ${img.height}`;
    newSizeTxt.innerText = `Hasil: ${newWidth} x ${newHeight}`;

    // Resize canvas (This handles the actual image upscaling via Canvas API)
    canvas.width = newWidth;
    canvas.height = newHeight;

    // Apply Filters via Context
    ctx.filter = `brightness(${bright}%) contrast(${cont}%) saturate(${sat}%)`;

    // Algoritma smoothing tinggi untuk upscaling
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Draw the scaled and filtered image
    ctx.drawImage(img, 0, 0, newWidth, newHeight);
}

downloadBtn.addEventListener('click', () => {
    const scale = scaleFactor.value;
    
    // Konversi hasil canvas kembali ke file gambar (Kualitas maksimal untuk JPEG/WEBP)
    const dataURL = canvas.toDataURL('image/png', 1.0);
    
    const link = document.createElement('a');
    link.download = `${originalFileName}_enhanced_${scale}x.png`;
    link.href = dataURL;
    link.click();
});