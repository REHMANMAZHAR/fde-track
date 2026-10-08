# FDE Academy

A private Forward Deployed Engineer training course for RMK — six stages, embedded video lessons, quizzes and progress tracking. Built in the same stack as the Talha study LMS so it deploys the same way.

## What it is
- **Stages 0–2** fully built, lesson-by-lesson (Learn → Watch → Try → Check).
- **Stages 3–5** outlined with anchor courses, expanded as you reach them.
- Lesson videos are embedded (Programming with Mosh), each starting at the exact chapter.
- Progress and quiz results save in the browser. Cross-device sync (Cloudflare D1) is the next milestone.

## Stack
Next.js 16 · React 19 · vinext · Cloudflare Workers · Tailwind v4 — identical to the Talha LMS.

## Local setup
Requires Node.js 22+.
1. `npm install`
2. `npm run dev` — open the local URL it prints.

## Deploy to Cloudflare (same as your LMS)
1. `npm install`
2. `npm run deploy` — builds and runs `wrangler deploy`. Sign in if prompted (`npx wrangler login`).
3. Or connect this repo to **Cloudflare Workers Builds** to deploy on push to `main`, exactly like the LMS.

The app is currently static (no database), so no D1 or secrets are needed yet.

## Roadmap
- [x] Scaffold + design system + content (Stages 0–2) + UI
- [ ] Cloudflare D1 sync + family sign-in (cross-device progress)
- [ ] Expand Stages 3–5 into daily lessons
