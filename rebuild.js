const fs = require('fs');

let html = fs.readFileSync('c:/28/index_backup.html', 'utf8');

// 1. Remove EVERYTHING from the first games-menu-container's animal-search-container all the way to games-overlay closing div
// Actually, it's easier to just find where gato-container ends!
const gatoEnd = html.indexOf('</div>', html.indexOf('id="gato-log"')) + 7; // rough guess
// Let's just find exactly where the old animal-search-container starts!
const firstAnimalContainer = html.indexOf('<div id="animal-search-container"');

// And find where the games-overlay ends (which is the closing div after animal-search-container)
// But since the user pasted things at the end, let's just find the first audio tag, which is right after games-overlay!
const audioTag = html.indexOf('<audio id="audio-player"');

let cleanHtml = html.substring(0, firstAnimalContainer) + '\n' + html.substring(audioTag);

// 2. Build the perfect animal-search-container
let beautifulHtml = fs.readFileSync('c:/28/stitch_arrullo_estelar_interactivo (10)/code.html', 'utf8');

// Extract the main part of it:
const startContent = beautifulHtml.indexOf('<!-- Top Navigation Shell -->');
const endContent = beautifulHtml.indexOf('<!-- Navigation Shell -->');
let animalUI = beautifulHtml.substring(startContent, endContent);

// Translate and fix it
animalUI = animalUI.replace(/Animal Search/g, 'Sopa de Letras');
animalUI = animalUI.replace(/Celestial Edition/g, 'Edición Estelar');
animalUI = animalUI.replace(/HIDDEN ENTITIES/g, 'ENTIDADES OCULTAS');
animalUI = animalUI.replace(/Find all species to synchronize the celestial alignment\./g, 'Encuentra a todas las especies para sincronizar el plano astral.');
animalUI = animalUI.replace(/SOLVE SELECTION/g, 'RESOLVER TODO');
animalUI = animalUI.replace(/SHUFFLE GRID/g, 'REVOLVER RED');
animalUI = animalUI.replace(/Player Rank/g, 'Rango');
animalUI = animalUI.replace(/Novice Explorer/g, 'Explorador Novato');
animalUI = animalUI.replace(/"Need a scent\? Click me to reveal a hidden star-trail\."/g, '"¿Ocupas ayuda? Encuentra las palabras escondidas."');
animalUI = animalUI.replace(/<div class="absolute -top-2 -right-2 bg-tertiary text-on-tertiary text-\[10px\] font-black px-2 py-1 rounded-full shadow-lg">HINT<\/div>/, '<div class="absolute -top-2 -right-2 bg-tertiary text-on-tertiary text-[10px] font-black px-2 py-1 rounded-full shadow-lg">PISTA</div>');

// Wire buttons
animalUI = animalUI.replace(/<button class="text-\[#ca98ff\] hover:text-\[#00fbfb\] transition-colors duration-300 active:scale-95">/, '<button onclick="closeGamesMenu()" class="text-[#ca98ff] hover:text-[#00fbfb] transition-colors duration-300 active:scale-95 z-50">');
animalUI = animalUI.replace(/<button class="px-8 py-3 bg-surface-variant\/30 backdrop-blur-md rounded-full text-secondary font-headline font-bold text-sm tracking-widest border border-secondary\/20 hover:bg-secondary\/10 transition-all">\s*REVOLVER RED\s*<\/button>/, '<button onclick="startAnimalSearch()" class="px-8 py-3 bg-surface-variant/30 backdrop-blur-md rounded-full text-secondary font-headline font-bold text-sm tracking-widest border border-secondary/20 hover:bg-secondary/10 transition-all">REVOLVER RED</button>');
animalUI = animalUI.replace(/<button class="px-8 py-3 bg-gradient-to-r from-primary-dim to-primary rounded-full text-on-primary font-headline font-bold text-sm tracking-widest shadow-\[0_10px_20px_rgba\(202,152,255,0\.3\)\] active:scale-95 transition-all">\s*RESOLVER TODO\s*<\/button>/, '<button onclick="solveAnimalSearch()" class="px-8 py-3 bg-gradient-to-r from-primary-dim to-primary rounded-full text-on-primary font-headline font-bold text-sm tracking-widest shadow-[0_10px_20px_rgba(202,152,255,0.3)] active:scale-95 transition-all">RESOLVER TODO</button>');

