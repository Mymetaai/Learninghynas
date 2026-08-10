const fs = require('fs');
const path = require('path');

const curriculumPath = path.join(__dirname, '../basic_espanol_complete_curriculum.md');
const bridgePath = path.join(__dirname, '../.md/part7_b1_bridge.md');

console.log('--- CURRICULUM AUDIT SCRIPT ---');

if (!fs.existsSync(curriculumPath)) {
  console.error('ERROR: basic_espanol_complete_curriculum.md does NOT exist!');
  process.exit(1);
}

const content = fs.readFileSync(curriculumPath, 'utf8');
const lines = content.split('\n');
console.log(`Curriculum file size: ${fs.statSync(curriculumPath).size} bytes`);
console.log(`Total lines in basic_espanol_complete_curriculum.md: ${lines.length}`);

// Check Lessons 1 to 31 header presence
const lessonHeaderRegex = /(?:###?|##)\s*(?:Lesson|Lección)\s*(\d+)/gi;
let match;
const foundLessons = new Set();
while ((match = lessonHeaderRegex.exec(content)) !== null) {
  foundLessons.add(parseInt(match[1], 10));
}

console.log(`Found lesson numbers matching regex:`, Array.from(foundLessons).sort((a, b) => a - b));

const missingLessons = [];
for (let i = 1; i <= 31; i++) {
  if (!foundLessons.has(i)) {
    missingLessons.push(i);
  }
}

if (missingLessons.length > 0) {
  console.log(`Missing lessons:`, missingLessons);
} else {
  console.log(`All lessons 1 to 31 are present by header match!`);
}

// Also check alternative heading formats if any
for (let i = 1; i <= 31; i++) {
  const hasNum = content.includes(`Lesson ${i}:`) || content.includes(`Lesson ${i} -`) || content.includes(`Lesson ${i}.`) || content.includes(`Lesson ${i}\n`) || content.includes(`Lesson ${i} `);
  if (!hasNum) {
    console.log(`Warning: Lesson ${i} keyword check failed`);
  }
}

// Check for placeholders in the entire file
const placeholderRegex = /TODO|TBD|Lorem [Ii]psum|\[Insert\s+.*?\]|placeholder/gi;
const placeholderMatches = [];
let pMatch;
while ((pMatch = placeholderRegex.exec(content)) !== null) {
  placeholderMatches.push({
    match: pMatch[0],
    index: pMatch.index,
    snippet: content.substring(Math.max(0, pMatch.index - 30), Math.min(content.length, pMatch.index + 40)).replace(/\n/g, ' ')
  });
}

console.log(`Placeholder scan found ${placeholderMatches.length} matches:`, placeholderMatches);

// Analyze Part 7 (Lessons 27 to 31)
console.log('\n--- PART 7 AUDIT (Lessons 27 - 31) ---');

// Extract lessons 27 to 31 sections
const lessonSections = {};
for (let i = 27; i <= 31; i++) {
  const startIdx = content.search(new RegExp(`(?:###?|##)\\s*Lesson\\s*${i}[:\\s]`, 'i'));
  const nextIdx = i < 31 
    ? content.search(new RegExp(`(?:###?|##)\\s*Lesson\\s*${i+1}[:\\s]`, 'i'))
    : content.length;
  
  if (startIdx !== -1) {
    lessonSections[i] = content.substring(startIdx, nextIdx !== -1 ? nextIdx : content.length);
  } else {
    lessonSections[i] = '';
  }
}

const requiredComponents = [
  'Subtitle',
  "Professor's Note",
  'Learning Objectives',
  'Grammar & Structural Rules',
  'Vocabulary Table',
  'Core Example Sentences',
  'Real Dialogue Context',
  'Quick Practice Check',
  'Interactive Sentence Builder Database'
];

for (let i = 27; i <= 31; i++) {
  console.log(`\nAnalyzing Lesson ${i}... (Length: ${lessonSections[i].length} chars)`);
  if (!lessonSections[i]) {
    console.error(`ERROR: Lesson ${i} section missing or empty!`);
    continue;
  }

  // Check component presence via key headings or keywords
  const checks = {
    'Subtitle / Title': /Lesson\s+\d+[:\s]+[^\n]+/i.test(lessonSections[i]),
    "Professor's Note": /Professor['’]?s\s+Note|👨‍🏫|💡\s*Note/i.test(lessonSections[i]),
    'Learning Objectives': /Learning\s+Objectives|Objetivos/i.test(lessonSections[i]),
    'Grammar & Structural Rules': /Grammar|Rules|Reglas|Structure/i.test(lessonSections[i]),
    'Vocabulary Table': /Vocabulary|Vocabulario|\|.*\|/i.test(lessonSections[i]),
    'Core Example Sentences': /Core\s+Example|Ejemplos/i.test(lessonSections[i]),
    'Real Dialogue Context': /Dialogue|Diálogo|Context/i.test(lessonSections[i]),
    'Quick Practice Check': /Quick\s+Practice\s+Check|Práctica|Check/i.test(lessonSections[i]),
    'Interactive Sentence Builder Database': /Sentence\ Bauilder|Sentence\ Builder|Database|Ejercicios/i.test(lessonSections[i])
  };

  for (const [name, pass] of Object.entries(checks)) {
    console.log(`  - ${name}: ${pass ? 'PASS' : 'FAIL'}`);
  }
}

// Now verify Part 7 exercises and token tags
console.log('\n--- VERIFYING EXERCISES & TOKEN TAGS ---');

// Count numbered exercises or exercise blocks in Part 7 (Lessons 27-31)
const part7Start = content.search(/(?:Part\s*7|Lesson\s*27)/i);
const part7Content = part7Start !== -1 ? content.substring(part7Start) : '';

console.log(`Part 7 total characters: ${part7Content.length}`);

// Find all exercises in Part 7
// Exercises typically look like: "1. ...", "2. ...", or "**Exercise 1**", etc., or lines with tags `(Subject) + (Verb)...`
const tagPattern = /\(Subject\)\s*\+\s*\(Verb\)\s*\+\s*\(Object\)\s*\+\s*\(Place\)\s*\+\s*\(Time\)/gi;
const allTagMatches = part7Content.match(tagPattern) || [];
console.log(`Total exact matches for '(Subject) + (Verb) + (Object) + (Place) + (Time)': ${allTagMatches.length}`);

// Let's analyze exercises per lesson (27 to 31)
for (let l = 27; l <= 31; l++) {
  const sec = lessonSections[l];
  const tagsInLesson = (sec.match(tagPattern) || []).length;
  console.log(`Lesson ${l} token tag count: ${tagsInLesson}`);
}

