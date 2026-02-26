import { DataTypes, type Sequelize } from "sequelize";

export function defineVideoAssetModel(sequelize: Sequelize) {
  return sequelize.define("VideoAsset", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    lessonId: { type: DataTypes.UUID, allowNull: false, field: "lesson_id" },
    s3Key: { type: DataTypes.STRING(512), allowNull: false, field: "s3_key" },
    posterKey: { type: DataTypes.STRING(512), allowNull: true, field: "poster_key" },
    durationSeconds: { type: DataTypes.INTEGER, allowNull: true, field: "duration_seconds" },
  }, { tableName: "video_assets", underscored: true, timestamps: true });
}
