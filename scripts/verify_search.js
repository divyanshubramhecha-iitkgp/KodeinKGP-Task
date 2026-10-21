const fs = require('fs');
const path = require('path');

const cmsData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'cms-data.json'), 'utf8'));

console.log('--- CMS DATA VERIFICATION ---');
console.log('Total CMS items:', cmsData.length);

// Verify presence of required fields
let validCount = 0;
cmsData.forEach((item, idx) => {
    if (item.title && Array.isArray(item.tags) && item.tags.length > 0 && item.category && item.imgSrc) {
        validCount++;
    } else {
        console.warn('Item at index ' + idx + ' is missing fields:', item);
    }
});
console.log(`Valid structured CMS items: ${validCount} / ${cmsData.length}`);

// Test search logic function identical to index.html
function searchCMS(activeCategory, activeQuery) {
    const q = activeQuery.toLowerCase().trim();
    const terms = q ? q.split(/\s+/).filter(Boolean) : [];

    let result = activeCategory === 'Featured'
        ? cmsData
        : cmsData.filter(p => p.category === activeCategory);

    if (terms.length > 0) {
        result = result.filter(photo => {
            const tags = Array.isArray(photo.tags) ? photo.tags.join(' ').toLowerCase() : '';
            const title = (photo.title || '').toLowerCase();
            const alt = (photo.alt || '').toLowerCase();
            const cat = (photo.category || '').toLowerCase();
            const author = ((photo.author && photo.author.name) || '').toLowerCase();
            const desc = (photo.description || '').toLowerCase();
            const combined = `${title} ${alt} ${cat} ${tags} ${author} ${desc}`;
            return terms.every(term => combined.includes(term));
        });
    }
    return result;
}

console.log('\n--- KEYWORD SEARCH VERIFICATION ---');
const testKeywords = [
    'mountain',
    'car',
    'tokyo',
    'sunset',
    'coffee',
    'neon',
    'cyberpunk',
    'minimalist',
    'ocean',
    'nature',
    'architecture',
    'dog',
    'vintage',
    'forest',
    'rain'
];

let allPassed = true;
testKeywords.forEach(kw => {
    const matches = searchCMS('Featured', kw);
    console.log(`Query: "${kw.padEnd(14)}" => ${matches.length.toString().padStart(2)} matches | Example: "${matches[0] ? matches[0].title : 'None'}"`);
    if (matches.length === 0) {
        allPassed = false;
    }
});

console.log('\n--- MULTI-TOKEN COMBINED SEARCH ---');
const multiTokenQueries = [
    'tokyo rain',
    'neon cyberpunk',
    'mountain lake',
    'minimalist gradient'
];

multiTokenQueries.forEach(mq => {
    const matches = searchCMS('Featured', mq);
    console.log(`Query: "${mq.padEnd(20)}" => ${matches.length} matches | Example: "${matches[0] ? matches[0].title : 'None'}"`);
    if (matches.length === 0) allPassed = false;
});

console.log('\n--- CATEGORY FILTERED SEARCH ---');
const catMatches = searchCMS('Wallpapers', 'mountain');
console.log(`Query: "mountain" in "Wallpapers" => ${catMatches.length} matches`);

console.log('\n--- VERIFICATION RESULT ---');
if (allPassed) {
    console.log('SUCCESS: All keyword and multi-term searches return accurate related images from the CMS!');
} else {
    console.log('FAILURE: Some queries did not return results.');
    process.exit(1);
}
