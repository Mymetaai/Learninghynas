const fs = require('fs');
const path = require('path');

const vocabDir = path.join(__dirname, '../src/data/vocab');
const levels = ['a1', 'a2', 'b1', 'b2', 'c1'];

const MAPPINGS = {
  'Nouns': 'Sustantivos',
  'Verbs': 'Verbos',
  'Adjectives': 'Adjetivos',
  'Adverbs': 'Adverbios',
  'Prepositions': 'Preposiciones',
  'Pronouns': 'Pronombres',
  'Connectors': 'Conectores'
};

const normalizedStats = {};

levels.forEach(level => {
  const filePath = path.join(vocabDir, `${level}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let changedCount = 0;

  data.forEach(item => {
    if (MAPPINGS[item.category]) {
      item.category = MAPPINGS[item.category];
      changedCount++;
    }
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  normalizedStats[level] = changedCount;
});

console.log('Normalization complete! Changed entries per level:');
console.log(normalizedStats);
