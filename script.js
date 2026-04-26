const targetDate = new Date().getTime() + (2 * 60 * 1000);
let currentScene = 0, currentSongIndex = 0, bgInterval;
let gatoDifficulty = 'hard';
let scores = { player: 0, cpu: 0 };
let selectedIndices = []; // Única declaración global

const scenes = [
    { id: 'scene-0', url: 'imagenes/memoria_00.png' },
    { id: 'scene-1', url: 'imagenes/memoria_01.png' },
    { id: 'scene-2', url: 'imagenes/memoria_02.png' },
    { id: 'scene-3', url: 'imagenes/memoria_03.png' },
    { id: 'scene-4', url: 'imagenes/memoria_04.png' },
    { id: 'scene-5', url: 'imagenes/memoria_05.png' },
    { id: 'scene-6', url: 'imagenes/memoria_10.jpeg' },
    { id: 'scene-7', url: 'imagenes/memoria_11.jpeg' },
    { id: 'scene-8', url: 'imagenes/memoria_12.jpeg' },
    { id: 'scene-9', url: 'imagenes/memoria_13.jpeg' },
    { id: 'scene-10', url: 'imagenes/memoria_14.jpeg' },
    { id: 'scene-11', url: 'imagenes/memoria_15.jpeg' },
    { id: 'scene-12', url: 'imagenes/memoria_16.jpeg' },
    { id: 'scene-13', url: 'imagenes/memoria_17.jpeg' },
    { id: 'scene-14', url: 'imagenes/memoria_18.jpeg' },
    { id: 'scene-15', url: 'imagenes/memoria_19.jpeg' },
    { id: 'scene-16', url: 'FONDOS/fondo_extra_01.jpeg' },
    { id: 'scene-17', url: 'FONDOS/fondo_extra_02.jpeg' },
    { id: 'scene-18', url: 'FONDOS/fondo_extra_03.jpeg' },
    { id: 'scene-19', url: 'FONDOS/fondo_extra_04.jpeg' }
];

