# EdXelera Initial File Tree (Proposed)

```text
src/
  app/
    (marketing)/
      page.tsx                       # v0
      layout.tsx                     # v0
    (auth)/
      login/page.tsx                 # v0
      register/page.tsx              # v0
    student/
      programs/[programSlug]/page.tsx                     # v0
      programs/[programSlug]/weeks/[weekNumber]/page.tsx  # v0
      courses/[courseSlug]/page.tsx                       # v0
      certificates/page.tsx                               # v0
    instructor/
      cohorts/[programSlug]/page.tsx                      # v0
      weeks/[programSlug]/[weekNumber]/page.tsx           # v0
    admin/
      cohorts/page.tsx                 # v0
      payments/page.tsx                # v0
    api/
      auth/session/route.ts                                     # Codex
      enrollment/[programSlug]/can-enroll/route.ts              # Codex
      billing/[programSlug]/status/route.ts                     # Codex
      paystack/init/route.ts                                    # Codex
      paystack/verify/route.ts                                  # Codex
      paystack/webhook/route.ts                                 # Codex
      programs/[programSlug]/home/route.ts                      # Codex
      programs/[programSlug]/weeks/[weekNumber]/route.ts        # Codex
      progress/course/[courseSlug]/route.ts                     # Codex
      progress/lesson/complete/route.ts                         # Codex
      video/[programSlug]/[courseSlug]/[lessonSlug]/playback-url/route.ts  # Codex
      certificates/route.ts                                     # Codex
      certificates/[certificateId]/download-url/route.ts        # Codex
      discussion/[programSlug]/weeks/[weekNumber]/route.ts      # Codex
      discussion/posts/route.ts                                 # Codex
      discussion/posts/[postId]/reply/route.ts                  # Codex
      discussion/posts/[postId]/pin/route.ts                    # Codex
  auth/
    session.ts                         # Codex
    guards.ts                          # Codex
    permissions.ts                     # Codex
    password.ts                        # Codex
  components/
    branding/
      Logo.tsx                         # v0
      Wordmark.tsx                     # v0
    layout/
      AppShell.tsx                     # v0
      Sidebar.tsx                      # v0
      TopNav.tsx                       # v0
    ui/
      ...                              # v0
  db/                                  # Codex
    models/
      index.ts
      user.ts
      role.ts
      userRole.ts
      cohort.ts
      course.ts
      cohortCourse.ts
      week.ts
      lesson.ts
      lessonPrerequisite.ts
      assignment.ts
      enrollment.ts
      paymentTransaction.ts
      courseProgress.ts
      lessonProgress.ts
      discussionThread.ts
      discussionPost.ts
      certificate.ts
      videoAsset.ts
    migrations/
      20260226-0001-create-users.js
      ...
    seeders/
      20260226-1001-seed-roles.js
      20260226-1002-seed-admin.js
  features/
    _shared/
      types.ts                         # shared contract (single source)
    enrollment/
      server/
        can-enroll.ts                  # Codex
        billing-status.ts              # Codex
        paystack.ts                    # Codex
      ui/
        EnrollmentCard.tsx             # v0
    program-home/
      server/
        get-student-program-home.ts    # Codex
      ui/
        ProgramHomeView.tsx            # v0
    week-hub/
      server/
        get-week-hub.ts                # Codex
      ui/
        WeekHubView.tsx                # v0
    progress/
      server/
        complete-lesson.ts             # Codex
        get-course-progress.ts         # Codex
      ui/
        ProgressBar.tsx                # v0
    video/
      server/
        get-lesson-playback-url.ts     # Codex
        signing.ts                     # Codex
    certificates/
      server/
        get-certificates.ts            # Codex
        get-certificate-download-url.ts # Codex
        issuance.ts                    # Codex
      ui/
        CertificatesList.tsx           # v0
    discussion/
      server/
        get-thread.ts                  # Codex
        create-post.ts                 # Codex
        reply-to-post.ts               # Codex
        set-pinned-post.ts             # Codex
      ui/
        DiscussionThread.tsx           # v0
  lib/
    server/
      db.ts                            # Codex
      redis.ts                         # Codex
      env.ts                           # Codex
      s3.ts                            # Codex
      cloudfront.ts                    # Codex
      paystack.ts                      # Codex
      authz.ts                         # Codex
      time.ts                          # Codex
      cache-keys.ts                    # Codex
      api-response.ts                  # Codex
    ui/
      format.ts                        # v0
      theme.ts                         # v0
  mocks/
    program-home.ts                    # v0
    week-hub.ts                        # v0
  styles/
    globals.css                        # v0 (must include brand variables)
sequelize/
  config/
    config.cjs                         # Codex (optional if using sequelize-cli root)
```

Notes:
- This is a starting structure and can be trimmed or expanded, but ownership boundaries should remain unchanged.
- `src/app/**/api/**/route.ts` is reserved for backend/API implementation (Codex-owned).