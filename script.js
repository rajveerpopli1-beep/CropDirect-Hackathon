const startBtn = document.getElementById('startBtn');
const options = document.getElementById('optionsContainer');
const cameraOption = document.getElementById('cameraOption');
const galleryOption = document.getElementById('galleryOption');
const textOption = document.getElementById('textOption');
const video = document.getElementById('video');
const captureBtn = document.getElementById('captureBtn');
const capturedImage = document.getElementById('capturedImage');
const galleryInput = document.getElementById('galleryInput');
const textContainer = document.getElementById('textContainer');
const cropDescription = document.getElementById('cropDescription');

let stream;

startBtn.addEventListener('click', () => {
    options.style.display = 'flex';
});

cameraOption.addEventListener('click', async () => {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video:{facingMode:"environment"} });
        video.srcObject = stream;
        video.style.display = 'block';
        captureBtn.style.display = 'inline-block';
        capturedImage.style.display = 'none';
        textContainer.style.display = 'none';
    } catch(err) {
        alert('Camera access denied or not available: ' + err);
    }
});

captureBtn.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video,0,0);
    capturedImage.src = canvas.toDataURL('image/png');
    capturedImage.style.display = 'block';
    video.style.display = 'none';
    captureBtn.style.display = 'none';
    if(stream) stream.getTracks().forEach(track => track.stop());
    alert('Photo captured!');
});

galleryOption.addEventListener('click', () => {
    galleryInput.click();
});

galleryInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            capturedImage.src = e.target.result;
            capturedImage.style.display = 'block';
            video.style.display = 'none';
            captureBtn.style.display = 'none';
            textContainer.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
});

textOption.addEventListener('click', () => {
    textContainer.style.display = 'block';
    video.style.display = 'none';
    captureBtn.style.display = 'none';
    capturedImage.style.display = 'none';
});

function submitDescription() {
    const text = cropDescription.value.trim();
    if(text) {
        alert('Description submitted: ' + text);
        cropDescription.value = '';
    } else {
        alert('Please enter a description.');
    }
}