// Inject IDs into the word list
animalUI = animalUI.replace(/<li class="flex items-center gap-3 group">[\s\S]*?<span class="font-label text-sm tracking-widest text-on-surface group-hover:text-secondary transition-colors uppercase">Girafa<\/span>\s*<\/li>/, 
    '<li id="word-girafa" class="flex items-center gap-3 group"><div class="w-2 h-2 rounded-full bg-outline-variant"></div><span class="font-label text-sm tracking-widest text-on-surface-variant group-hover:text-primary transition-colors uppercase">Girafa</span></li>');
animalUI = animalUI.replace(/<li class="flex items-center gap-3 opacity-40">[\s\S]*?<span class="font-label text-sm tracking-widest text-on-surface line-through uppercase">Leon<\/span>\s*<\/li>/, 
    '<li id="word-leon" class="flex items-center gap-3 group"><div class="w-2 h-2 rounded-full bg-outline-variant"></div><span class="font-label text-sm tracking-widest text-on-surface-variant group-hover:text-primary transition-colors uppercase">Leon</span></li>');
animalUI = animalUI.replace(/<li class="flex items-center gap-3 group">[\s\S]*?<span class="font-label text-sm tracking-widest text-on-surface-variant group-hover:text-primary transition-colors uppercase">Elefante<\/span>\s*<\/li>/, 
    '<li id="word-elefante" class="flex items-center gap-3 group"><div class="w-2 h-2 rounded-full bg-outline-variant"></div><span class="font-label text-sm tracking-widest text-on-surface-variant group-hover:text-primary transition-colors uppercase">Elefante</span></li>');
animalUI = animalUI.replace(/<li class="flex items-center gap-3 group">[\s\S]*?<span class="font-label text-sm tracking-widest text-on-surface-variant group-hover:text-primary transition-colors uppercase">Tigre<\/span>\s*<\/li>/, 
    '<li id="word-tigre" class="flex items-center gap-3 group"><div class="w-2 h-2 rounded-full bg-outline-variant"></div><span class="font-label text-sm tracking-widest text-on-surface-variant group-hover:text-primary transition-colors uppercase">Tigre</span></li>');
animalUI = animalUI.replace(/<li class="flex items-center gap-3 group">[\s\S]*?<span class="font-label text-sm tracking-widest text-on-surface-variant group-hover:text-primary transition-colors uppercase">Hormiga<\/span>\s*<\/li>/, 
    '<li id="word-hormiga" class="flex items-center gap-3 group"><div class="w-2 h-2 rounded-full bg-outline-variant"></div><span class="font-label text-sm tracking-widest text-on-surface-variant group-hover:text-primary transition-colors uppercase">Hormiga</span></li>');

// Add animal-cell-X ids and onclicks
let cellCounter = 0;
animalUI = animalUI.replace(/<div class="pixel-grid-cell/g, () => {
    const replacement = '<div id="animal-cell-' + cellCounter + '" onclick="handleAnimalClick(' + cellCounter + ')" class="pixel-grid-cell';
    cellCounter++;
    return replacement;
});

// Wrap it in the hidden container
const finalAnimalUI = '<div id="animal-search-container" class="hidden w-full min-h-screen relative">\n' + animalUI + '\n</div>\n</div>\n';

// Assemble the perfect index.html
let finalHtml = cleanHtml.replace('<audio id="audio-player"', finalAnimalUI + '<audio id="audio-player"');

fs.writeFileSync('c:/28/index.html', finalHtml);
console.log('Successfully rebuilt index.html!');
