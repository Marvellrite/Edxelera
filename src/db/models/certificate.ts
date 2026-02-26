import { DataTypes, type Sequelize } from "sequelize";

export function defineCertificateModel(sequelize: Sequelize) {
  return sequelize.define("Certificate", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false, field: "user_id" },
    cohortId: { type: DataTypes.UUID, allowNull: true, field: "cohort_id" },
    courseId: { type: DataTypes.UUID, allowNull: true, field: "course_id" },
    type: { type: DataTypes.STRING(16), allowNull: false },
    title: { type: DataTypes.STRING(255), allowNull: false },
    status: { type: DataTypes.STRING(16), allowNull: false, defaultValue: "issued" },
    url: { type: DataTypes.STRING(1024), allowNull: true },
    issuedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: "issued_at" },
  }, { tableName: "certificates", underscored: true, timestamps: true });
}
