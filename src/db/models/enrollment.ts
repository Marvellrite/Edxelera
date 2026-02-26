import { DataTypes, type Sequelize } from "sequelize";

export function defineEnrollmentModel(sequelize: Sequelize) {
  return sequelize.define("Enrollment", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false, field: "user_id" },
    cohortId: { type: DataTypes.UUID, allowNull: false, field: "cohort_id" },
    status: { type: DataTypes.STRING(32), allowNull: false, defaultValue: "active" },
    enrolledAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: "enrolled_at" },
  }, { tableName: "enrollments", underscored: true, timestamps: true, indexes: [{ unique: true, fields: ["user_id", "cohort_id"] }] });
}
