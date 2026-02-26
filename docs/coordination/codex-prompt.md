# Codex Builder Prompt (Backend / Data / Integrations)

Build the backend/data/integration layer for EdXelera in the same repo using Next.js App Router + TypeScript + MySQL + Sequelize + Redis + AWS S3/CloudFront + Paystack.

## Hard Constraints
- You own only:
  - `sequelize/**` and/or `src/db/**` (models/migrations/seeders)
  - `src/auth/**`
  - `src/features/**/server/**`
  - `src/lib/server/**`
  - `src/app/**/api/**/route.ts`
  - Paystack integration + webhook
  - Redis integration
  - AWS S3/CloudFront signed video delivery
  - `.env.example`
- Do NOT modify UI-owned files:
  - `src/app/**` pages/layouts (except API routes)
  - `src/components/**`
  - `src/features/**/ui/**`
  - `src/mocks/**`
  - `src/lib/ui/**`

## Shared Contract Rules
- `src/features/_shared/types.ts` is the single shared types file.
- Add fields only in a backward-compatible manner.
- Do not rename/remove fields without adapters + changelog notes.

## Implement These Typed Server Interfaces + API Routes
### A) Enrollment + Paystack
- `canEnroll(programSlug)`
- `initPaystackPayment(programSlug)` => `{ authorization_url, reference }`
- `verifyPayment(reference)`
- `getBillingStatus(programSlug)`

### B) Student Program Home
- `getStudentProgramHome(programSlug)`

### C) Week Hub
- `getWeekHub(programSlug, weekNumber)`

### D) Progress
- `completeLesson({ courseSlug, lessonSlug })`
- `getCourseProgress(courseSlug)`

### E) Video Delivery (Protected)
- `getLessonPlaybackUrl(programSlug, courseSlug, lessonSlug)` => short-lived CloudFront signed URL
- Must enforce active enrollment + unlock checks

### F) Certificates
- `getCertificates()`
- `getCertificateDownloadUrl(certificateId)`

### G) Discussion
- `getDiscussionThread(programSlug, weekNumber)`
- `createPost`
- `replyToPost`
- `setPinnedPost` (instructor/admin only)

## Mandatory Business Rules
- Cohort = program container containing multiple courses
- Cohort has start/end + timezone
- Weeks unlock weekly by calendar schedule
- Lessons unlock by progress prerequisites inside released weeks
- Enrollment closes 48h before start
- Optional late-join window 7 days only
- Disallow enrollment after Week 2 unlocks
- Per-course certificate auto-issuance
- Program certificate after all courses completed
- Weekly structure supports prerecorded lessons, assignment, deadline, discussion, live session

## Infrastructure Requirements
- MySQL via Sequelize (models + migrations + seeders)
- Redis for caching/rate limiting/idempotency helpers where appropriate
- AWS S3 object metadata + CloudFront signed URLs for video/certificate delivery
- Paystack initialize/verify + webhook signature verification + idempotent processing
- `.env.example` with all required keys

## Implementation Priority Order
1. Update `src/features/_shared/types.ts` (additive only)
2. Create Sequelize models + migrations + seeders
3. Implement auth/session guards + role permissions
4. Implement server services in `src/features/**/server/**`
5. Wire API routes in `src/app/**/api/**/route.ts`
6. Add Redis caching for program home / week hub / billing status
7. Add tests or at least service-level validation paths if test setup exists

## Non-Goals
- UI styling/pages/components
- Mock-only logic in production server paths