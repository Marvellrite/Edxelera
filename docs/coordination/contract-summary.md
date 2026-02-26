# EdXelera AI Builder Contract Summary

EdXelera is a cohort-based learning platform with three roles: `Student`, `Instructor`, and `Admin`.
A `Cohort` is the top-level program container and contains multiple courses. Each cohort includes `startAt`, `endAt`, and an IANA `timezone` used for release schedules, deadlines, and enrollment windows.

## Core Platform Rules
- Weeks unlock by calendar schedule (weekly cadence from cohort schedule).
- Lessons unlock by progress prerequisites, but only inside already released weeks.
- Weekly structure includes: prerecorded lessons, assignment, deadline, discussion thread, and live session.
- Certificates:
  - Per-course certificate auto-issued when a course is completed.
  - Program certificate issued after all courses in the cohort are completed.

## Enrollment Rules
- Enrollment closes 48 hours before cohort start.
- Optional late-join window: up to 7 days after cohort start.
- Enrollment is always disallowed after Week 2 unlocks.
- `canEnroll(programSlug)` is the source of truth for UI and payment gating.

## Integration Interfaces (typed contracts)
### A) Enrollment + Paystack
- `canEnroll(programSlug)`
- `initPaystackPayment(programSlug)` -> `{ authorization_url, reference }`
- `verifyPayment(reference)`
- `getBillingStatus(programSlug)`

### B) Student Program Home
- `getStudentProgramHome(programSlug)`

### C) Week Hub
- `getWeekHub(programSlug, weekNumber)`

### D) Progress
- `completeLesson({ courseSlug, lessonSlug })`
- `getCourseProgress(courseSlug)`

### E) Video Delivery (protected)
- `getLessonPlaybackUrl(programSlug, courseSlug, lessonSlug)`
- Returns short-lived signed URL (CloudFront), requires enrollment + unlock.

### F) Certificates
- `getCertificates()`
- `getCertificateDownloadUrl(certificateId)`

### G) Discussion
- `getDiscussionThread(programSlug, weekNumber)`
- `createPost`
- `replyToPost`
- `setPinnedPost`

## Ownership Split
### v0 owns (UI only)
- `src/app/**` (pages/layouts only)
- `src/components/**`
- `src/features/**/ui/**`
- `src/mocks/**`
- `src/lib/ui/**`

### Codex owns (backend/data/integrations)
- Sequelize models/migrations/seeders (`src/db/**` or `sequelize/**`)
- `src/auth/**`
- `src/features/**/server/**`
- `src/lib/server/**`
- `src/app/**/api/**/route.ts`
- Paystack integration + webhook
- Redis integration
- AWS S3 + CloudFront signed video delivery
- `.env.example`

## Shared Types Contract
- `src/features/_shared/types.ts` is the single shared types contract file.
- Changes must be backward-compatible (additive by default).
- No rename/remove without adapters + changelog notes.

## Branding Requirements
`globals.css` must define:
- `--black: #040506;`
- `--primary: rgb(0, 17, 70);`
- `--secondary: #ED1C24;`