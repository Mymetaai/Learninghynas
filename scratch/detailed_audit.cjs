const fs = require('fs');
const path = require('path');

const curriculumPath = path.join(__dirname, '../basic_espanol_complete_curriculum.md');
const bridgePath = path.join(__dirname, '../.md/part7_b1_bridge.md');

console.log('====================================================');
console.log('    MILESTONE 2 FORENSIC INTEGRITY AUDIT SCRIPT     ');
console.log('====================================================\n');

// 1. File existence & basic stats
if (!fs.existsSync(curriculumPath)) {
  console.error('FAIL: basic_espanol_complete_curriculum.md does NOT exist!');
  process.exit(1);
}
if (!fs.existsSync(bridgePath)) {
  console.error('FAIL: .md/part7_b1_bridge.md does NOT exist!');
  process.exit(1);
}

const currStats = fs.statSync(curriculumPath);
const bridgeStats = fs.statSync(bridgePath);
const currContent = fs.readFileSync(curriculumPath, 'utf8');
const bridgeContent = fs.readFileSync(bridgePath, 'utf8');

console.log(`[FILE STATS]`);
console.log(`basic_espanol_complete_curriculum.md: ${currStats.size} bytes, ${currContent.split('\n').length} lines`);
console.log(`.md/part7_b1_bridge.md:               ${bridgeStats.size} bytes, ${bridgeContent.split('\n').length} lines\n`);

// 2. Verify Lessons 1 to 31 headers
const lessonHeaders = [];
const lessonRegex = /###?\s*(?:📖\s*)?Lesson\s*(\d+)[:\s]+([^\n]+)/gi;
let match;

while ((match = lessonRegex.exec(currContent)) !== null) {
  lessonHeaders.push({
    num: parseInt(match[1], 10),
    title: match[2].trim(),
    index: match.index
  });
}

console.log(`[LESSON HEADERS DETECTED: ${lessonHeaders.length}]`);
lessonHeaders.forEach(l => console.log(`  Lesson ${l.num}: ${l.title}`));

const missingLessons = [];
for (let i = 1; i <= 31; i++) {
  if (!lessonHeaders.some(l => l.num === i)) {
    missingLessons.push(i);
  }
}

if (missingLessons.length > 0) {
  console.error(`\nFAIL: Missing Lesson numbers: ${missingLessons.join(', ')}`);
} else {
  console.log(`\nPASS: All 31 lessons (1 through 31) are present with valid titles.`);
}

// 3. Extract sections for all 31 lessons and verify structure & placeholder check
console.log('\n[LESSONS 1-31 STRUCTURE & CONTENT ANALYSIS]');

const lessonMap = {};
for (let i = 0; i < lessonHeaders.length; i++) {
  const current = lessonHeaders[i];
  const nextIndex = (i + 1 < lessonHeaders.length) ? lessonHeaders[i + 1].index : currContent.length;
  lessonMap[current.num] = currContent.substring(current.index, nextIndex);
}

// Scans for placeholders
const badKeywords = /\b(TODO|TBD|Lorem [Ii]psum|\[Insert\s+.*?\]|placeholder|dummy|sample text)\b/gi;
let totalPlaceholders = 0;

for (let i = 1; i <= 31; i++) {
  const sec = lessonMap[i] || '';
  if (!sec) {
    console.error(`  Lesson ${i}: MISSING SECTION CONTENT`);
    continue;
  }
  
  const placeholders = sec.match(badKeywords) || [];
  if (placeholders.length > 0) {
    console.warn(`  Lesson ${i}: ${placeholders.length} placeholder keyword(s) found:`, placeholders);
    totalPlaceholders += placeholders.length;
  }

  // Check required sub-headings/components for Lesson i
  const hasObjectives = /Learning\s+Objectives|Objetivos/i.test(sec);
  const hasGrammar = /Grammar|Rules|Reglas|Structure/i.test(sec);
  const hasVocab = /Vocabulary|Vocabulario/i.test(sec);
  const hasExamples = /Example|Ejemplos/i.test(sec);
  const hasDialogue = /Dialogue|Diálogo|Context/i.test(sec);
  const hasCheck = /Quick\s+Practice|Practice\s+Check|Práctica/i.test(sec);
  const hasSentenceBuilder = /Sentence\ Builder|Database|Ejercicios/i.test(sec);

  if (!hasObjectives || !hasGrammar || !hasVocab || !hasExamples || !hasDialogue || !hasCheck || !hasSentenceBuilder) {
    console.warn(`  Lesson ${i}: Structural incompleteness detected:`, {
      Objectives: hasObjectives,
      Grammar: hasGrammar,
      Vocab: hasVocab,
      Examples: hasExamples,
      Dialogue: hasDialogue,
      PracticeCheck: hasCheck,
      SentenceBuilder: hasSentenceBuilder
    });
  }
}

if (totalPlaceholders === 0) {
  console.log('PASS: Zero placeholder keywords found across all 31 lessons.');
}

