import { DataTypes, type Sequelize } from "sequelize";

export function defineCohortCourseModel(sequelize: Sequelize) {
  return sequelize.define("CohortCourse", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    cohortId: { type: DataTypes.UUID, allowNull: false, field: "cohort_id" },
    courseId: { type: DataTypes.UUID, allowNull: false, field: "course_id" },
    position: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  }, { tableName: "cohort_courses", underscored: true, timestamps: true, indexes: [{ unique: true, fields: ["cohort_id", "course_id"] }] });
}
