const notepad = document.getElementById('notepad');
const notepadStatus = document.getElementById('notepad-status');
let notepadSaveTimeout;
let currentFontSize = 16;

const canvas = document.getElementById('whiteboardCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const brushSizeValue = document.getElementById('brushSizeValue');
const whiteboardStatus = document.getElementById('whiteboard-status');

const compilerLanguageSelect = document.getElementById('compilerLanguage');
const compilerFrame = document.getElementById('oneCompilerFrame');
const defaultCompilerLanguage = 'python';
const compilerLanguageMap = {
    javascript: 'javascript',
    python: 'python',
    java: 'java',
    c: 'c',
    cpp: 'cpp',
    csharp: 'csharp',
    ruby: 'ruby',
    go: 'go',
    php: 'php',
    kotlin: 'kotlin',
    swift: 'swift',
    bash: 'bash',
    html: 'html'
};

let isDrawing = false;
let isEraser = false;
let lastX = 0;
let lastY = 0;

function loadNotepad() {
    if (!notepad) {
        return;
    }

    const savedContent = localStorage.getItem('notepad-content');
    const savedFontSize = localStorage.getItem('notepad-font-size');

    if (savedContent) {
        notepad.value = savedContent;
    }

    if (savedFontSize) {
        const parsedSize = parseInt(savedFontSize, 10);
        if (!Number.isNaN(parsedSize)) {
            currentFontSize = parsedSize;
        }
    }

    notepad.style.fontSize = currentFontSize + 'px';
}

function saveNotepad() {
    if (!notepad) {
        return;
    }

    localStorage.setItem('notepad-content', notepad.value);
    localStorage.setItem('notepad-font-size', currentFontSize);

    if (notepadStatus) {
        notepadStatus.textContent = 'Saved ✓';
        notepadStatus.classList.add('saved');

        setTimeout(() => {
            if (!notepadStatus) {
                return;
            }
            notepadStatus.textContent = 'Auto-save enabled';
            notepadStatus.classList.remove('saved');
        }, 2000);
    }
}

if (notepad) {
    notepad.addEventListener('input', () => {
        if (notepadStatus) {
            notepadStatus.textContent = 'Saving...';
            notepadStatus.classList.remove('saved');
        }

        clearTimeout(notepadSaveTimeout);
        notepadSaveTimeout = setTimeout(() => {
            saveNotepad();
        }, 1000);
    });
}

function clearNotepad() {
    if (!notepad) {
        return;
    }

    if (confirm('Are you sure you want to clear all notes?')) {
        notepad.value = '';
        saveNotepad();
    }
}

function downloadNotepad() {
    if (!notepad) {
        return;
    }

    const blob = new Blob([notepad.value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'notepad_' + new Date().toISOString().slice(0, 10) + '.txt';
    anchor.click();
    URL.revokeObjectURL(url);
}

function copyNotepad() {
    if (!notepad) {
        return;
    }

    const text = notepad.value;

    const onSuccess = () => {
        if (notepadStatus) {
            notepadStatus.textContent = 'Copied to clipboard ✓';
            notepadStatus.classList.add('saved');
            setTimeout(() => {
                if (!notepadStatus) {
                    return;
                }
                notepadStatus.textContent = 'Auto-save enabled';
                notepadStatus.classList.remove('saved');
            }, 2000);
        }
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(onSuccess).catch(() => {
            fallbackCopy(text);
            onSuccess();
        });
    } else {
        fallbackCopy(text);
        onSuccess();
    }
}

function changeFontSize(action) {
    if (!notepad) {
        return;
    }

    if (action === 'increase') {
        currentFontSize += 2;
    } else if (action === 'decrease' && currentFontSize > 8) {
        currentFontSize -= 2;
    }

    notepad.style.fontSize = currentFontSize + 'px';
    localStorage.setItem('notepad-font-size', currentFontSize);
}

function loadWhiteboard() {
    if (!ctx || !canvas) {
        return;
    }

    const savedCanvas = localStorage.getItem('whiteboard-canvas');
    if (savedCanvas) {
        const img = new Image();
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
        img.src = savedCanvas;
    }
}

function saveWhiteboard() {
    if (!ctx || !canvas) {
        return;
    }

    localStorage.setItem('whiteboard-canvas', canvas.toDataURL());

    if (whiteboardStatus) {
        whiteboardStatus.textContent = 'Saved ✓';
        whiteboardStatus.classList.add('saved');

        setTimeout(() => {
            if (!whiteboardStatus) {
                return;
            }
            whiteboardStatus.textContent = 'Auto-save enabled';
            whiteboardStatus.classList.remove('saved');
        }, 2000);
    }
}

if (brushSize && brushSizeValue) {
    brushSizeValue.textContent = brushSize.value;
    brushSize.addEventListener('input', () => {
        brushSizeValue.textContent = brushSize.value;
    });
}

function startDrawing(e) {
    if (!ctx || !canvas) {
        return;
    }

    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX ?? (e.touches ? e.touches[0].clientX : 0);
    const clientY = e.clientY ?? (e.touches ? e.touches[0].clientY : 0);
    lastX = clientX - rect.left;
    lastY = clientY - rect.top;
}

function draw(e) {
    if (!isDrawing || !ctx || !canvas) {
        return;
    }

    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX ?? (e.touches ? e.touches[0].clientX : lastX);
    const clientY = e.clientY ?? (e.touches ? e.touches[0].clientY : lastY);
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = isEraser ? '#ffffff' : (colorPicker ? colorPicker.value : '#000000');
    ctx.lineWidth = brushSize ? brushSize.value : 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    lastX = x;
    lastY = y;
}

function stopDrawing() {
    if (!isDrawing) {
        return;
    }

    isDrawing = false;
    saveWhiteboard();
}

if (canvas) {
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startDrawing(e);
    });

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        draw(e);
    });

    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        stopDrawing();
    });
}

