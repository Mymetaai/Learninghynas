# Connect Yuki to the Gemini API — Antigravity Prompt

## Why the current bot repeats itself (context, not part of the prompt)

If Yuki currently gives the same canned reply regardless of what's asked,
it's almost certainly matching keywords to fixed responses rather than
generating anything. Connecting a real LLM fixes this — but only if
conversation history and live app context are actually sent with every
request. Skipping that step is the most common way this kind of
integration still ends up feeling repetitive even after "adding AI."

---

## The prompt

```
Connect Yuki (the chatbot) to the real Gemini API so responses are
generated dynamically instead of using fixed/canned replies. Follow this
exact architecture — do not put the API key in any client-side code.

## 1. Backend proxy (required, not optional)

Create a serverless function (e.g. /api/chat on Vercel) that:
- Reads the GEMINI_API_KEY from an environment variable, never from
  client code or any file that ships to the browser.
- Accepts a POST request from the frontend containing: the user's new
  message, the recent conversation history, and the user's current app
  state (see section 3).
- Calls the Gemini API server-side, using model "gemini-3.5-flash"
  (current cost-effective model, good enough for conversational replies —
  don't reach for a larger/pricier model for this use case).
- Returns Yuki's reply to the frontend.

Endpoint: https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent
Auth header: x-goog-api-key: $GEMINI_API_KEY

## 2. System instruction (Yuki's persona)

Use the full contents of yuki-system-prompt.md as the `systemInstruction`
field on every request. Do not paraphrase or shorten it — the voice rules
and guardrails in that file are load-bearing, not decoration.

## 3. Context that must be sent on EVERY request, not just the first

Gemini's API is stateless — nothing is remembered between calls unless we
send it. Every request must include:

a) Full conversation history for this session, formatted as the `contents`
   array with alternating "user" and "model" roles — not just the latest
   message. Without this, Yuki will forget what was just said and can
   feel repetitive even with a real model behind it.

b) Relevant slices of yuki-chatbot-knowledge-base.json — specifically the
   course/economy/faq sections — included as context so Yuki answers
   accurately about the app itself, not just generically about Spanish.

c) The user's live state: current level/region, tails collected, coin
   balance, current streak. Pull this from whatever store/state
   management the app already uses — do not hardcode placeholder values.
   This is what makes replies feel personalized rather than generic (e.g.
   Yuki should be able to say "you're 2 tails away from mastering Bosque
   de Verbos" using the user's actual real progress, not a guess).

Example request shape:

{
  "systemInstruction": { "parts": [{ "text": "<full yuki-system-prompt.md content>" }] },
  "contents": [
    { "role": "user", "parts": [{ "text": "<earlier user message>" }] },
    { "role": "model", "parts": [{ "text": "<earlier Yuki reply>" }] },
    { "role": "user", "parts": [{ "text": "<current user message, plus a compact JSON block of current app state and relevant knowledge-base context>" }] }
  ]
}

## 4. Error handling

If the Gemini API call fails or times out, do not show a raw error to the
user. Show a fallback message in Yuki's own voice, e.g. "Hmm, my fox
senses are a little foggy right now — try asking again in a moment." Log
the actual error server-side for debugging, but never surface it raw in
the chat UI.

## 5. What NOT to change

- Yuki's visual/3D appearance and the chat UI layout — this task is about
  the backend response logic only.
- Do not remove the existing knowledge base JSON structure — extend how
  it's used, don't restructure the file itself as part of this task.

Verify when done: ask Yuki the same question three times in different
ways within one session, and confirm each reply is different and
contextually appropriate — not the same template restated.
```
