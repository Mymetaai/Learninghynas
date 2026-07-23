const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const files = [
  'SpanishPart2_NumbersQuestionsAndVerbsEstarAndIr_CourseWorkbook.txt',
  'SpanishPart3_DatesTimeAndVerbsTenerAndHacer_CourseWorkbook.txt',
  'SpanishPart4_IrregularVerbsAndThePresentProgressive_CourseWorkbook.txt',
  'SpanishPart5_AffirmativesNegativesAndObjectPronouns_CourseWorkbook.txt',
  'SpanishPart6_ReflexiveVerbsPastActionsAndCommands_CourseWorkbook.txt',
  'SpanishPart7_ComparisonsAndVerbsInThePreterite_CourseWorkbook.txt'
];

files.forEach(f => {
  const content = fs.readFileSync(path.join(rootDir, f), 'utf8');
  console.log(`=== ${f} (${content.length} chars) ===`);
  const lines = content.split('\n');
  const lessonHeaders = lines.filter(l => l.toUpperCase().includes('LESSON') || l.toUpperCase().includes('LECCIÓN'));
  console.log('Sample Lesson Headers:', lessonHeaders.slice(0, 10));
  console.log();
});
