const fs = require('fs');
const path = require('path');

const c1Path = path.join(__dirname, '../src/data/vocab/c1.json');
const c1Data = JSON.parse(fs.readFileSync(c1Path, 'utf8'));

const categories = new Set(c1Data.map(i => i.category));
console.log(`=== C1 File Overview ===`);
console.log(`Total C1 items: ${c1Data.length}`);
console.log(`Categories in c1.json:`, Array.from(categories));
console.log(`First 3 items:`, c1Data.slice(0, 3));
console.log(`Last 3 items:`, c1Data.slice(-3));
