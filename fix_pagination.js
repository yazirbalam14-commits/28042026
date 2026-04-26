const fs = require('fs');
let js = fs.readFileSync('c:/28/script.js', 'utf8');

const paginationLogic = `
function nextBookPage() {
    if (currentBookPage < memoryPages.length - 1) {
        currentBookPage++;
        renderBookPage();
    }
}
function prevBookPage() {
    if (currentBookPage > 0) {
        currentBookPage--;
        renderBookPage();
    }
}
`;

if (!js.includes('function nextBookPage()')) {
    js += '\n' + paginationLogic;
    fs.writeFileSync('c:/28/script.js', js);
    console.log('Added pagination logic');
}
