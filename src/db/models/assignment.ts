import { DataTypes, type Sequelize } from "sequelize";

export function defineAssignmentModel(sequelize: Sequelize) {
  return sequelize.define("Assignment", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    weekId: { type: DataTypes.UUID, allowNull: false, field: "week_id" },
    title: { type: DataTypes.STRING(255), allowNull: false },
    instructions: { type: DataTypes.TEXT, allowNull: true },
    dueAt: { type: DataTypes.DATE, allowNull: true, field: "due_at" },
  }, { tableName: "assignments", underscored: true, timestamps: true });
}
