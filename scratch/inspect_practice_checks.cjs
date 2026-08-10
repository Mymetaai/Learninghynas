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

for (let l = 27; l <= 31; l++) {
  console.log(`================ Lesson ${l} Quick Practice Check ================`);
  const sec = lessonMap[l] || '';
  const matchP = sec.match(/####\s*⚡?\s*Quick Practice Check[\s\S]*?(?=####|###|$)/i);
  if (matchP) {
    console.log(matchP[0]);
  } else {
    console.log('NOT FOUND');
  }
}