const playlist = [
    {
        title: "Arrullo de Estrellas",
        file: "arrullo_de_estrellas.mp3",
        lyrics: [
            { time: 13, duration: 2, text: "En el faro de tu amor" },
            { time: 16, duration: 2, text: "En el regazo de tu piel" },
            { time: 19, duration: 4, text: "Me dejo llevar al sol" },
            { time: 25, duration: 3, text: "Es que no hay nadie como tú" },
            { time: 28, duration: 3, text: "Que me haga sentir así" },
            { time: 31, duration: 3, text: "En un arrullo de estrellas" },
            { time: 35, duration:2, text: "Oh, oh, oh..." },
            { time: 37, duration: 3, text: "Te lo digo desde el alma" },
            { time: 40, duration: 4, text: "Y con el corazón abierto" },
            { time: 46, duration: 3, text: "En un páramo de luz" },
            { time: 49, duration: 3, text: "Despojados del dolor" },
            { time: 52, duration: 4, text: "Nos volvemos a encontrar" },
            { time: 57, duration: 4, text: "Al final del infinito" },
            { time: 61, duration: 3, text: "Entre ríos púrpura" },
            { time: 64, duration: 3, text: "A LA FUENTE REGRESAR" },
            { time: 67, duration: 3, text: "AH-AH-AH" },
            { time: 87, duration: 2, text: "En el faro de tu amor " },
            { time: 89, duration: 2, text: "En el regazo de tu piel" },
            { time: 93, duration: 3, text: "Me dejo llevar al sol" },
            { time: 98, duration: 2, text: "Al final del infinito" },
            { time: 101, duration: 2, text: "Entre ríos púrpura" },
            { time: 104, duration: 3, text: "Nos volvemos a encontrar" },
            { time: 107, duration: 2, text: "AH-AH-AH" },
            { time: 111, duration: 2, text: "Eres mi amor eterno" },
            { time: 113, duration: 3, text: "Mi ángel de la guarda" },
            { time: 116, duration: 2, text: "AH-AH-AH" },
            { time: 120, duration: 2, text: "Te lo digo desde el alma" },
            { time: 122, duration: 3, text: "Y con el corazón abierto" },
            { time: 125, duration: 2, text: "AH-AH-AH" },
            { time: 133, duration: 4, text: "ENTRE TUS ALAS DORMÍ" },
            { time: 137, duration: 5, text: "Y EN TU MIRADA COMPRENSIVA, CRECÍ" },
            { time: 143, duration: 5, text: "SIEMPRE CONFIASTE EN TODO LO QUE SOÑÉ" },
            { time: 150, duration: 4, text: "Me cuidaste y me guiaste hasta aquí." },
            { time: 155, duration: 2, text: "AH-AH-AH" },
            { time: 158, duration: 2, text: "Te lo digo desde el alma" },
            { time: 161, duration: 3, text: "Y con el corazón abierto" },
            { time: 164, duration: 2, text: "AH-AH-AH" },
            { time: 167, duration: 2, text: "Eres mi amor eterno" },
            { time: 169, duration: 2, text: "Mi ángel de la guarda" },
            { time: 172, duration: 2, text: "AH-AH-AH" },
            { time: 175, duration: 2, text: "Te lo digo desde el alma" },
            { time: 178, duration: 2, text: "Y con el corazón abierto" },
            { time: 180, duration: 2, text: "AH-AH-AH" },
            { time: 184, duration: 2, text: "Eres mi amor eterno" },
            { time: 187, duration: 2, text: "Mi ángel de la guarda" },
            { time: 190, duration: 2, text: "AH-AH-AH" },
            { time: 193, duration: 2, text: "Te lo digo desde el alma" },
            { time: 195, duration: 3, text: "MARÍA LLENA ERES DE GRACIA" },
            { time: 198, duration: 2, text: "AH-AH-AH" },
            { time: 202, duration: 5, text: "TE AMO MUCHO, MUCHO MI HILEN" },
            { time: 207, duration: 5, text: "GRACIAS POR ESTOS DOS AÑOS JUNTOS MI CHAPA" },
            { time: 212, duration: 5, text: "TAL VEZ NO ES LO MEJOR PERO LO HICE CON MUCHO AMOR JEJEJEJE" },
            { time: 217, duration: 5, text: "ESPERO TE GUSTE ESTE PEQUEÑO DETALLE" },
            { time: 222, duration: 15, text: "TE AMO POR SIEMPRE" }
        ]
    },
    {
        title: "Hasta La Muerte",
        file: "hasta_la_muerte.mp3",
        lyrics: [
            { time: 16, duration: 5, text: "Yo me pierdo en tu mirada cada vez" },
            { time: 21, duration: 4, text: "Cuando tú me miras con tus ojitos de miel" },
            { time: 25, duration: 4, text: "En verdad me tienes bien hipnotizado" },
            { time: 29, duration: 4, text: "Quiero sentir tu presencia a cada rato" },
            { time: 33, duration: 4, text: "Te pido que me abraces fuertemente" },
            { time: 37, duration: 5, text: "Solo tú y yo hasta el final, a la muerte" },
            { time: 42, duration: 4, text: "Tus caricias me quitan lo estresado" },
            { time: 45, duration: 5, text: "Solo tú me entiendes, por eso yo a ti te amo" },
            { time: 50, duration: 5, text: "Y cuando me besas, eso sí me hace sentir" },
            { time: 56, duration: 4, text: "Que puedo bajarte las estrellas" },
            { time: 60, duration: 4, text: "Y de una vez también bajarte toda la luna" },
            { time: 67, duration: 5, text: "No aguanto estar un día sin tu carita" },
            { time: 72, duration: 5, text: "Bien obsesionado estoy, sin dudar" },
            { time: 77, duration: 5, text: "Bebé, quiero compartir toda una vida entera" },
             { time: 87, duration: 2, text: "Y ahí te va, chiquitita" },
            { time: 91, duration: 2, text: "Compa Iván" },
            { time: 93, duration: 2, text: "Compa Pedro" },
            { time: 95, duration: 2, text: "Y puro Eslabón Armado" },
            { time: 118, duration: 3, text: "Yo disfruto cada momento contigo" },
            { time: 122, duration: 3, text: "Sea poca cosa, solo que sea contigo" },
            { time: 126, duration: 3, text: "Iluminas todos mis sextos sentidos" },
            { time: 130, duration: 4, text: "No me importa lo de afuera, por dentro es motivo" },
            { time: 135, duration: 4, text: "Para seguir amándote siempre, mi vida" },
            { time: 141, duration: 3, text: "No soltaré tus lindas manitas" },
            { time: 145, duration: 5, text: "Todos nuestros momentos quedarán en mi alma" },
            { time: 151, duration: 5, text: "Si un día te sientes que ya no te quiero más" },
            { time: 158, duration: 3, text: "Te aseguro de nadie comparar" },
            { time: 161, duration: 6, text: "Tus besos, tus caricias, mucho menos tu mirar" },
            { time: 168, duration: 5, text: "Apesar de la distancia solo tengo ojos para ti" },
            { time: 174, duration: 6, text: "Te amo mucho mi mujer hermosa" },
            { time: 180, duration: 5, text: "OLAAAAA MUEJEJEJEJE , BESOTES " },
            { time: 185, duration: 6, text: "EN LAS  CHICHIS MUAJAJAAJAJ TQMMMMMMMM" },
            { time: 191, duration: 5, text: "ERES MI TODO TODO AMOR" },
            { time: 200, duration: 4, text: "Y SI ME AMAS O NADOTA ?" },
            
        ]
    },
    {
        title: "Si me esperas",
        artist: "Wuicho kun, b",
        file: "si_me_esperas.mp3",
        lyrics: [
            { time: 17, duration: 6, text: "Si me esperas te prometo no tardar" },
            { time: 25, duration: 6, text: "Primaveras que nunca voy a olvidar" },
            { time: 32, duration: 5, text: "Y aunque no me guste tanto que no estás" },
            { time: 39, duration: 5, text: "A la misma luna vamos a mirar" },
            { time: 46, duration: 3, text: "No dejes de sentir" },
            { time: 51, duration: 3, text: "Lo que siento por ti" },
            { time: 55, duration: 4, text: "Guárdame por ahí" },
            { time: 60, duration: 2, text: "Muy cerquita de ti" },
            { time: 63, duration: 7, text: "Yo haré pequeños los segundos" },
            { time: 70, duration: 4, text: "Y que no notes que me fui" },
            { time: 81, duration: 6, text: "Si te espero te buscaré en cada rincón" },
            { time: 90, duration: 2, text: "Me estoy rompiendo" },
            { time: 92, duration: 3, text: "No me calienta ya ni el sol" },
            { time: 95, duration: 8, text: "Y aunque no me guste tanto la idea que te vas" },
            { time: 103, duration: 6, text: "Sé que a la misma luna vamos a mirar" },
            { time: 110, duration: 3, text: "No dejes de sentir" },
            { time: 114, duration: 4, text: "Lo que siento por ti" },
            { time: 118, duration: 3, text: "Guárdame por ahí" },
            { time: 123, duration: 2, text: "Muy cerquita de ti" },
            { time: 127, duration: 6, text: "Yo haré pequeños los segundos" },
            { time: 135, duration: 7, text: "Dos almas, un instante juntos" },
            { time: 143, duration: 5, text: "Que no notes que ha cambiado el mundo" },
            { time: 149, duration: 4, text: "Y que no notes que me fui" },
            { time: 154, duration: 4, text: "Que no notes que me fui" },
            { time: 158, duration: 3, text: "Que notes que yo sigo aquí" },
            { time: 162, duration: 4, text: "Que no notes que me fui" },
            { time: 166, duration: 4, text: "Que siempre me tienes aquí" },
            { time: 170, duration: 4, text: "Espereme chapa :( " }
        ]
    }
];

