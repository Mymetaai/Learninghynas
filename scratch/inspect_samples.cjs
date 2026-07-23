const fs = require('fs');
const path = require('path');

const vocabDir = path.join(__dirname, '../src/data/vocab');
['a1', 'a2', 'b1', 'b2', 'c1'].forEach(lvl => {
  const data = JSON.parse(fs.readFileSync(path.join(vocabDir, `${lvl}.json`), 'utf8'));
  console.log(`=== ${lvl.toUpperCase()} Sample ===`);
  console.log('First 2 items:', data.slice(0, 2));
  console.log('Last 2 items:', data.slice(-2));
  console.log();
});
