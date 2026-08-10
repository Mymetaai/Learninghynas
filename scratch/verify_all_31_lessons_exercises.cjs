const fs = require('fs');
const path = require('path');

const curriculumPath = path.join(__dirname, '../basic_espanol_complete_curriculum.md');
const content = fs.readFileSync(curriculumPath, 'utf8');

const lessonHeaders = [];
const lessonRegex = /###?\s*(?:📖\s*)?Lesson\s*(\d+)[:\s]+([^\n]+)/gi;
let match;
while ((match = lessonRegex.exec(content)) !== null) {
  lessonHeaders.push({
    num: parseInt(match[1], 10),
    title: match[2].trim(),
    index: match.index
  });
}

const lessonMap = {};
for (let i = 0; i < lessonHeaders.length; i++) {
  const current = lessonHeaders[i];
  const nextIndex = (i + 1 < lessonHeaders.length) ? lessonHeaders[i + 1].index : content.length;
  lessonMap[current.num] = content.substring(current.index, nextIndex);
}

console.log('====================================================');
console.log('    EXERCISE COUNT & TAG AUDIT ACROSS ALL 31 LESSONS');
console.log('====================================================\n');

let totalAllExercises = 0;

for (let l = 1; l <= 31; l++) {
  const sec = lessonMap[l] || '';
  const sbSec = sec.match(/Interactive Sentence Builder Database[\s\S]*?(?=###?\s*(?:📖\s*)?Lesson|\#\s*📚|$)/i);
  let count = 0;
  let taggedCount = 0;
  if (sbSec) {
    const lines = sbSec[0].split('\n').filter(line => line.trim().startsWith('|') && !line.includes('---') && !line.includes('Spanish Sentence'));
    count = lines.length;
    lines.forEach(row => {
      if (/\(Subject\)/i.test(row) && /\(Verb\)/i.test(row) && /\(Object\)/i.test(row) && /\(Place\)/i.test(row) && /\(Time\)/i.test(row)) {
        taggedCount++;
      }
    });
  }
  totalAllExercises += count;
  console.log(`Lesson ${l.toString().padStart(2, ' ')}: ${count.toString().padStart(3, ' ')} exercises | ${taggedCount.toString().padStart(3, ' ')} fully tagged (Subject+Verb+Object+Place+Time)`);
}

console.log(`\nTotal Exercises Across All 31 Lessons: ${totalAllExercises}`);
