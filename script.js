// Template images from Asset folder
const templates = [
    { name: 'Meme Template 1', path: 'Asset/29xp-meme-superJumbo-v3-scaled.webp' },
    { name: 'Meme Template 2', path: 'Asset/Meme-marketing.webp' },
    { name: 'Meme Template 3', path: 'Asset/you-and-meme.png' }
];

// State management
const state = {
    image: null,
    topText: '',
    bottomText: '',
    fontSize: 40,
    textColor: '#ffffff',
    canvas: null,
    ctx: null,
    selectedTemplate: null
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    state.canvas = document.getElementById('memeCanvas');
    state.ctx = state.canvas.getContext('2d');
    
    // Load templates
    loadTemplates();
    
    // Set up event listeners
    setupEventListeners();
});

function loadTemplates() {
    const templatesGrid = document.getElementById('templatesGrid');
    
    templates.forEach((template, index) => {
        const templateItem = document.createElement('div');
        templateItem.className = 'template-item';
        templateItem.dataset.index = index;
        
        const img = document.createElement('img');
        img.src = template.path;
        img.alt = template.name;
        img.className = 'template-thumbnail';
        
        const overlay = document.createElement('div');
        overlay.className = 'template-overlay';
        
        templateItem.appendChild(img);
        templateItem.appendChild(overlay);
        
        templateItem.addEventListener('click', () => selectTemplate(template.path));
        
        templatesGrid.appendChild(templateItem);
    });
}

function selectTemplate(imagePath) {
    const img = new Image();
    img.onload = () => {
        state.image = img;
        state.selectedTemplate = imagePath;
        loadImageToCanvas();
        updateCanvas();
        
        // Enable download button
        document.getElementById('downloadBtn').disabled = false;
        
        // Hide placeholder, show canvas
        document.getElementById('canvasPlaceholder').classList.add('hidden');
        state.canvas.classList.add('active');
        
        // Update selected template visual state
        updateTemplateSelection(imagePath);
    };
    img.onerror = () => {
        alert('Failed to load template image. Please check if the file exists.');
    };
    img.src = imagePath;
}

function updateTemplateSelection(selectedPath) {
    const templateItems = document.querySelectorAll('.template-item');
    templateItems.forEach((item, index) => {
        if (templates[index] && templates[index].path === selectedPath) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
}

function setupEventListeners() {
    // Image upload
    const imageUpload = document.getElementById('imageUpload');
    imageUpload.addEventListener('change', handleImageUpload);
    
    // Text inputs
    const topTextInput = document.getElementById('topText');
    const bottomTextInput = document.getElementById('bottomText');
    
    topTextInput.addEventListener('input', (e) => {
        state.topText = e.target.value;
        updateCanvas();
    });
    
    bottomTextInput.addEventListener('input', (e) => {
        state.bottomText = e.target.value;
        updateCanvas();
    });
    
    // Font size slider
    const fontSizeSlider = document.getElementById('fontSize');
    const fontSizeValue = document.getElementById('fontSizeValue');
    
    fontSizeSlider.addEventListener('input', (e) => {
        state.fontSize = parseInt(e.target.value);
        fontSizeValue.textContent = `${state.fontSize}px`;
        updateCanvas();
    });
    
    // Color picker
    const textColorInput = document.getElementById('textColor');
    const colorValue = document.getElementById('colorValue');
    
    textColorInput.addEventListener('input', (e) => {
        state.textColor = e.target.value;
        colorValue.textContent = state.textColor;
        updateCanvas();
    });
    
    // Initialize color value display
    colorValue.textContent = state.textColor;
    
    // Download button
    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.addEventListener('click', downloadMeme);
}

function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            state.image = img;
            state.selectedTemplate = null; // Clear template selection when uploading
            loadImageToCanvas();
            updateCanvas();
            
            // Enable download button
            document.getElementById('downloadBtn').disabled = false;
            
            // Hide placeholder, show canvas
            document.getElementById('canvasPlaceholder').classList.add('hidden');
            state.canvas.classList.add('active');
            
            // Clear template selection visual state
            document.querySelectorAll('.template-item').forEach(item => {
                item.classList.remove('selected');
            });
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

function loadImageToCanvas() {
    if (!state.image) return;
    
    // Set canvas dimensions to match image
    state.canvas.width = state.image.width;
    state.canvas.height = state.image.height;
    
    // Draw image
    state.ctx.drawImage(state.image, 0, 0);
}

function drawText(text, x, y, fontSize) {
    if (!text) return;
    
    const ctx = state.ctx;
    
    // Set font properties
    ctx.font = `bold ${fontSize}px Impact, Arial Black, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    
    // Set text styling - customizable fill color with black stroke
    ctx.fillStyle = state.textColor;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = Math.max(6, fontSize / 6); // Thicker border - dynamic line width based on font size
    
    // Calculate text width for centering
    const textWidth = ctx.measureText(text).width;
    
    // Draw stroke (black border) first
    ctx.strokeText(text, x, y);
    
    // Draw fill (white text) on top
    ctx.fillText(text, x, y);
}

function updateCanvas() {
    if (!state.image) return;
    
    // Clear canvas
    state.ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
    
    // Redraw image
    state.ctx.drawImage(state.image, 0, 0);
    
    // Draw text overlays
    const centerX = state.canvas.width / 2;
    const padding = 20;
    
    // Top text
    if (state.topText) {
        drawText(state.topText, centerX, padding, state.fontSize);
    }
    
    // Bottom text
    if (state.bottomText) {
        const bottomY = state.canvas.height - state.fontSize - padding;
        drawText(state.bottomText, centerX, bottomY, state.fontSize);
    }
}

function downloadMeme() {
    if (!state.image) {
        alert('Please upload an image first.');
        return;
    }
    
    // Convert canvas to blob
    state.canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `meme-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, 'image/png');
}
