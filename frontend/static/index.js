/* main.js */
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const fileListDisplay = document.getElementById('file-list');
const vectorizeBtn = document.getElementById('vectorize-btn');

let uploadedFiles = [];

// Trigger file input on click
dropZone.addEventListener('click', () => fileInput.click());

// Handle Drag & Drop Visuals
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
});

// Handle standard selection
fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

function handleFiles(files) {
    if (files.length > 0) {
        vectorizeBtn.style.opacity = '1';
        vectorizeBtn.style.pointerEvents = 'all';
        
        Array.from(files).forEach(file => {
            uploadedFiles.push(file);
            renderFileItem(file);
        });
    }
}

function renderFileItem(file) {
    const div = document.createElement('div');
    div.className = 'file-item glass-panel';
    div.innerHTML = `
        <span style="color: white;">${file.name}</span>
        <span style="color: var(--text-dim); font-size: 0.8rem;">${(file.size / 1024).toFixed(1)} KB</span>
    `;
    fileListDisplay.appendChild(div);
}

// "Vectorize" Button Logic
vectorizeBtn.addEventListener('click', async () => {
    // 1. Loading State
    vectorizeBtn.innerText = "VECTORIZING...";
    
    // NOTE: Backend Integration Point
    // Create FormData, append files, and send POST request to your /upload endpoint
    /*
    const formData = new FormData();
    uploadedFiles.forEach(file => formData.append('files', file));
    await fetch('/api/upload', { method: 'POST', body: formData });
    */

    // Simulating delay for demo purposes
    setTimeout(() => {
        window.location.href = 'chat.html'; // Redirect to Chat Page
    }, 2000);
});