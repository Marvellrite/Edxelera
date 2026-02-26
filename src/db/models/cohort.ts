import { DataTypes, type Sequelize } from "sequelize";

export function defineCohortModel(sequelize: Sequelize) {
  return sequelize.define("Cohort", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING(255), allowNull: false },
    slug: { type: DataTypes.STRING(160), allowNull: false, unique: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    timezone: { type: DataTypes.STRING(64), allowNull: false, defaultValue: "UTC" },
    startDate: { type: DataTypes.DATE, allowNull: false, field: "start_date" },
    endDate: { type: DataTypes.DATE, allowNull: false, field: "end_date" },
    enrollmentCloseHours: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 48, field: "enrollment_close_hours" },
    lateJoinEnabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, field: "late_join_enabled" },
    lateJoinDays: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 7, field: "late_join_days" },
    amountMinor: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: "amount_minor" },
    currency: { type: DataTypes.STRING(8), allowNull: false, defaultValue: "NGN" },
  }, { tableName: "cohorts", underscored: true, timestamps: true });
}
