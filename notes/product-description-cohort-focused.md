feat: add initial database migrations for enrollments, payments, progress, discussions, and certificates

feat: create placeholder models for assignments, certificates, cohorts, cohort courses, courses, course progress, discussion posts, discussion threads, enrollments, lessons, lesson prerequisites, lesson progress, live sessions, payment transactions, roles, users, user roles, video assets, and weeks

feat: implement seeders for roles and admin users

feat: define shared types for roles, enrollment statuses, payment statuses, and various API responses

feat: implement certificate download URL generation and issuance functions

feat: create discussion thread and post management functions

feat: implement enrollment billing status and eligibility checks

feat: add Paystack payment initialization and verification functions

feat: create student program home retrieval function

feat: implement course progress tracking and lesson completion functions

feat: add video playback URL signing functionality

feat: create week hub retrieval function

feat: implement utility functions for API responses, authorization checks, caching keys, CloudFront signing, and environment variable management

feat: initialize Redis and S3 clients