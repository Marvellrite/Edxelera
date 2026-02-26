import type { Sequelize } from \"sequelize\";
import { definePlaceholderModel } from \"./_placeholder\";

export function defineCohortCourseModel(sequelize: Sequelize) {
  // TODO: Replace placeholder schema with full Sequelize attributes/associations.
  return definePlaceholderModel(sequelize, \"CohortCourse\", \"cohort_courses\");
}
