import { DataTypes, type Sequelize } from "sequelize";

export function defineCourseModel(sequelize: Sequelize) {
  return sequelize.define("Course", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING(255), allowNull: false },
    slug: { type: DataTypes.STRING(160), allowNull: false, unique: true },
    description: { type: DataTypes.TEXT, allowNull: true },
  }, { tableName: "courses", underscored: true, timestamps: true });
}
