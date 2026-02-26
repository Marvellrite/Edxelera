import { DataTypes, type Sequelize } from "sequelize";

export function defineLessonPrerequisiteModel(sequelize: Sequelize) {
  return sequelize.define("LessonPrerequisite", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    lessonId: { type: DataTypes.UUID, allowNull: false, field: "lesson_id" },
    prerequisiteLessonId: { type: DataTypes.UUID, allowNull: false, field: "prerequisite_lesson_id" },
  }, { tableName: "lesson_prerequisites", underscored: true, timestamps: true, indexes: [{ unique: true, fields: ["lesson_id", "prerequisite_lesson_id"] }] });
}
