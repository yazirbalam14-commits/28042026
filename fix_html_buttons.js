const fs = require('fs');
let html = fs.readFileSync('c:/28/index.html', 'utf8');

const playerControls = `
    <!-- Music Player Controls -->
    <div class="flex items-center justify-center gap-6 mt-4 mb-2 relative z-50">
        <button onclick="prevSong()" class="text-on-background/60 hover:text-primary transition-all hover:scale-110 active:scale-95">
            <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">skip_previous</span>
        </button>
        <button onclick="togglePlay()" id="play-pause-btn" class="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center text-primary border border-primary/30 hover:bg-primary/40 transition-all hover:scale-110 active:scale-95 shadow-[0_0_15px_rgba(202,152,255,0.4)]">
            <span class="material-symbols-outlined text-4xl" id="play-pause-icon" style="font-variation-settings: 'FILL' 1;">pause</span>
        </button>
        <button onclick="nextSong()" class="text-on-background/60 hover:text-primary transition-all hover:scale-110 active:scale-95">
            <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">skip_next</span>
        </button>
    </div>
`;

// Insert player controls just after the progress bar container
if (!html.includes('play-pause-btn')) {
    html = html.replace(/(<div class=\"star-progress-container[^>]*>[\s\S]*?<\/div>\s*<\/div>)/, '$1' + playerControls);
}

// Add memory book navigation buttons if they don't exist
if (!html.includes('prevBookPage')) {
    html = html.replace(/<button class=\"absolute top-8 right-8 text-white\/60 hover:text-white\" onclick=\"toggleMemoryBook\(\)\">/, 
        '<button id="prev-page" onclick="prevBookPage()" class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]" disabled><span class="material-symbols-outlined">arrow_back</span></button>\n' +
        '<button id="next-page" onclick="nextBookPage()" class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]"><span class="material-symbols-outlined">arrow_forward</span></button>\n' +
        '<button class="absolute top-8 right-8 text-white/60 hover:text-white" onclick="toggleMemoryBook()">');
}

fs.writeFileSync('c:/28/index.html', html);
console.log('index.html updated successfully with buttons.');
