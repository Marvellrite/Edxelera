import { DataTypes, type Sequelize } from "sequelize";

export function defineLessonModel(sequelize: Sequelize) {
  return sequelize.define("Lesson", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    courseId: { type: DataTypes.UUID, allowNull: false, field: "course_id" },
    weekId: { type: DataTypes.UUID, allowNull: false, field: "week_id" },
    title: { type: DataTypes.STRING(255), allowNull: false },
    slug: { type: DataTypes.STRING(160), allowNull: false },
    position: { type: DataTypes.INTEGER, allowNull: false },
    s3Key: { type: DataTypes.STRING(512), allowNull: true, field: "s3_key" },
    posterKey: { type: DataTypes.STRING(512), allowNull: true, field: "poster_key" },
    durationSeconds: { type: DataTypes.INTEGER, allowNull: true, field: "duration_seconds" },
  }, { tableName: "lessons", underscored: true, timestamps: true, indexes: [{ unique: true, fields: ["course_id", "slug"] }] });
}
