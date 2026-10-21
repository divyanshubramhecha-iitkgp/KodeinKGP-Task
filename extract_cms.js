const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// Extract the array literal text
const start = content.indexOf('const allPhotoData = [') + 'const allPhotoData = '.length;
const end = content.indexOf('];', start) + 1;
const arrayText = content.slice(start, end);

// Evaluate the array in a safe context
let allPhotoData;
try {
    allPhotoData = eval('(' + arrayText + ')');
} catch(e) {
    console.error('Eval error:', e.message);
    process.exit(1);
}

fs.writeFileSync('cms-data.json', JSON.stringify(allPhotoData, null, 2), 'utf8');
console.log('Done! Wrote', allPhotoData.length, 'photos to cms-data.json');