// --- ATMÓSFERA ---
function createAtmosphere() {
    const container = document.getElementById('world-container');
    if(!container) return;
    
    // Colores para los destellos
    const sparkleColors = ['#ffffff', '#fff700', '#00ff41', '#ff00d4', '#00fbfb', '#ff9100', '#ca98ff'];

    for(let i=0; i<150; i++) { // Aumentado a 150 para más brillo
        const s = document.createElement('div');
        s.className = 'star-sparkle';
        const sz = Math.random() * 4 + 1;
        const color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
        
        s.style.width = sz + 'px';
        s.style.height = sz + 'px';
        s.style.left = Math.random() * 100 + '%';
        s.style.top = Math.random() * 100 + '%';
        s.style.backgroundColor = color;
        s.style.boxShadow = `0 0 15px ${color}`; // Brillo del color correspondiente
        s.style.animationDuration = (Math.random() * 2 + 2) + 's';
        s.style.animationDelay = (Math.random() * 5) + 's';
        container.appendChild(s);
    }
    for(let i=0; i<25; i++) {
        const g = document.createElement('div');
        g.className = 'goya-light';
        const sz = Math.random() * 180 + 100;
        g.style.width = sz + 'px', g.style.height = sz + 'px';
        g.style.left = Math.random() * 100 + '%', g.style.top = Math.random() * 100 + '%';
        g.style.opacity = Math.random() * 0.15;
        container.appendChild(g);
    }
    for(let i=0; i<60; i++) {
        const d = document.createElement('div');
        d.className = 'rain-drop';
        d.style.left = Math.random() * 100 + '%';
        d.style.animationDuration = (Math.random() * 1 + 1) + 's';
        d.style.animationDelay = (Math.random() * 5) + 's';
        container.appendChild(d);
    }
}

// --- AUDIO ---
const bgAudio = document.getElementById('bg-music');

// Configuración inicial del audio
if(bgAudio) {
    bgAudio.addEventListener('ended', () => {
        console.log("Canción terminada, pasando a la siguiente...");
        nextSong();
    });

    bgAudio.addEventListener('error', (e) => {
        console.error("Error detectado en el elemento de audio:", bgAudio.error);
        const container = document.getElementById('romantic-message-container');
        if(container) {
            container.innerHTML = `<div class="bg-red-500/20 backdrop-blur-md p-4 rounded-xl border border-red-500/50"><p class="text-white text-[10px] font-pixel">ERROR DE CONEXIÓN MUSICAL... REINTENTANDO</p></div>`;
            setTimeout(() => { container.innerHTML = ''; }, 5000);
        }
    });
}

function playSong(idx) {
    currentSongIndex = idx;
    if(!bgAudio) return;
    
    // Limpiar letra actual
    const d = document.getElementById('lyric-line'); 
    if(d) {
        d.innerText = "";
        d.style.opacity = '0';
    }

    // Asegurar que la ruta sea correcta y limpia
    const songFile = playlist[idx].file;
    bgAudio.src = songFile;
    
    console.log("Intentando reproducir:", playlist[idx].title, "Archivo:", songFile);
    
    bgAudio.load(); // Forzar recarga del recurso
    
    bgAudio.play().then(() => {
        console.log("Reproduciendo exitosamente:", playlist[idx].title);
        renderPlaylist();
    }).catch(e => {
        console.error("Error al reproducir " + playlist[idx].title + ":", e);
        // Si falla, intentamos la siguiente después de un breve momento
        if (e.name === 'NotSupportedError' || e.name === 'AbortError' || e.name === 'NotAllowedError') {
            console.warn("Fallo crítico en reproducción, saltando a la siguiente canción en 3s...");
            setTimeout(nextSong, 3000);
        }
    });
}
function prevSong() { playSong((currentSongIndex - 1 + playlist.length) % playlist.length); }
function nextSong() { playSong((currentSongIndex + 1) % playlist.length); }
function togglePlay() {
    const icon = document.getElementById('play-pause-icon');
    if(!bgAudio || !icon) return;
    if(bgAudio.paused) { bgAudio.play(); icon.innerText = 'pause'; }
    else { bgAudio.pause(); icon.innerText = 'play_arrow'; }
}

