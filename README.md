# 📝 Online Notepad, Whiteboard & Code Runner

🌐 **[Live Demo »](https://rd9437.github.io/Online-Notepad-Whiteboard-CodeEditor/)**

A clean, simple, and beginner-friendly online notepad, whiteboard, and code playground built with vanilla HTML, CSS, and JavaScript. It saves notes and drawings locally using `localStorage`, and now embeds a hosted code runner so you can execute snippets without leaving the page.

---

## ✨ Features

### 📝 Notepad
- ✍️ **Instantly write and edit notes** with auto-save functionality
- 💾 **Download notes as a text file** (.txt)
- 📋 **Copy notes to clipboard** with one click
- 🔍 **Adjustable font size** for better readability
- 🗑️ **Clear all notes** with confirmation
- ⚡ **Auto-save with debounce** — saves 1 second after you stop typing
- 💿 **Persistent storage** — notes are saved even after closing the browser

### 🎨 Whiteboard
- 🖌️ **Draw freely** with customizable brush colors
- 📏 **Adjustable brush size** (1-50px)
- ✏️ **Eraser tool** to remove mistakes
- 🗑️ **Clear canvas** with confirmation
- 💾 **Download drawings as PNG images**
- 📱 **Touch support** for mobile and tablet devices
- 💿 **Auto-save canvas** — drawings persist across sessions

### 💻 Cloud Code Runner
- 🚀 **Instant code execution** powered by an embedded sandbox
- 🗂️ **Language selector** with Python (default), JavaScript, Java, C/C++, and more
- 🌐 **Hosted execution environment** — no setup or backend required
- 🕔 **Remembers your last language** using localStorage for convenience

### 🎯 General
- 🔄 **Tab-based interface** to switch between notepad, whiteboard, and code runner
- 📱 **Responsive design** — works on desktop, tablet, and mobile
- 🎨 **Beautiful gradient UI** with modern design
- 💾 **Local-first** — notes and drawings live in your browser; code runs through a hosted sandbox when online
- 🔒 **Privacy-conscious** — nothing is sent anywhere unless you run code

---

## 🧠 Why Use This App?

- **No account required** — just open and start using
- **Offline-friendly** — notes and sketches work offline; the code runner streams to the sandbox on demand
- **Your data stays private** — nothing leaves your device unless you execute code
- **Lightweight and fast** — pure vanilla JavaScript, no frameworks
- **Free and open-source** — use it, modify it, learn from it

---

## 🚀 Getting Started

To use the Online Notepad, Whiteboard & Code Runner locally:

### 1. Clone or download the repository:
```bash
git clone https://github.com/rd9437/Online-Notepad-Whiteboard-codeeditor.git
cd Online-Notepad-Whiteboard-codeeditor
```

### 2. Open the `index.html` file:
Simply double-click `index.html` or open it in your browser:
```bash
# On Windows
start index.html

# On Mac
open index.html

# On Linux
xdg-open index.html
```

That's it! No installation, no dependencies, no build process needed. 🎉

---

## 🗂️ Project Structure

```
.
├── index.html          # Main HTML structure
├── style.css           # All styling and CSS
├── script.js           # JavaScript functionality
└── README.md           # Documentation
```

---

## 🛠️ Tech Stack

- **HTML5** — Structure and Canvas API
- **CSS3** — Modern styling with gradients and flexbox
- **JavaScript (Vanilla)** — Pure JS, no frameworks
- **localStorage API** — Client-side data persistence
- **Canvas API** — Drawing functionality for whiteboard
- **Hosted Sandbox Embed** — Cloud-based code execution inside the app

---

## 💡 How It Works

### Notepad:
1. Type your notes in the text area
2. Notes auto-save 1 second after you stop typing
3. Access saved notes anytime — even after closing the browser
4. Download, copy, or clear your notes as needed

### Whiteboard:
1. Select a color and brush size
2. Draw on the canvas with mouse or touch
3. Canvas auto-saves after each drawing stroke
4. Download your artwork as a PNG image

### Code Runner:
1. Pick a language from the dropdown (Python loads by default)
2. Type or paste code inside the embedded sandbox IDE
3. Press **Run** to execute code on the cloud infrastructure
4. View results right inside the embed; copy or download anything you want to keep

### Data Storage:
- All data is stored in browser's **localStorage**
- Notepad content saved as plain text
- Whiteboard saved as base64-encoded PNG image
- Data persists until you clear browser data or manually delete
- The code runner uses the provider's servers; this app does not persist code snippets locally

---

## 🙋 FAQ

**Q: Do I need an internet connection?**  
A: Notes and the whiteboard work offline after the first load. The code runner requires an active internet connection to reach the hosted service.

**Q: Where is my data stored?**  
A: Notes and drawings stay in your browser's localStorage. Code you execute is processed on the sandbox provider's servers.

**Q: Can I access my notes on another device?**  
A: No, localStorage is device-specific. For cloud sync, you'd need to add a backend.

**Q: What happens if I clear my browser data?**  
A: Your notes and drawings will be deleted. Download important content first!

**Q: Is there a file size limit?**  
A: localStorage typically allows 5-10MB per domain. This is plenty for notes and drawings.

**Q: Can I customize the colors/design?**  
A: Absolutely! Just edit `style.css` to your liking.

**Q: Does the code runner save my snippets?**  
A: Sessions are temporary. Copy or download your code/output if you need to keep it.

---

## 🎨 Customization

### Change Color Scheme:
Edit the gradient colors in `style.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Adjust Canvas Size:
Modify the canvas dimensions in `index.html`:
```html
<canvas id="whiteboardCanvas" width="1000" height="600"></canvas>
```

### Change Auto-Save Delay:
Update the timeout in `script.js`:
```javascript
notepadSaveTimeout = setTimeout(() => {
    saveNotepad();
}, 1000); // Change 1000 to your preferred milliseconds
```

---

## 📬 Support

Have questions or suggestions?  
Open an issue or reach out via [rudransh.tech](https://rudransh.tech)

---

## 📄 License

© 2026 All rights reserved | By Rudransh Das

---

## 🌟 Star this repo if you find it useful!

Made with ❤️ by Rudransh Das
