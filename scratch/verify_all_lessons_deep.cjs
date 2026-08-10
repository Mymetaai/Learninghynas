const fs = require('fs');
const path = require('path');

const curriculumPath = path.join(__dirname, '../basic_espanol_complete_curriculum.md');
const bridgePath = path.join(__dirname, '../.md/part7_b1_bridge.md');

const currContent = fs.readFileSync(curriculumPath, 'utf8');
const bridgeContent = fs.readFileSync(bridgePath, 'utf8');

console.log('====================================================');
console.log('       DEEP LESSON & PART 7 VERIFICATION            ');
console.log('====================================================\n');

// 1. Compare Part 7 in bridge file vs curriculum file
const bridgeClean = bridgeContent.trim().replace(/\r\n/g, '\n');
const currPart7Start = currContent.search(/(?:###?\s*(?:📖\s*)?)?Lesson 27/i);
const currPart7Content = currContent.substring(currPart7Start).trim().replace(/\r\n/g, '\n');

// Check if bridge content is identical or closely matches Part 7 in basic_espanol
console.log('[BRIDGE FILE VS CURRICULUM FILE MATCH]');
console.log(`Bridge content length: ${bridgeClean.length} chars`);
console.log(`Curriculum Part 7 length: ${currPart7Content.length} chars`);
console.log(`Includes bridge text: ${currContent.includes(bridgeClean.substring(0, 500)) ? 'YES' : 'NO'}`);

// 2. Verify Part 7 Lessons (27 to 31) component details
console.log('\n[PART 7 (LESSONS 27-31) COMPONENT DETAILS]');

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

const lessonMap = {};
for (let i = 0; i < lessonHeaders.length; i++) {
  const current = lessonHeaders[i];
  const nextIndex = (i + 1 < lessonHeaders.length) ? lessonHeaders[i + 1].index : currContent.length;
  lessonMap[current.num] = currContent.substring(current.index, nextIndex);
}

for (let l = 27; l <= 31; l++) {
  console.log(`\n--- Lesson ${l} ---`);
  const sec = lessonMap[l] || '';
  
  // Check Subtitle
  const subtitleMatch = sec.match(/Lesson\s+\d+[:\s]+([^\n]+)/i);
  console.log(`  Subtitle: ${subtitleMatch ? subtitleMatch[1].trim() : 'NONE'}`);

  // Check Professor's Note
  const hasProfNote = /Professor['’]?s\s+Note|👨‍🏫/i.test(sec);
  console.log(`  Professor's Note: ${hasProfNote ? 'PASS' : 'FAIL'}`);

  // Check Learning Objectives
  const objectivesMatch = sec.match(/Learning Objectives[\s\S]*?(?=####|###|$)/i);
  console.log(`  Learning Objectives: ${objectivesMatch ? 'PASS' : 'FAIL'}`);

  // Check Grammar & Structural Rules
  const grammarMatch = sec.match(/Grammar & Structural Rules[\s\S]*?(?=####|###|$)/i);
  console.log(`  Grammar & Structural Rules: ${grammarMatch ? 'PASS' : 'FAIL'}`);

  // Check Vocabulary Table count & phonetics
  const vocabSec = sec.match(/Vocabulary Table[\s\S]*?(?=####|###|$)/i);
  let vocabCount = 0;
  let hasPhonetics = false;
  if (vocabSec) {
    const vocabLines = vocabSec[0].split('\n').filter(line => line.trim().startsWith('|') && !line.includes('---') && !line.includes('Spanish Term'));
    vocabCount = vocabLines.length;
    hasPhonetics = /`[^`]+`/i.test(vocabSec[0]); // phonetics in backticks
  }
  console.log(`  Vocabulary Table: ${vocabCount} terms found (Requires 8+), Phonetics present: ${hasPhonetics}`);

  // Check Core Example Sentences
  const hasExamples = /Core Example Sentences/i.test(sec);
  console.log(`  Core Example Sentences: ${hasExamples ? 'PASS' : 'FAIL'}`);

  // Check Real Dialogue Context
  const hasDialogue = /Real Dialogue Context/i.test(sec);
  console.log(`  Real Dialogue Context: ${hasDialogue ? 'PASS' : 'FAIL'}`);

  // Check Quick Practice Check
  const practiceSec = sec.match(/Quick Practice Check[\s\S]*?(?=####|###|$)/i);
  let hasQ = false, hasOpts = false, hasExp = false;
  if (practiceSec) {
    const pText = practiceSec[0];
    hasQ = /\*\*Question\*\*/i.test(pText) || /\d+\.\s+\*\*/i.test(pText);
    hasOpts = /\[\s*[xX\s]\s*\]|[A-Da-d]\)/i.test(pText);
    hasExp = /Explanation|Explicación/i.test(pText);
  }
  console.log(`  Quick Practice Check: Question=${hasQ}, Options=${hasOpts}, Explanation=${hasExp}`);

  // Check Sentence Builder exercise count
  const sbSec = sec.match(/Interactive Sentence Builder Database[\s\S]*/i);
  let sbCount = 0;
  if (sbSec) {
    const sbLines = sbSec[0].split('\n').filter(line => line.trim().startsWith('|') && !line.includes('---') && !line.includes('Spanish Sentence'));
    sbCount = sbLines.length;
  }
  console.log(`  Sentence Builder Exercises: ${sbCount} (Requires 40)`);
}

// 3. Uniqueness check across all 200 exercises in Part 7
console.log('\n[EXERCISE UNIQUENESS & DUP CHECK IN PART 7]');
const spanishSentences = [];
for (let l = 27; l <= 31; l++) {
  const sec = lessonMap[l] || '';
  const sbSec = sec.match(/Interactive Sentence Builder Database[\s\S]*/i);
  if (sbSec) {
    const sbLines = sbSec[0].split('\n').filter(line => line.trim().startsWith('|') && !line.includes('---') && !line.includes('Spanish Sentence'));
    sbLines.forEach((row, idx) => {
      const parts = row.split('|').map(p => p.trim());
      // parts[0] is empty, parts[1] is #, parts[2] is Spanish Sentence
      const spanish = parts[2] ? parts[2].replace(/\*\*/g, '').trim() : '';
      if (spanish) {
        spanishSentences.push({ lesson: l, num: idx + 1, text: spanish });
      }
    });
  }
}

console.log(`Total extracted Spanish sentences in Part 7: ${spanishSentences.length}`);

const seen = new Set();
const dups = [];
spanishSentences.forEach(s => {
  if (seen.has(s.text.toLowerCase())) {
    dups.push(s);
  } else {
    seen.add(s.text.toLowerCase());
  }
});

if (dups.length > 0) {
  console.warn(`Duplicate sentences found in Part 7: ${dups.length}`, dups);
} else {
  console.log(`PASS: All ${spanishSentences.length} sentences in Part 7 are 100% unique! No duplicate sentences found.`);
}

// 4. Sample exercises inspect
console.log('\n[SAMPLE EXERCISES FROM LESSON 27, 28, 29, 30, 31]');
for (let l = 27; l <= 31; l++) {
  const s = spanishSentences.find(x => x.lesson === l);
  if (s) {
    console.log(`Lesson ${l} Ex 1: "${s.text}"`);
  }
}