function startLyrics() {
    const d = document.getElementById('lyric-line');
    if(!bgAudio || !d) return;
    bgAudio.ontimeupdate = () => {
        const cur = playlist[currentSongIndex].lyrics;
        let line = null;
        for (let i = 0; i < cur.length; i++) {
            if (bgAudio.currentTime >= cur[i].time && bgAudio.currentTime < (cur[i].time + cur[i].duration)) {
                line = cur[i].text; break;
            }
        }
        if (line) { if (d.innerText !== line) { d.innerText = line; d.style.opacity = '1'; } }
        else { d.style.opacity = '0'; }
    };
}

// --- FONDOS ---
function toggleBackground() {
    if (bgInterval) clearInterval(bgInterval);
    
    const cur = document.getElementById(`scene-${currentScene}`);
    if(!cur) return;
    cur.style.opacity = '0';
    
    currentScene = (currentScene + 1) % scenes.length;
    
    const next = document.getElementById(`scene-${currentScene}`);
    if(next) next.style.opacity = '1';
    
    // Reiniciar el contador de 30 segundos
    bgInterval = setInterval(toggleBackground, 40000);
}

function startExperience() {
    const overlay = document.getElementById('start-overlay');
    if(!overlay) return;
    gsap.to(overlay, { opacity: 0, duration: 1.5, onComplete: () => {
        overlay.style.display = 'none';
        initWorld(); 
        createAtmosphere();
        
        // Iniciar ciclo de 30 segundos
        bgInterval = setInterval(toggleBackground, 40000);
        
        playSong(0); 
        startLyrics();
    }});
}

function initWorld() {
    const container = document.getElementById('world-container');
    if(!container) return;
    container.innerHTML = '';
    scenes.forEach((s, i) => {
        const div = document.createElement('div');
        div.id = s.id; div.className = `absolute inset-0 transition-opacity duration-[2500ms] ${i===0 ? 'opacity-100' : 'opacity-0'}`;
        div.innerHTML = `<img src="${s.url}" class="pixel-bg">`;
        container.appendChild(div);
    });
}

function toggleMusicMenu() { 
    const el = document.getElementById('music-menu');
    if(el) el.classList.toggle('translate-x-full'); 
}
function renderPlaylist() {
    const container = document.getElementById('playlist-items'); if(!container) return;
    container.innerHTML = '';
    playlist.forEach((song, i) => {
        const btn = document.createElement('button');
        btn.className = `w-full text-left p-4 rounded-xl transition-all ${i===currentSongIndex ? 'bg-primary/20 border border-primary/40' : 'hover:bg-white/5 border border-transparent'}`;
        btn.innerHTML = `<div class="text-[8px] uppercase text-secondary font-pixel">Track ${i+1}</div><div class="text-xs font-bold text-white/80">${song.title}</div>`;
        btn.onclick = () => playSong(i);
        container.appendChild(btn);
    });
}

// --- GATO ---
let gatoActive = false, gatoState = ["","","","","","","","",""];
function toggleGamesMenu() {
    const overlay = document.getElementById('games-overlay');
    if(!overlay) return;
    if (overlay.classList.contains('hidden')) {
        overlay.classList.remove('hidden'); showGameContainer('games-menu-container');
        setTimeout(() => overlay.classList.add('opacity-100'), 10);
    } else closeGamesMenu();
}
function closeGamesMenu() {
    const overlay = document.getElementById('games-overlay');
    if(!overlay) return;
    overlay.classList.remove('opacity-100'); setTimeout(() => overlay.classList.add('hidden'), 500);
    stopAnimalTimer();
}
function showGameContainer(id) {
    ['games-menu-container', 'gato-container', 'animal-search-container'].forEach(cid => {
        const el = document.getElementById(cid);
        if(el) el.classList.add('hidden');
    });
    const target = document.getElementById(id);
    if(target) target.classList.remove('hidden');
}

function setGatoDifficulty(diff) {
    gatoDifficulty = diff;
    const bn = document.getElementById('btn-diff-normal'), bh = document.getElementById('btn-diff-hard');
    if(bn) bn.className = diff === 'normal' ? 'py-2 rounded-full border-2 border-secondary text-secondary text-[8px] font-pixel transition-all uppercase' : 'py-2 rounded-full border border-white/10 text-[8px] font-pixel transition-all uppercase opacity-50';
    if(bh) bh.className = diff === 'hard' ? 'py-2 rounded-full border-2 border-secondary text-secondary text-[8px] font-pixel transition-all uppercase' : 'py-2 rounded-full border border-white/10 text-[8px] font-pixel transition-all uppercase opacity-50';
    startGato();
}

