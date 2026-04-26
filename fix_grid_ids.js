const fs = require('fs');

let html = fs.readFileSync('c:/28/index.html', 'utf8');

const searchContainerStart = html.indexOf('id="animal-search-container"');
const searchContainerEnd = html.indexOf('<!-- Help Mechanic / Hint Ant Right -->', searchContainerStart);

let containerHtml = html.substring(searchContainerStart, searchContainerEnd);

let cellCounter = 0;
containerHtml = containerHtml.replace(/<div class="pixel-grid-cell/g, (match) => {
    const replacement = '<div id="animal-cell-' + cellCounter + '" onclick="handleAnimalClick(' + cellCounter + ')" class="pixel-grid-cell';
    cellCounter++;
    return replacement;
});

console.log('Replaced ' + cellCounter + ' cells.');

html = html.substring(0, searchContainerStart) + containerHtml + html.substring(searchContainerEnd);
fs.writeFileSync('c:/28/index.html', html);
console.log('Fixed missing grid IDs and click events!');
