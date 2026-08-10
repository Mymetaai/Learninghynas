const fs = require('fs');
const path = require('path');

const curriculumPath = path.join(__dirname, '../basic_espanol_complete_curriculum.md');
const content = fs.readFileSync(curriculumPath, 'utf8');

const headings = content.split('\n').filter(line => line.startsWith('#'));
console.log('Total headings count:', headings.length);
console.log('First 30 headings:');
console.log(headings.slice(0, 30).join('\n'));

console.log('\nSearch for "Lesson" or "Lección":');
const lessonLines = content.split('\n').filter(line => /Lesson|Lección/i.test(line));
console.log('Total lines containing Lesson/Lección:', lessonLines.length);
console.log('Sample lesson lines:');
console.log(lessonLines.slice(0, 40).join('\n'));
