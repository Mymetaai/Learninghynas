const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// Read all 6 files
const partFiles = {
  part2: 'SpanishPart2_NumbersQuestionsAndVerbsEstarAndIr_CourseWorkbook.txt',
  part3: 'SpanishPart3_DatesTimeAndVerbsTenerAndHacer_CourseWorkbook.txt',
  part4: 'SpanishPart4_IrregularVerbsAndThePresentProgressive_CourseWorkbook.txt',
  part5: 'SpanishPart5_AffirmativesNegativesAndObjectPronouns_CourseWorkbook.txt',
  part6: 'SpanishPart6_ReflexiveVerbsPastActionsAndCommands_CourseWorkbook.txt',
  part7: 'SpanishPart7_ComparisonsAndVerbsInThePreterite_CourseWorkbook.txt'
};

Object.entries(partFiles).forEach(([part, filename]) => {
  const content = fs.readFileSync(path.join(rootDir, filename), 'utf8');
  console.log(`=== ${part.toUpperCase()} Summary ===`);
  const lines = content.split('\n');
  console.log(`Total lines: ${lines.length}`);
});
