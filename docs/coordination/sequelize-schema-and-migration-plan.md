# Sequelize Schema Outline and Migration Plan

## Core Models

### User
- `id`
- `email` (unique)
- `passwordHash`
- `fullName`
- `status`
- timestamps

### Role
- `id`
- `name` (`student`, `instructor`, `admin`) unique

### UserRole
- `userId`
- `roleId`
- unique composite: (`userId`, `roleId`)

### Cohort (Program Container)
- `id`
- `slug` (unique)
- `title`
- `description`
- `startAtUtc`
- `endAtUtc`
- `timezone` (IANA)
- `lateJoinEnabled` (bool)
- `lateJoinDays` (default `7`)
- `enrollmentCloseHoursBeforeStart` (default `48`)
- `published`
- timestamps

### Course
- `id`
- `slug` (unique)
- `title`
- `description`
- `certificateTemplateKey` (nullable)
- timestamps

### CohortCourse
- `cohortId`
- `courseId`
- `sortOrder`
- unique (`cohortId`, `courseId`)
- unique (`cohortId`, `sortOrder`)

### Week
- `id`
- `cohortId`
- `weekNumber`
- `title`
- `releaseAtUtc`
- `assignmentDeadlineUtc`
- `liveSessionTitle`
- `liveSessionStartUtc`
- `liveSessionEndUtc`
- `liveSessionUrl` (nullable)
- unique (`cohortId`, `weekNumber`)

### Assignment
- `id`
- `weekId` (unique)
- `title`
- `instructions`
- `submissionType`
- `maxScore` (nullable)

### VideoAsset
- `id`
- `provider` (`s3`)
- `s3Bucket`
- `s3Key`
- `cloudFrontPath`
- `mimeType`
- `status`

### Lesson
- `id`
- `courseId`
- `weekId`
- `slug`
- `title`
- `description`
- `sortOrder`
- `isPreview`
- `videoAssetId` (nullable)
- `durationSeconds`
- unique (`courseId`, `slug`)
- unique (`weekId`, `sortOrder`)

### LessonPrerequisite
- `lessonId`
- `prerequisiteLessonId`
- unique (`lessonId`, `prerequisiteLessonId`)

### Enrollment
- `id`
- `userId`
- `cohortId`
- `status` (`pending_payment`, `active`, `canceled`, `refunded`)
- `enrolledAtUtc`
- `paymentReference` (nullable)
- `source`
- unique (`userId`, `cohortId`)
- indexes: (`cohortId`, `status`)

### PaymentTransaction
- `id`
- `userId`
- `cohortId`
- `provider` (`paystack`)
- `reference` (unique)
- `amountMinor`
- `currency`
- `status`
- `channel` (nullable)
- `providerPayload` (JSON)
- `verifiedAtUtc` (nullable)
- `paidAtUtc` (nullable)
- indexes: (`cohortId`, `status`), (`userId`, `createdAt`)

### LessonProgress
- `id`
- `userId`
- `lessonId`
- `completedAtUtc`
- unique (`userId`, `lessonId`)

### CourseProgress
- `id`
- `userId`
- `courseId`
- `completedLessons`
- `totalLessons`
- `percentComplete`
- `completedAtUtc` (nullable)
- unique (`userId`, `courseId`)

### DiscussionThread
- `id`
- `cohortId`
- `weekNumber`
- `title`
- `createdByUserId`
- unique (`cohortId`, `weekNumber`)

### DiscussionPost
- `id`
- `threadId`
- `authorUserId`
- `parentPostId` (nullable)
- `body`
- `isPinned`
- `pinnedByUserId` (nullable)
- `pinnedAtUtc` (nullable)
- timestamps
- indexes: (`threadId`, `createdAt`), (`parentPostId`), (`threadId`, `isPinned`)

### Certificate
- `id`
- `userId`
- `cohortId` (nullable for course certs if course-only context, but usually retained)
- `courseId` (nullable for program cert)
- `type` (`course`, `program`)
- `status` (`issued`, `revoked`)
- `certificateNumber` (unique)
- `issuedAtUtc`
- `fileBucket`
- `fileKey`
- `cloudFrontPath`
- logical uniqueness via service + indexes (per user/course/program)

## Migration Plan (Recommended Order)
1. `roles`, `users`, `user_roles`
2. `cohorts`, `courses`, `cohort_courses`
3. `weeks`, `assignments`, `video_assets`, `lessons`, `lesson_prerequisites`
4. `enrollments`, `payment_transactions`
5. `lesson_progress`, `course_progress`
6. `discussion_threads`, `discussion_posts`
7. `certificates`
8. Add/adjust secondary indexes and constraints
9. Seeders: roles, optional admin user, optional sample dev dataset

## Business Rules Enforced in Services (not DB-only)
- Enrollment window checks (`48h pre-start close`, `7-day late join`, `Week 2 cutoff`)
- Week release schedule by cohort calendar + timezone
- Lesson prerequisite unlock logic inside released weeks
- Idempotent Paystack verification + webhook reconciliation
- Auto-issue course/program certificates on completion transitions
- Protected video URL issuance requires active enrollment + unlock eligibility