import { DataTypes, type Sequelize } from "sequelize";

export function defineUserRoleModel(sequelize: Sequelize) {
  return sequelize.define("UserRole", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false, field: "user_id" },
    roleId: { type: DataTypes.UUID, allowNull: false, field: "role_id" },
  }, { tableName: "user_roles", underscored: true, timestamps: true, indexes: [{ unique: true, fields: ["user_id", "role_id"] }] });
}
