const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', '.md', 'part7_b1_bridge.md');
if (!fs.existsSync(filePath)) {
  console.log("File does not exist at:", filePath);
  process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf8');

console.log("File size:", content.length, "bytes");

// Check lessons present
const lessons = [27, 28, 29, 30, 31];
const requiredSections = [
  "Subtitle",
  "Professor's Note",
  "Learning Objectives",
  "Grammar & Structural Rules",
  "Vocabulary Table",
  "Core Example Sentences",
  "Real Dialogue Context",
  "Quick Practice Check",
  "Interactive Sentence Builder Database"
];

for (const l of lessons) {
  const lessonRegex = new RegExp(`### 📖 Lesson ${l}:`, 'i');
  if (!lessonRegex.test(content)) {
    console.error(`MISSING Lesson ${l}`);
  } else {
    console.log(`FOUND Lesson ${l}`);
  }
}

// Extract all exercise rows
const lines = content.split('\n');
let currentLesson = 0;
const lessonExerciseCounts = { 27: 0, 28: 0, 29: 0, 30: 0, 31: 0 };
const untaggedExercises = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const lessonMatch = line.match(/### 📖 Lesson (\d+):/);
  if (lessonMatch) {
    currentLesson = parseInt(lessonMatch[1], 10);
  }

  // Check table row in exercise database
  // Format: | # | Spanish Sentence | English Translation | Token Breakdown | Notes |
  if (line.startsWith('|') && currentLesson >= 27 && currentLesson <= 31) {
    const parts = line.split('|').map(p => p.trim());
    // Row should have 5 columns: empty, #, Spanish, English, Token Breakdown, Notes, empty
    if (parts.length >= 6 && /^\d+$/.test(parts[1])) {
      lessonExerciseCounts[currentLesson]++;
      const tokenBreakdown = parts[4];
      const exNum = parts[1];
      
      // Check required tags: (Subject) + (Verb) + (Object) + (Place) + (Time)
      const hasSubject = tokenBreakdown.includes('(Subject)');
      const hasVerb = tokenBreakdown.includes('(Verb)');
      const hasObject = tokenBreakdown.includes('(Object)');
      const hasPlace = tokenBreakdown.includes('(Place)');
      const hasTime = tokenBreakdown.includes('(Time)');
      
      if (!hasSubject || !hasVerb || !hasObject || !hasPlace || !hasTime) {
        untaggedExercises.push({
          lesson: currentLesson,
          exNum,
          lineNum: i + 1,
          tokenBreakdown,
          missing: {
            Subject: !hasSubject,
            Verb: !hasVerb,
            Object: !hasObject,
            Place: !hasPlace,
            Time: !hasTime
          }
        });
      }
    }
  }
}

console.log("Exercise Counts per Lesson:", lessonExerciseCounts);
console.log("Total Untagged / Incompletely Tagged Exercises:", untaggedExercises.length);
if (untaggedExercises.length > 0) {
  console.log("First 10 missing tag examples:", JSON.stringify(untaggedExercises.slice(0, 10), null, 2));
}
