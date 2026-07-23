const fs = require('fs');
const path = require('path');

const vocabDir = path.join(__dirname, '../src/data/vocab');
const levels = ['a1', 'a2', 'b1', 'b2', 'c1'];

levels.forEach(level => {
  const filePath = path.join(vocabDir, `${level}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const categories = new Set(data.map(item => item.category));
  console.log(`=== ${level.toUpperCase()} ===`);
  console.log(`Count: ${data.length}`);
  console.log(`Last item:`, data[data.length - 1]);
  console.log(`Categories:`, Array.from(categories));
  console.log();
});
