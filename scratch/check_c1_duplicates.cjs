const fs = require('fs');
const path = require('path');

const c1Path = path.join(__dirname, '../src/data/vocab/c1.json');
const c1Data = JSON.parse(fs.readFileSync(c1Path, 'utf8'));

const existingTerms = new Map();
c1Data.forEach(item => {
  existingTerms.set(item.es.toLowerCase().trim(), item);
});

const termsToCheck = [
  'actualmente', 'realizar', 'pretender', 'constipado', 'desgracia',
  'costar un ojo de la cara', 'meter la pata', 'no tener pelos en la lengua', 'estar en las nubes', 'dar la lata',
  'poner de manifiesto', 'hacer hincapié', 'llevar a cabo', 'a tenor de lo dispuesto',
  'ahora bien', 'sin embargo', 'no obstante', 'por consiguiente', 'de ahí que',
  'corroborar', 'refutar', 'la hipótesis', 'el paradigma', 'la discrepancia',
  'el ordenador', 'la computadora', 'el coche', 'el carro', 'coger', 'tomar',
  'a condición de que', 'salvo que', 'por mucho que'
];

console.log('=== Checking Planned Terms in Existing c1.json ===');
termsToCheck.forEach(term => {
  if (existingTerms.has(term.toLowerCase().trim())) {
    const match = existingTerms.get(term.toLowerCase().trim());
    console.log(`[EXISTS] "${term}" in category "${match.category}" (id: ${match.id})`);
  } else {
    console.log(`[GENUINELY NEW] "${term}"`);
  }
});
