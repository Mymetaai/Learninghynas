// STEP 3 acceptance-check script (not shipped to the app).
// Runs the two Step 3 acceptance criteria as assertions:
//   1. The type system supports all six levels without modification.
//   2. Pre-A1 vocabulary collectively covers EVERY Pre-A1 topic cluster.
import {
  ALL_WORLDS,
  LEVEL_ORDER,
  PRE_A1_TOPICS,
  TOPIC_LABELS,
  allVocabulary,
  missingPreA1Topics,
  topicsCoveredIn,
} from '../src/content';

let failed = false;
const assert = (cond: boolean, msg: string) => {
  if (!cond) {
    failed = true;
    console.error('❌ FAIL:', msg);
  } else {
    console.log('✅ PASS:', msg);
  }
};

// 1. All six levels present in the curriculum's worlds.
console.log('\n=== Step 3 Acceptance Check ===\n');
const presentLevels = ALL_WORLDS.map((w) => w.level);
LEVEL_ORDER.forEach((lvl) =>
  assert(presentLevels.includes(lvl), `Level ${lvl} supported by the type system`),
);

// 2. Every Pre-A1 topic cluster is covered by authored vocabulary.
const covered = topicsCoveredIn('Pre-A1');
const missing = missingPreA1Topics();
PRE_A1_TOPICS.forEach((t) =>
  assert(
    covered.includes(t),
    `Pre-A1 topic "${TOPIC_LABELS[t]}" is covered by vocabulary`,
  ),
);

// Bonus diagnostics.
console.log('\n--- Diagnostics ---');
console.log(`Worlds defined: ${ALL_WORLDS.length} (${presentLevels.join(', ')})`);
console.log(`Pre-A1 quests: ${ALL_WORLDS[0].quests.length}`);
console.log(`Total authored vocabulary words: ${allVocabulary().length}`);
console.log(`Pre-A1 vocabulary words: ${
  ALL_WORLDS[0].quests.flatMap((q) => q.vocabulary).length
}`);
console.log(`Pre-A1 topics covered: ${covered.length}/${PRE_A1_TOPICS.length}`);
if (missing.length) console.log(`MISSING topics: ${missing.join(', ')}`);

console.log('\n=== Result: ' + (failed ? 'FAILED' : 'ALL PASSED') + ' ===\n');
if (failed) process.exit(1);
