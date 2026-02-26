import { DataTypes, type Sequelize } from "sequelize";

export function defineCourseProgressModel(sequelize: Sequelize) {
  return sequelize.define("CourseProgress", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false, field: "user_id" },
    courseId: { type: DataTypes.UUID, allowNull: false, field: "course_id" },
    percentComplete: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: "percent_complete" },
    completedAt: { type: DataTypes.DATE, allowNull: true, field: "completed_at" },
  }, { tableName: "course_progress", underscored: true, timestamps: true, indexes: [{ unique: true, fields: ["user_id", "course_id"] }] });
}
