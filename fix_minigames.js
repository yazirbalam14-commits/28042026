const fs = require('fs');

// 1. Fix Gato difficulty buttons in index.html
let html = fs.readFileSync('c:/28/index.html', 'utf8');

const diffButtons = `
<div class="flex gap-4 mb-4 justify-center relative z-50">
    <button onclick="setGatoDifficulty('easy')" class="px-4 py-2 bg-[#ca98ff]/10 border border-[#ca98ff]/30 rounded-full text-[#ca98ff] font-pixel text-[10px] hover:bg-[#ca98ff]/20">Ternura Cósmica (Fácil)</button>
    <button onclick="setGatoDifficulty('hard')" class="px-4 py-2 bg-[#00fbfb]/10 border border-[#00fbfb]/30 rounded-full text-[#00fbfb] font-pixel text-[10px] hover:bg-[#00fbfb]/20">Mente Maestra (Difícil)</button>
</div>
`;

// Insert the buttons into gato-container safely
if (!html.includes('Ternura Cósmica (Fácil)')) {
    html = html.replace(/(<!-- 3x3 Grid -->)/, diffButtons + '\n$1');
}

fs.writeFileSync('c:/28/index.html', html);


// 2. Fix Animal Search logic in script.js
let js = fs.readFileSync('c:/28/script.js', 'utf8');

const newAnimalLogic = `function checkAnimalSearchWin() {
    wordsToFind.forEach(w => {
        // Must select EXACTLY the right number of letters and they must all match
        if (!w.found && animalSelectedIndices.length === w.indices.length && w.indices.every(i => animalSelectedIndices.includes(i))) {
            w.found = true;
            foundWordsCount++;
            
            // Color the word (use hardcoded styles to prevent Tailwind purging issues)
            let colorHex = w.color === 'primary' ? '#ca98ff' : (w.color === 'secondary' ? '#00fbfb' : '#ff51fa');
            
            w.indices.forEach(i => {
                const c = document.getElementById('animal-cell-'+i);
                c.className = "pixel-grid-cell font-bold found";
                c.style.color = colorHex;
                c.style.backgroundColor = colorHex + '33'; // 20% opacity
                c.style.textShadow = '0 0 10px ' + colorHex;
            });
            
            // Clear current selection
            animalSelectedIndices = [];
            
            if (foundWordsCount === wordsToFind.length) {
                setTimeout(() => alert('¡Increíble! Has encontrado a todos los animales en las estrellas. 🌟'), 500);
            }
        }
    });
}

function handleAnimalClick(idx) {
    const cell = document.getElementById('animal-cell-'+idx);
    
    // Ignore already found words
    if (cell.classList.contains('found')) return;
    
    if(animalSelectedIndices.includes(idx)) {
        animalSelectedIndices = animalSelectedIndices.filter(i => i !== idx);
        cell.classList.remove('bg-white/20');
        cell.style.backgroundColor = '';
    } else {
        animalSelectedIndices.push(idx);
        cell.classList.add('bg-white/20');
        cell.style.backgroundColor = 'rgba(255,255,255,0.2)';
    }
    
    checkAnimalSearchWin();
}`;

js = js.replace(/function handleAnimalClick\(idx\) \{[\s\S]*?\}\s*function checkAnimalSearchWin\(\) \{[\s\S]*?\}\s*function startAnimalSearch\(\)/, newAnimalLogic + '\n\nfunction startAnimalSearch()');

// Fix LEON indices
js = js.replace(/{ word: 'LEON', indices: \[24, 25, 26, 27\], color: 'tertiary' },/, "{ word: 'LEON', indices: [24, 26, 27, 28], color: 'tertiary' },");

fs.writeFileSync('c:/28/script.js', js);
console.log('Fixed Minigames');
