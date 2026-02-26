import { DataTypes, type Sequelize } from "sequelize";

export function defineWeekModel(sequelize: Sequelize) {
  return sequelize.define("Week", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    cohortId: { type: DataTypes.UUID, allowNull: false, field: "cohort_id" },
    weekNumber: { type: DataTypes.INTEGER, allowNull: false, field: "week_number" },
    title: { type: DataTypes.STRING(255), allowNull: false },
    opensAt: { type: DataTypes.DATE, allowNull: false, field: "opens_at" },
    dueAt: { type: DataTypes.DATE, allowNull: true, field: "due_at" },
    liveSessionAt: { type: DataTypes.DATE, allowNull: true, field: "live_session_at" },
  }, { tableName: "weeks", underscored: true, timestamps: true, indexes: [{ unique: true, fields: ["cohort_id", "week_number"] }] });
}