function clearWhiteboard() {
    if (!ctx || !canvas) {
        return;
    }

    if (confirm('Are you sure you want to clear the canvas?')) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        saveWhiteboard();
    }
}

function downloadWhiteboard() {
    if (!canvas) {
        return;
    }

    const url = canvas.toDataURL('image/png');
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'whiteboard_' + new Date().toISOString().slice(0, 10) + '.png';
    anchor.click();
}

function toggleEraser() {
    if (!canvas) {
        return;
    }

    isEraser = !isEraser;
    const eraserText = document.getElementById('eraserText');

    if (isEraser) {
        if (eraserText) {
            eraserText.textContent = 'Pen';
        }
        canvas.style.cursor = 'grab';
    } else {
        if (eraserText) {
            eraserText.textContent = 'Eraser';
        }
        canvas.style.cursor = 'crosshair';
    }
}

function initCompilerEmbed() {
    if (!compilerFrame) {
        return;
    }

    const storedLanguage = localStorage.getItem('compiler-language');
    const initialLanguage = storedLanguage || defaultCompilerLanguage;

    if (compilerLanguageSelect) {
        const hasStored = Array.from(compilerLanguageSelect.options).some(option => option.value === initialLanguage);
        compilerLanguageSelect.value = hasStored ? initialLanguage : defaultCompilerLanguage;

        compilerLanguageSelect.addEventListener('change', () => {
            const newLanguage = compilerLanguageSelect.value;
            localStorage.setItem('compiler-language', newLanguage);
            updateCompilerEmbed(newLanguage);
        });
    }

    updateCompilerEmbed(compilerLanguageSelect ? compilerLanguageSelect.value : initialLanguage);
}

function updateCompilerEmbed(language) {
    if (!compilerFrame) {
        return;
    }

    const slug = compilerLanguageMap[language] || compilerLanguageMap[defaultCompilerLanguage];
    const params = new URLSearchParams({ theme: 'dark', hideTitle: 'true' });
    compilerFrame.src = 'https://onecompiler.com/embed/' + slug + '?' + params.toString();

}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

function switchTab(button, tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.content').forEach(c => c.classList.remove('active'));

    if (button) {
        button.classList.add('active');
    }

    const panel = document.getElementById(tab + '-content');
    if (panel) {
        panel.classList.add('active');
    }

    if (tab === 'code' && compilerFrame && !compilerFrame.src) {
        const language = compilerLanguageSelect ? compilerLanguageSelect.value : defaultCompilerLanguage;
        updateCompilerEmbed(language);
    }
}

window.addEventListener('load', () => {
    loadNotepad();
    loadWhiteboard();
    initCompilerEmbed();
});

window.addEventListener('beforeunload', () => {
    saveNotepad();
    saveWhiteboard();
});
