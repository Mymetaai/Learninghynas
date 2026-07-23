const fs = require('fs');
const path = require('path');

const vocabDir = path.join(__dirname, '../src/data/vocab');
const levels = ['a1', 'a2', 'b1', 'b2', 'c1'];

levels.forEach(level => {
  const filePath = path.join(vocabDir, `${level}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const categoryCounts = {};
  data.forEach(item => {
    categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
  });
  console.log(`=== ${level.toUpperCase()} Category Breakdown ===`);
  console.table(categoryCounts);
});
