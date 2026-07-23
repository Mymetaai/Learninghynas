const fs = require('fs');
const path = require('path');

const vocabDir = path.join(__dirname, '../src/data/vocab');
const levels = ['a1', 'a2', 'b1', 'b2', 'c1'];

let allItems = [];
let allIds = new Set();
let duplicateIds = [];

levels.forEach(level => {
  const filePath = path.join(vocabDir, `${level}.json`);
  const raw = fs.readFileSync(filePath, 'utf8');
  let data;
  try {
    data = JSON.parse(raw);
    console.log(`[VALID JSON] ${level.toUpperCase()}.json (${data.length} items)`);
  } catch (err) {
    console.error(`[INVALID JSON] ${level.toUpperCase()}.json:`, err);
    process.exit(1);
  }

  data.forEach(item => {
    if (allIds.has(item.id)) {
      duplicateIds.push(item.id);
    } else {
      allIds.add(item.id);
    }
    allItems.push(item);
  });
});

console.log(`\nTotal items across all files: ${allItems.length}`);
console.log(`Total unique IDs: ${allIds.size}`);
console.log(`Duplicate IDs count: ${duplicateIds.length}`);

// Test index.ts deduplication key logic
const uniqueMap = new Map();
allItems.forEach(item => {
  const key = `${item.level}_${item.category}_${item.es.toLowerCase().trim()}`;
  if (!uniqueMap.has(key)) {
    uniqueMap.set(key, item);
  }
});

console.log(`ALL_VOCAB_ITEMS count after index.ts merge & deduplication: ${uniqueMap.size}`);

if (duplicateIds.length === 0 && uniqueMap.size === allItems.length) {
  console.log('\n✅ VERIFICATION PASSED PERFECTLY! Zero duplicate IDs, zero duplicate keys, all valid JSON.');
} else {
  console.log('\n⚠️ Duplicates found, detailed check required.');
}
