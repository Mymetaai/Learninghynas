const fs = require('fs');
const path = require('path');

const vocabDir = path.join(__dirname, '../src/data/vocab');
['a1', 'a2', 'b1', 'b2', 'c1'].forEach(lvl => {
  const data = JSON.parse(fs.readFileSync(path.join(vocabDir, `${lvl}.json`), 'utf8'));
  const ids = data.map(item => item.id);
  console.log(`=== ${lvl.toUpperCase()} IDs ===`);
  console.log('Total entries:', ids.length);
  console.log('First 5 IDs:', ids.slice(0, 5));
  console.log('Last 5 IDs:', ids.slice(-5));
  console.log();
});
