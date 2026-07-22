Supabase Anonymous Sign-Ins is now enabled on the project. Please implement multi-user support properly using this, replacing the current single hardcoded 'default-user' approach:

Update the schema so user_id in user_stats, learned_vocabulary, and immersion_chat_messages is a uuid column referencing auth.users(id) (via references auth.users(id) on delete cascade), not a free-text default string.
Add a unique constraint on user_id in user_stats (one row per user).
Add a unique constraint on (user_id, word) in learned_vocabulary to prevent duplicate word entries.
Add indexes on user_id (all three tables) and session_key (immersion_chat_messages) for query performance.
Rewrite RLS policies to scope by auth.uid() instead of allowing open public/anon access. Since anonymous users authenticate with the authenticated role (not anon), policies must check identity, not just role:
sql
   CREATE POLICY "Users manage their own stats"
   ON user_stats FOR ALL
   USING (auth.uid() = user_id)
   WITH CHECK (auth.uid() = user_id);

Apply the equivalent pattern to learned_vocabulary and immersion_chat_messages, covering SELECT, INSERT, UPDATE, and DELETE.

Add anonymous sign-in on app load: on first launch, call supabase.auth.signInAnonymously() if there's no existing session, and rely on Supabase's session persistence (localStorage) so returning users keep the same identity across visits without re-prompting.
Replace all hardcoded 'default-user' references in supabaseClient.ts, trainingStore.ts, and activeImmersionStore.ts with the actual auth.uid() from the current session.
Test: confirm that after sign-in, a row is created in user_stats keyed to the real anonymous UID (not 'default-user'), and that querying as a different anonymous session cannot see the first session's data (verify RLS is actually isolating rows, not just present).

Confirm the schema and policy changes with me before applying them via execute_sql.
Preserve and extend offline fallback: the original plan requires that if Supabase is unreachable, the app falls back to localStorage so progress is never lost. With auth-based user_id now in place, extend this to also cover:
If signInAnonymously() fails or times out on app load (no network, Supabase down), don't block the app — continue in a local-only mode using localStorage, and retry sign-in in the background.
Once a session/connection is established, sync any locally-stored progress (stats, vocab, immersion messages) up to Supabase under the now-authenticated user_id, merging rather than overwriting if remote data already exists.
Make sure this local-first fallback still works per the original three tables (user_stats, learned_vocabulary, immersion_chat_messages), not just stats.
Update the verification plan to include: test with network disabled/Supabase URL unreachable — confirm the app still works fully offline (progress saved locally), then re-enable network and confirm local progress syncs up correctly to the authenticated user's rows without data loss or duplication.
Add an "Save my progress" / "Create account" option somewhere in the app (e.g. settings screen or a subtle banner) that lets a user convert their anonymous session into a permanent account without losing data:
Use Supabase's built-in identity linking: call supabase.auth.updateUser({ email, password }) (or the OAuth equivalent) on the existing anonymous session — this upgrades the same user in place, keeping the same auth.uid(), so all their existing rows in user_stats, learned_vocabulary, and immersion_chat_messages stay linked automatically. Do not create a new user and migrate data manually; linking preserves the UID.
Show a simple form: email + password (or a "Sign in with Google" button if you want that provider too).
After successful linking, confirm to the user that their progress is now saved to their account and won't be lost if they clear browser storage or switch devices.
Handle the edge case where the email is already registered to another account — show a clear error rather than a silent failure.
Returning-user check on app load: if a session already exists (anonymous or permanent), skip sign-in and just resume it. Only call signInAnonymously() when there is truly no session at all (first-ever visit).