function startGato() {
    gatoState = ["","","","","","","","",""]; gatoActive = true;
    showGameContainer('gato-container'); updateGatoUI();
}
function handleGato(idx) {
    if (!gatoActive || gatoState[idx] !== "") return;
    gatoState[idx] = "X"; updateGatoUI();
    if (checkWin("X")) { scores.player++; updateGatoUI(); showGameMsg("WIN", "win"); return; }
    if (!gatoState.includes("")) { showGameMsg("EMPATE", "draw"); return; }
    gatoActive = false;
    setTimeout(() => {
        let move;
        if (gatoDifficulty === 'hard') move = getBestMove(gatoState);
        else {
            const empty = gatoState.map((v, i) => v === "" ? i : null).filter(v => v !== null);
            move = empty[Math.floor(Math.random() * empty.length)];
        }
        if(move !== undefined) {
            gatoState[move] = "O"; updateGatoUI();
            if (checkWin("O")) { scores.cpu++; updateGatoUI(); showGameMsg("LOSE", "lose"); }
            else if (!gatoState.includes("")) showGameMsg("EMPATE", "draw");
            else gatoActive = true;
        }
    }, 600);
}
function updateGatoUI() {
    gatoState.forEach((val, i) => {
        const el = document.getElementById(`gato-cell-${i}`);
        if(el) el.innerHTML = val === "X" ? '<span class="material-symbols-outlined text-primary text-5xl">close</span>' : val === "O" ? '<span class="material-symbols-outlined text-secondary text-5xl">radio_button_unchecked</span>' : '';
    });
    const sp = document.getElementById('gato-score-player'), sc = document.getElementById('gato-score-cpu');
    if(sp) sp.innerText = scores.player.toString().padStart(2,'0');
    if(sc) sc.innerText = scores.cpu.toString().padStart(2,'0');
}
function checkWin(p) { return [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]].some(c => c.every(i => gatoState[i] === p)); }
function showGameMsg(msg, type = "win") {
    gatoActive = false;
    const container = document.getElementById('romantic-message-container');
    if(!container) return;
    let finalMsg = "MUAJAJAJAJA SI PUDISTE JEJEJJEEJ";
    if(type === "lose") finalMsg = "JEJEJE TE GANÉ, INTENTA OTRA VEZ ❤️";
    if(type === "draw") finalMsg = "EMPATE... ¡CASI ME GANAS!";
    container.innerHTML = `<div class="bg-black/80 backdrop-blur-xl p-8 rounded-3xl border-2 border-primary animate-bounce shadow-2xl"><p class="text-primary font-pixel text-[10px] tracking-widest text-center">${finalMsg}</p></div>`;
    setTimeout(() => container.innerHTML = '', 4000);
}
function getBestMove(board) {
    let bestScore = -Infinity, move;
    for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
            board[i] = "O"; let score = minimax(board, 0, false); board[i] = "";
            if (score > bestScore) { bestScore = score; move = i; }
        }
    }
    return move;
}
function minimax(board, depth, isMax) {
    if (checkWinState(board, "O")) return 10;
    if (checkWinState(board, "X")) return -10;
    if (!board.includes("")) return 0;
    if (isMax) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) { if (board[i] === "") { board[i] = "O"; bestScore = Math.max(bestScore, minimax(board, depth + 1, false)); board[i] = ""; } }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) { if (board[i] === "") { board[i] = "X"; bestScore = Math.min(bestScore, minimax(board, depth + 1, true)); board[i] = ""; } }
        return bestScore;
    }
}
function checkWinState(b, p) { return [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]].some(c => c.every(i => b[i] === p)); }

