import type { Sequelize } from "sequelize";
import { defineAssignmentModel } from "./assignment";
import { defineCertificateModel } from "./certificate";
import { defineCohortModel } from "./cohort";
import { defineCohortCourseModel } from "./cohortCourse";
import { defineCourseModel } from "./course";
import { defineCourseProgressModel } from "./courseProgress";
import { defineDiscussionPostModel } from "./discussionPost";
import { defineDiscussionThreadModel } from "./discussionThread";
import { defineEnrollmentModel } from "./enrollment";
import { defineLessonModel } from "./lesson";
import { defineLessonPrerequisiteModel } from "./lessonPrerequisite";
import { defineLessonProgressModel } from "./lessonProgress";
import { defineLiveSessionModel } from "./liveSession";
import { definePaymentTransactionModel } from "./paymentTransaction";
import { defineRoleModel } from "./role";
import { defineUserModel } from "./user";
import { defineUserRoleModel } from "./userRole";
import { defineVideoAssetModel } from "./videoAsset";
import { defineWeekModel } from "./week";

export function initModels(sequelize: Sequelize) {
  const models = {
    User: defineUserModel(sequelize),
    Role: defineRoleModel(sequelize),
    UserRole: defineUserRoleModel(sequelize),
    Cohort: defineCohortModel(sequelize),
    Course: defineCourseModel(sequelize),
    CohortCourse: defineCohortCourseModel(sequelize),
    Week: defineWeekModel(sequelize),
    Lesson: defineLessonModel(sequelize),
    LessonPrerequisite: defineLessonPrerequisiteModel(sequelize),
    Assignment: defineAssignmentModel(sequelize),
    LiveSession: defineLiveSessionModel(sequelize),
    Enrollment: defineEnrollmentModel(sequelize),
    PaymentTransaction: definePaymentTransactionModel(sequelize),
    CourseProgress: defineCourseProgressModel(sequelize),
    LessonProgress: defineLessonProgressModel(sequelize),
    DiscussionThread: defineDiscussionThreadModel(sequelize),
    DiscussionPost: defineDiscussionPostModel(sequelize),
    Certificate: defineCertificateModel(sequelize),
    VideoAsset: defineVideoAssetModel(sequelize),
  };

  // TODO: Define associations after replacing placeholders with real schemas.
  return models;
}
