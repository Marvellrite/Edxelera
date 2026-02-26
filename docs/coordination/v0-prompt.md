# v0 Builder Prompt (UI Only)

Build the UI layer only for the EdXelera repo using Next.js App Router + TypeScript + Tailwind.

## Hard Constraints
- You own only:
  - `src/app/**` (pages/layouts only, no backend logic in routes)
  - `src/components/**`
  - `src/features/**/ui/**`
  - `src/mocks/**`
  - `src/lib/ui/**`
- Do NOT create or modify:
  - `src/app/**/api/**/route.ts`
  - `src/auth/**`
  - `src/features/**/server/**`
  - `src/lib/server/**`
  - `src/db/**`, `sequelize/**`
  - payments/webhooks/AWS/Redis integrations
- Use shared contracts from `src/features/_shared/types.ts` only (import types; do not create divergent shapes).

## Brand Requirements
In `globals.css`, define exactly:
- `--black: #040506;`
- `--primary: rgb(0, 17, 70);`
- `--secondary: #ED1C24;`

You may use shades/gradients derived from these.
Create a strong, intentional, non-generic learning platform visual language.

## Logos / Branding Components
Create placeholders (inline SVG, no external assets):
- `src/components/branding/Logo.tsx`
- `src/components/branding/Wordmark.tsx`

Use brand colors and ensure they work on both light and dark sections.

## UI Scope (mock-data driven)
Build pages/components for:
- Marketing landing page
- Auth screens (login/register UI only)
- Student Program Home (`programSlug`)
- Week Hub (`programSlug`, `weekNumber`)
- Course progress page
- Certificates list page
- Instructor cohort and week views
- Admin overview pages (cohorts, payments)
- Reusable components for weekly cards, lesson items, progress, billing state, and discussion thread shell

## Data Handling
- Use `src/mocks/**` mock data and typed props matching `src/features/_shared/types.ts`.
- Do not hardcode backend logic beyond the interface names below:
  - `canEnroll`
  - `getBillingStatus`
  - `getStudentProgramHome`
  - `getWeekHub`
  - `getCourseProgress`
  - `getCertificates`
  - `getDiscussionThread`

## UX Rules to Reflect
- Cohort is the program container containing multiple courses
- Weekly unlock by calendar schedule
- Lesson unlock by prerequisites inside released weeks
- Enrollment cutoff + late-join messaging
- Weekly structure: prerecorded lessons, assignment, deadline, discussion, live session
- Role-aware navigation (Student / Instructor / Admin)

## Deliverables
- Polished UI pages and reusable components
- `globals.css` brand tokens (required exact values)
- Mock data and UI helpers only
- No backend/API implementation