// --- SOPA ---
let animalTimer = 60, animalInterval;
const animalWordsPool = ["GIRAFA", "LEON", "ELEFANTE", "TIGRE", "HORMIGA", "CONEJO", "GATO", "PERRO", "AVISPA", "ZORRO"];
let currentWords = [];
function startAnimalSearch() {
    showGameContainer('animal-search-container');
    selectedIndices = []; animalTimer = 60;
    currentWords = animalWordsPool.sort(() => 0.5 - Math.random()).slice(0, 5).map(w => ({ word: w, found: false, indices: [] }));
    const list = document.getElementById('word-list'); if(!list) return;
    list.innerHTML = '';
    currentWords.forEach(w => {
        const li = document.createElement('li'); li.id = `word-${w.word.toLowerCase()}`;
        li.className = "flex items-center gap-2 text-on-surface/40 font-bold text-[10px]";
        li.innerHTML = `<div class="w-1.5 h-1.5 rounded-full bg-white/20"></div>${w.word}`;
        list.appendChild(li);
    });
    generateGrid(); startAnimalTimer();
}
function generateGrid() {
    const grid = document.getElementById('animal-grid'); if(!grid) return;
    const size = 144, letters = Array(size).fill(null);
    currentWords.forEach(w => {
        let placed = false;
        while (!placed) {
            const horiz = Math.random() > 0.5, start = Math.floor(Math.random() * size), wordIdx = [];
            let can = true;
            for (let i = 0; i < w.word.length; i++) {
                const idx = horiz ? start + i : start + (i * 12);
                if (idx >= size || (horiz && Math.floor(start/12) !== Math.floor(idx/12)) || letters[idx] !== null) { can = false; break; }
                wordIdx.push(idx);
            }
            if (can) { wordIdx.forEach((idx, i) => letters[idx] = w.word[i]); w.indices = wordIdx; placed = true; }
        }
    });
    grid.innerHTML = '';
    letters.forEach((l, i) => {
        const div = document.createElement('div');
        div.className = "w-8 h-8 md:w-10 md:h-10 flex items-center justify-center font-pixel text-[10px] cursor-pointer hover:bg-white/10 rounded transition-all select-none border border-white/5";
        div.innerText = l || "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random()*26)];
        div.id = `animal-cell-${i}`; div.onclick = () => {
            if (div.classList.contains('found')) return;
            if (selectedIndices.includes(i)) { selectedIndices = selectedIndices.filter(idx => idx !== i); div.classList.remove('bg-primary/40'); }
            else { selectedIndices.push(i); div.classList.add('bg-primary/40'); }
            checkAnimalWords();
        };
        grid.appendChild(div);
    });
}
function startAnimalTimer() {
    clearInterval(animalInterval);
    animalInterval = setInterval(() => {
        animalTimer--;
        const tE = document.getElementById('animal-timer-text'); if(tE) tE.innerText = `00:${String(animalTimer).padStart(2, '0')}`;
        if (animalTimer <= 0) { clearInterval(animalInterval); showGameMsg("TIEMPO AGOTADO", "lose"); startAnimalSearch(); }
    }, 1000);
}
function stopAnimalTimer() { clearInterval(animalInterval); }
function checkAnimalWords() {
    currentWords.forEach(w => {
        if (!w.found && w.indices.every(idx => selectedIndices.includes(idx))) {
            w.found = true; animalTimer += 10;
            w.indices.forEach(idx => {
                const c = document.getElementById(`animal-cell-${idx}`);
                if(c) { c.classList.replace('bg-primary/40', 'found'); c.classList.add('text-secondary', 'font-bold'); c.style.backgroundColor = 'rgba(0, 251, 251, 0.2)'; }
            });
            const el = document.getElementById(`word-${w.word.toLowerCase()}`);
            if(el) el.className = "flex items-center gap-2 text-secondary line-through font-bold text-[10px]";
            if (currentWords.every(word => word.found)) { clearInterval(animalInterval); showGameMsg("SINCRONIZADO", "win"); setTimeout(startAnimalSearch, 2000); }
        }
    });
}
function solveAnimalSearch() {
    const w = currentWords.find(word => !word.found);
    if(w) w.indices.forEach(idx => {
        if(!selectedIndices.includes(idx)) {
            selectedIndices.push(idx);
            const c = document.getElementById(`animal-cell-${idx}`);
            if(c) c.classList.add('bg-primary/40');
        }
    });
    checkAnimalWords();
}

// --- LIBRO ---
let currentBookPage = 0;
const memoryPages = [
    { img: 'libro/memoria_06.jpeg', title: 'Amor a Distancia', text: 'Olaaaaaaaaaa djdjdjdjdkdkdkdkdkkdkskddk no pensé llegar hasta este punto MUEJEJEJEJE, pero mira hice este pequeña página para ti ,tal vez no es mucho pero quise que tuvieras esto,no me decidí bien que canción usar y por eso puse tres djdjdkdkdksksksksksksk,solo quiero que sepas que en verdad TEAMOOOOOOO mucho amor 😞,apresar lo que pase yo siempre te amare y no quiero soltar tu mano 😞,eres muy importante para mí y la verdad amo todo de ti 😞, nunca quiero irme de tu lado 😞' },
    { img: 'libro/memoria_07.jpeg', title: 'Superando Obstáculos', text: 'MUEJEJEJEJE tremenda foto,en fin sabes que logramos llegar a este punto no fue algo fácil, pasamos por momentos cruciales que nos hicieron ver porque nos amamos con todo el alma 😭, se que a veces sientes que lo te amo o cosas así pero te soy sincero, yo siento que suelo interrumpir tu día ya que casi siempre estás ocupada con la escuela o con cosas de tu familia y ajá ,has notado que tal vez ya no soy tan intenso como un principio y no es porque te deje de amar,si no porque he normalizado tu ausencia y ajá me adapte a tus días y prefiero no molestarte con mensajes que luego luego tal vez ni me respondes y por eso cambie un poco pero te sigo amando como el primer día 😞❤️‍🩹, perdón si te confundo :(' },
    { img: 'libro/memoria_08.jpeg', title: 'Un Futuro Juntos', text: 'Ya cumplimos muchos días juntos amor 😍, quien diría que íbamos a aguantar tanto tiempo a distancia 😭,la verdad ya muero por tenerte junto a mi y espero que lo antes posible estemos juntos amor, quiero tocar tu cachetote y besarte mucho ,y yo sé que en el fondo muy en el fondo tuyo también lo quieres pero muy en el fondo MUAJAJAJAJAJAJAJA, sabes que estoy muy enamorado de ti y la verdad también estoy muy orgulloso de lo que has logrado en toda tu vida 🥹 ❤️‍🩹,eres una niña especial que más amo y admiro, eres todo lo que un hombre puede desear tener como pareja,tal vez te sientas menos pero en realidad eres una grandiosa mujer 😭 ❤️‍🩹, estoy orgulloso de ti 🥹' },
    { img: 'libro/memoria_09.jpeg', title: 'Gachias por Todo', text: 'MUEJEJEJEJE aún sigues leyendo esto , a ver solo para ver qué si leas esto , dime qué es lo que mas amo de tu cuerpo? , para ver si lees esto djdjdkdkdksksksksksksk,en fin gachias por estar conmigo 😞 ❤️‍🩹,no soy la gran cosa pero me esfuerzo por estar a tu nivel (aunque se que tal vez en tus ojos soy malo y siempre me quieres dejar) , en fin eres mi todo amor ❤️‍🩹, solo quiero agradecerte por estos hermosos dos años juntos 😭, espero seguir adelante contigo, nunca soltar tus manos y sobre todo cumplir con lo que siempre nos prometimos en las llamadas nocturnas, muchas pero muchas gracias 🫂,y perdón por ser un tonto a veces contigo 😞,lo único de valor que tengo en mi vida eres tú ❤️‍🩹' },
    { isPenguin: true },
    { isFinal: true }
];

