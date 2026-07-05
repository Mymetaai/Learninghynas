# Handoff Report: MatchPairs Column Shuffling Fix Strategy

## 1. Observation
In `src/components/exercises/MatchPairs.tsx`, the left and right columns are prepared inside a `useMemo` block (lines 37-44) as follows:
```typescript
  // Split options into left and right columns
  const { leftItems, rightItems } = useMemo(() => {
    const leftSet = new Set(correctPairs.map((p) => p.left));
    const rightSet = new Set(correctPairs.map((p) => p.right));
    return {
      leftItems: options.filter((o) => leftSet.has(o)),
      rightItems: options.filter((o) => rightSet.has(o)),
    };
  }, [options, correctPairs]);
```
- No shuffling algorithm is applied to the columns; they remain in the exact order they are defined in `options` (which is typically sequential, making the matches trivial).
- The correctness check and matching states (lines 54-56, 59, 79-87) are based purely on unique word strings:
```typescript
    const isCorrect = correctPairs.some(
      (p) => p.left === selectedLeft && p.right === rightItem,
    );
```
- React keys for column buttons are also the word strings (`key={item}` at lines 104 and 129), not indices.
- In parent components (`src/components/exercises/ExerciseEngine.tsx` at line 185 and `src/screens/DailyQuestScreen.tsx` at line 465), `ExerciseCard` uses `key={currentKey}` or `key={renderKey}` which increments on slide changes or retry, forcing a clean unmount and remount.

## 2. Logic Chain
1. Since the buttons are mapped by their string values (`item`) and the match validation logic relies entirely on comparing string values (`selectedLeft` and `rightItem`) rather than their positions or indices in the array, we can safely shuffle the left and right columns without breaking the match logic.
2. To prevent the columns from reshuffling on every component state update (e.g. selection or mismatch triggers, which cause re-renders), the shuffle must be memoized.
3. Because the parent components remount `ExerciseCard` (and thus `MatchPairs`) on a retry/reset by changing their `key` prop, shuffling on mount handles the "retry" scenario.
4. However, to be robust against parent re-renders that might pass a new array reference of the same options without remounting, we serialize the `options` array via `options.join(',')` and use it as a dependency for the `useMemo` block, alongside the primitive `answer` string. This ensures that the shuffle occurs precisely once per unique exercise loading or retry/remount, and never on standard selection-triggered state updates.
5. Implementing a standard, pure Fisher-Yates shuffling helper function guarantees an unbiased, uniform distribution without side-effects (mutations) on the props.

## 3. Caveats
- This solution assumes that `options` consists of unique strings for both the left and right sides. If the exercise contains duplicate string options (e.g., matching the same word to two identical translations), selecting one will trigger matches for both. This is an inherent property of the current data model (which relies on `key={item}`) and is not introduced by shuffling.
- There are no unit/integration test suites (e.g., Vitest, Jest) configured in the project's `package.json` to verify runtime behavior programmatically. Verification must be performed via compiling the application and manually checking the screen.

## 4. Conclusion
We propose applying a stable, pure Fisher-Yates shuffle independently to `leftFiltered` and `rightFiltered` arrays inside the `useMemo` block of `MatchPairs.tsx`. This meets all requirements:
1. It shuffles the columns independently.
2. It executes on mount and retry (via key reset remounts).
3. It uses a stable, unbiased Fisher-Yates algorithm.
4. It operates entirely on unique word strings instead of indices, ensuring the existing matching logic remains completely correct.

The precise changes are detailed in the patch file `.agents/explorer_match_pairs/MatchPairs.patch`.

## 5. Verification Method
1. **Compilation/Lint Check**: Run `npm run lint` and `npm run build` in the workspace root to ensure no linting or type errors are introduced.
2. **Visual Inspection**:
   - Open a Match Pairs exercise (e.g., via the Daily Quest or Basic Español course screen).
   - Verify that the left and right columns are scrambled and do not line up in the same row.
   - Click a pair and verify that selecting the correct translations still matches successfully, and wrong choices trigger the shake animation.
   - Click the "Retry" button at the end of a session/exam (if applicable) and verify that the items reshuffle into a new random configuration.