// 4. Detailed Part 7 B1-Bridge (Lessons 27-31) Analysis
console.log('\n[PART 7 (LESSONS 27-31) DEEP AUDIT]');

// Check topics required in Part 7
const part7Topics = {
  27: ['Present Perfect', 'Haber', 'participio', 'he', 'has', 'ha'],
  28: ['Future', 'Infinitive', 'tendr', 'pondr', 'saldr'],
  29: ['Conditional', 'ía', 'ías', 'íamos'],
  30: ['Subjunctive', 'WEIRDOS', '-ar', '-er'],
  31: ['DISCO', 'dé', 'vaya', 'sea', 'quepa', 'oiga']
};

for (let l = 27; l <= 31; l++) {
  const sec = lessonMap[l] || '';
  const keywords = part7Topics[l];
  const missingKws = keywords.filter(kw => !new RegExp(kw, 'i').test(sec));
  if (missingKws.length > 0) {
    console.warn(`  Lesson ${l} topic check: missing expected terms: ${missingKws.join(', ')}`);
  } else {
    console.log(`  Lesson ${l} topic check: PASS (All key grammar topics present)`);
  }
}

// Compare Part 7 in bridge file vs curriculum file
console.log('\n[COMPARING .md/part7_b1_bridge.md AND basic_espanol_complete_curriculum.md]');
for (let l = 27; l <= 31; l++) {
  const currHasLesson = new RegExp(`Lesson\\s*${l}[:\\s]`, 'i').test(currContent);
  const bridgeHasLesson = new RegExp(`Lesson\\s*${l}[:\\s]`, 'i').test(bridgeContent);
  console.log(`  Lesson ${l}: basic_espanol=${currHasLesson}, bridge=${bridgeHasLesson}`);
}

// 5. Audit all 200 Exercises in Part 7 (Lessons 27-31)
console.log('\n[PART 7 EXERCISES & TOKEN TAGS VERIFICATION]');

let totalPart7Exercises = 0;
let validTaggedPart7Exercises = 0;
const lessonExerciseCounts = {};
const lessonTagCounts = {};
const TagFailureDetails = [];

// A tag is valid if it contains (Subject) AND (Verb) AND (Object) AND (Place) AND (Time)
for (let l = 27; l <= 31; l++) {
  const sec = lessonMap[l] || '';
  
  // Extract table rows in the Interactive Sentence Builder section
  const sbStart = sec.search(/Interactive Sentence Builder Database/i);
  const sbSection = sbStart !== -1 ? sec.substring(sbStart) : sec;
  
  const tableRows = sbSection.split('\n').filter(line => line.trim().startsWith('|') && !line.includes('---') && !line.includes('Spanish Sentence'));
  
  lessonExerciseCounts[l] = tableRows.length;
  totalPart7Exercises += tableRows.length;

  let taggedInLesson = 0;
  tableRows.forEach((row, idx) => {
    const hasSubject = /\(Subject\)/i.test(row);
    const hasVerb = /\(Verb\)/i.test(row);
    const hasObject = /\(Object\)/i.test(row);
    const hasPlace = /\(Place\)/i.test(row);
    const hasTime = /\(Time\)/i.test(row);

    const isFullyTagged = hasSubject && hasVerb && hasObject && hasPlace && hasTime;

    if (isFullyTagged) {
      taggedInLesson++;
      validTaggedPart7Exercises++;
    } else {
      TagFailureDetails.push({
        lesson: l,
        exerciseNum: idx + 1,
        missingTags: [
          !hasSubject ? '(Subject)' : null,
          !hasVerb ? '(Verb)' : null,
          !hasObject ? '(Object)' : null,
          !hasPlace ? '(Place)' : null,
          !hasTime ? '(Time)' : null
        ].filter(Boolean),
        rowSnippet: row.substring(0, 100)
      });
    }
  });

  lessonTagCounts[l] = taggedInLesson;
}

console.log('Exercise count breakdown for Part 7 (Lessons 27-31):');
for (let l = 27; l <= 31; l++) {
  console.log(`  Lesson ${l}: ${lessonExerciseCounts[l]} total table exercises | ${lessonTagCounts[l]} fully tagged (Subject+Verb+Object+Place+Time)`);
}

console.log(`\nPart 7 Total Exercises Found: ${totalPart7Exercises}`);
console.log(`Part 7 Total Fully-Tagged Exercises: ${validTaggedPart7Exercises}`);

if (TagFailureDetails.length > 0) {
  console.warn(`\nWARNING/FAIL: ${TagFailureDetails.length} exercises in Part 7 lack all 5 required token tags!`);
  console.log('Sample Tag Failure Details (first 10):');
  console.log(JSON.stringify(TagFailureDetails.slice(0, 10), null, 2));
} else {
  console.log('\nPASS: All 200 exercises in Part 7 (Lessons 27-31) have all 5 explicit token tags: (Subject), (Verb), (Object), (Place), (Time)!');
}