function toggleMemoryBook() {
    const el = document.getElementById('memory-book-overlay');
    if(!el) return;
    if (el.classList.contains('hidden')) { el.classList.remove('hidden'); renderBookPage(); setTimeout(() => el.classList.add('opacity-100'), 10); }
    else { el.classList.remove('opacity-100'); setTimeout(() => el.classList.add('hidden'), 500); }
}

function renderBookPage() {
    const v = document.getElementById('book-viewport'), p = memoryPages[currentBookPage];
    if(!v) return;
    if (p.isPenguin) {
        v.innerHTML = `<div class="w-full h-full flex flex-col items-center justify-center bg-[#1a1a2e]/90 rounded-[3rem] border-4 border-[#00fbfb] shadow-2xl p-10 text-center"><h2 class="text-[#00fbfb] font-pixel text-[12px] mb-8 tracking-widest uppercase">Lo que Admiro de Ti</h2><div onclick="talkPenguin()" class="cursor-pointer hover:scale-110 transition-transform text-8xl mb-8 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">🐧</div><p id="penguin-text" class="text-white text-xl leading-relaxed font-light text-center w-full">Haz clic en el pingüino...</p></div>`;
    } else if (p.isFinal) {
        v.innerHTML = `<div class="w-full h-full flex flex-col items-center justify-center bg-black/80 rounded-[3rem] border-4 border-primary p-12 shadow-2xl text-center"><h2 class="text-5xl text-primary font-serif italic mb-10 uppercase w-full text-center">Nuestro Segundo Aniversario</h2><p class="text-white/90 text-xl font-light leading-relaxed max-w-4xl italic">Muaaaaaaak muaaaaaaak muaaaaaaak ❤️‍🩹, gachias por estos dos años ❤️‍🩹, eres mi todo tode MUEJEJEJEJE 🥺, espero que nunca me cambies por alguien que si puedas ver y sobre todo que no me escondas más cosas 😞, espero que te haya gustado este pequeño regalo 🎁, me rompí la cabeza como dos veces pero ahí está MUAJAJAJAJAJAJAJA, tal vez ni te guste el regalo pero bueno, aún te amo mucho y nunca te dejare de amar pase lo que pase ❤️‍🩹, vamos por un año más ❤️‍🩹, gachias por ser mi mujer 🫦,en verdad eres muy hermosa mi Abi 🥺❤️‍🩹, gachias por aguantar esta distancia que a veces nos rompe 😞</p><div class="mt-12 text-primary font-pixel text-[8px] tracking-[0.5em]">FIN DEL CAPÍTULO DOS</div></div>`;
    } else {
        v.innerHTML = `<div class="w-full h-full flex flex-col md:flex-row items-center justify-center gap-10 bg-[#1a1a2e]/90 rounded-[3rem] border-2 border-white/10 p-10 shadow-2xl overflow-hidden"><div class="w-full md:w-1/2 h-full book-img-container"><img src="${p.url || p.img}" class="pixel-bg"></div><div class="w-full md:w-1/2 overflow-y-auto max-h-full"><h2 class="text-3xl text-primary font-headline font-bold mb-6 italic border-b border-primary/30 pb-2 uppercase text-center">${p.title}</h2><p class="text-white/80 text-lg font-light leading-relaxed pr-4 text-left">${p.text}</p></div></div>`;
    }
    const prev = document.getElementById('prev-page'), next = document.getElementById('next-page');
    if(prev) prev.disabled = currentBookPage === 0;
    if(next) next.disabled = currentBookPage === memoryPages.length - 1;
}

