import { DataTypes, type Sequelize } from "sequelize";

export function defineLiveSessionModel(sequelize: Sequelize) {
  return sequelize.define("LiveSession", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    weekId: { type: DataTypes.UUID, allowNull: false, field: "week_id" },
    title: { type: DataTypes.STRING(255), allowNull: false },
    joinUrl: { type: DataTypes.STRING(1024), allowNull: true, field: "join_url" },
    startAt: { type: DataTypes.DATE, allowNull: true, field: "start_at" },
    endAt: { type: DataTypes.DATE, allowNull: true, field: "end_at" },
  }, { tableName: "live_sessions", underscored: true, timestamps: true });
}
