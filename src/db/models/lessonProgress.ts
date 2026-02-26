import { DataTypes, type Sequelize } from "sequelize";

export function defineLessonProgressModel(sequelize: Sequelize) {
  return sequelize.define("LessonProgress", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false, field: "user_id" },
    lessonId: { type: DataTypes.UUID, allowNull: false, field: "lesson_id" },
    completedAt: { type: DataTypes.DATE, allowNull: true, field: "completed_at" },
  }, { tableName: "lesson_progress", underscored: true, timestamps: true, indexes: [{ unique: true, fields: ["user_id", "lesson_id"] }] });
}