const prideReasons = [
    "De tu esfuerzo en todos tus días sin importar qué", "De tu valentía para hacer las cosas difíciles", "De tus metas y sueños en la vida", "De lo pura e inocente que eres", 
    "De lo religiosa que eres y que vayas a la iglesia", "De tu preocupación por mi bienestar", "De tu bondad infinita con la gente", "De que seas increíble en todo lo que haces", 
    "De lo responsable que eres con tus cosas", "De que seas chula de cuerpo y alma", "De que me hagas sentir orgulloso de tenerte", "De que nunca me sueltas la mano en momentos difíciles", 
    "De tu confianza en ti misma aunque a veces dudes", "De tu optimismo y humor único", "De tu humildad", "De tu capacidad de resolver problemas", 
    "De que no te rindes fácil ni conmigo ni con nada", "De lo fuerte que eres aunque no lo veas", "De que has cambiado para estar bien conmigo", "De la grandiosa mujer que eres"
];
function talkPenguin() { 
    const t = document.getElementById('penguin-text');
    if(t) gsap.to(t, { opacity: 0, duration: 1, onComplete: () => {
        t.innerText = prideReasons[Math.floor(Math.random()*prideReasons.length)];
        gsap.to(t, { opacity: 1, duration: 0.4 });
    }});
}
function nextPage() { if(currentBookPage < memoryPages.length-1) { currentBookPage++; renderBookPage(); } }
function prevPage() { if(currentBookPage > 0) { currentBookPage--; renderBookPage(); } }

const loveReasons = [
    "Porque te has vuelto parte fundamental de mi vida", "Tus cartas que me hacen llorar de emoción", "Tus regaños que me hacen saber que te importo", "Tu preocupación por mi bienestar", 
    "Tus fotos que me mandas", "Tu bondad con la gente", "Tu forma de decirme que me quieres", "La vibra que cargas y me transfieres", 
    "Nuestros momentos siendo nosotros mismos", "Tu estilo de vestimenta único", "Tu manera de ser la mejor mujer del mundo", "Nuestras platicas nocturnas habalndo de lo que sea"
    , "Lo dormilona que eres", "Tu hermosa voz que me cura el alma", "Tus besos a través de la pantalla", "Tu lealtad en nuestra relación", 
    "Tu sonrisa que me cautivó por completo", "Tus preciosas manos que espero tocar pronto", "Tus llamadas que son mi lugar seguro", "La tranquilidad que me da tu presencia", 
    "Tus cachetitos que quiero comer a besos", "Tu color canela tentación", "Tus inseguridades que yo amo con el alma"
];
function showRomanticMessage() {
    const container = document.getElementById('romantic-message-container');
    if(!container) return;
    const msg = loveReasons[Math.floor(Math.random()*loveReasons.length)];
    container.innerHTML = `<div class="bg-black/60 backdrop-blur-md px-10 py-4 rounded-full border border-tertiary/30 shadow-[0_0_30px_rgba(255,81,250,0.3)] animate-pulse inline-block"><p class="text-tertiary font-pixel text-xs tracking-widest uppercase text-center">RAZÓN POR AMARTE: ${msg}</p></div>`;
    setTimeout(() => { if(container.firstChild) gsap.to(container.firstChild, { opacity: 0, duration: 1, onComplete: () => container.innerHTML = '' })}, 3000);
}

function updateCountdown() {
    const diff = targetDate - new Date().getTime();
    const d = Math.max(0, Math.floor(diff/86400000)), h = Math.max(0, Math.floor((diff%86400000)/3600000)), m = Math.max(0, Math.floor((diff%3600000)/60000)), s = Math.max(0, Math.floor((diff%60000)/1000));
    
    const eD = document.getElementById('cd-days'), eH = document.getElementById('cd-hours'), eM = document.getElementById('cd-minutes'), eS = document.getElementById('cd-seconds');
    if(eD) eD.innerText = d.toString().padStart(2, '0');
    if(eH) eH.innerText = h.toString().padStart(2, '0');
    if(eM) eM.innerText = m.toString().padStart(2, '0');
    if(eS) eS.innerText = s.toString().padStart(2, '0');

    // Control del botón de entrada
    const startBtn = document.getElementById('start-btn');
    if (diff <= 0 && startBtn && startBtn.disabled) {
        startBtn.disabled = false;
        startBtn.innerText = "COMENZAR";
        startBtn.className = "px-12 py-4 bg-gradient-to-r from-primary to-primary-dim rounded-full text-white font-bold tracking-tight transition-all transform active:scale-95 text-lg min-w-[240px] z-50 uppercase shadow-[0_0_20px_rgba(202,152,255,0.3)]";
    }
}

// Acceso Secreto (Doble clic en ANIVERSARIO 2026)
document.addEventListener('DOMContentLoaded', () => {
    const secretTrigger = document.getElementById('secret-trigger');
    if(secretTrigger) {
        secretTrigger.addEventListener('dblclick', () => {
            const startBtn = document.getElementById('start-btn');
            if(startBtn) {
                startBtn.disabled = false;
                startBtn.innerText = "ACCESO ESPECIAL";
                startBtn.className = "px-12 py-4 bg-gradient-to-r from-secondary to-secondary/50 rounded-full text-white font-bold tracking-tight transition-all transform active:scale-95 text-lg min-w-[240px] z-50 uppercase shadow-[0_0_20px_rgba(0,251,251,0.3)] animate-pulse";
            }
        });
    }
});

setInterval(updateCountdown, 1000);
updateCountdown();
window.onload = () => { if(typeof renderPlaylist === 'function') renderPlaylist(); };
