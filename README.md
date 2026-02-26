This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Backend setup (MySQL + Sequelize + Redis)

1. Copy envs:
   - `cp .env.example .env.local`
2. Install deps:
   - `pnpm install`
3. Run migrations:
   - `pnpm sequelize-cli db:migrate`
4. Run seeders:
   - `pnpm sequelize-cli db:seed:all`
5. Start app:
   - `pnpm dev`

### Paystack webhook local testing
- Forward `/api/paystack/webhook` using ngrok/cloudflared.
- Configure Paystack webhook URL to the tunnel URL.
- The webhook endpoint validates the `x-paystack-signature` hash with `PAYSTACK_WEBHOOK_SECRET`.

### CloudFront signed URLs
- Playback/certificate URLs are generated server-side.
- Set `CLOUDFRONT_DOMAIN`, `CLOUDFRONT_KEY_PAIR_ID`, and `CLOUDFRONT_PRIVATE_KEY_BASE64`.

## Admin/Instructor API coverage

### Contract naming note (program vs cohort)
- Database entities can continue to use internal cohort naming.
- External API contracts should consistently use `program`/`programSlug` naming.
- Use `toProgramDTO(cohortLike)` and `fromProgramSlug(programSlug)` adapters in `src/features/programs/server/program-contract.ts` to keep route contracts stable.

### Admin endpoints (admin role)
- `GET/POST /api/admin/programs`
- `GET/PATCH /api/admin/programs/:programSlug`
- `PATCH /api/admin/programs/:programSlug/pricing`
- `PATCH /api/admin/programs/:programSlug/enrollment-rules`
- `GET/POST /api/admin/content/courses`
- `PATCH/DELETE /api/admin/content/courses/:courseSlug`
- `GET /api/admin/content/modules`
- `PATCH /api/admin/content/modules/:weekId`
- `GET/POST /api/admin/content/lessons`
- `PATCH/DELETE /api/admin/content/lessons/:lessonSlug`
- `POST /api/admin/content/prerequisites`
- `GET /api/admin/users`
- `GET/PATCH /api/admin/users/:userId`
- `GET /api/admin/payments`
- `GET /api/admin/enrollments`
- `POST /api/admin/enrollments/:enrollmentId/revoke`

### Instructor endpoints (instructor role + program assignment)
- `GET /api/instructor/programs`
- `PATCH /api/instructor/programs/:programSlug/weeks/:weekNumber/pin`
- `PATCH /api/instructor/programs/:programSlug/weeks/:weekNumber/assignment`
- `PATCH /api/instructor/programs/:programSlug/weeks/:weekNumber/live-session`
- `PATCH /api/instructor/discussion/posts/:postId`

### Existing endpoints confirmed + wrappers
- Discussion: thread/read/create/reply/pin
- Certificates: list + signed download URL
- Playback: signed lesson playback URL
- Enrollment/paystack: eligibility + init + verify
- All wrappers are exported from `src/features/client/index.ts`.
