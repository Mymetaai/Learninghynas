const fs = require('fs');

const txtFiles = [
  'SpanishPart2_NumbersQuestionsAndVerbsEstarAndIr_CourseWorkbook.txt',
  'SpanishPart3_DatesTimeAndVerbsTenerAndHacer_CourseWorkbook.txt',
  'SpanishPart4_IrregularVerbsAndThePresentProgressive_CourseWorkbook.txt',
  'SpanishPart5_AffirmativesNegativesAndObjectPronouns_CourseWorkbook.txt',
  'SpanishPart6_ReflexiveVerbsPastActionsAndCommands_CourseWorkbook.txt',
  'SpanishPart7_ComparisonsAndVerbsInThePreterite_CourseWorkbook.txt'
];

txtFiles.forEach(file => {
  console.log(`\n===================================`);
  console.log(`FILE: ${file}`);
  const text = fs.readFileSync(file, 'utf-8');
  const lines = text.split('\n');
  const lessonLines = lines.filter(l => /Lesson \d+/i.test(l) || /LECTURA/i.test(l) || /VOCABULARIO/i.test(l));
  console.log(lessonLines.slice(0, 30).join('\n'));
});
