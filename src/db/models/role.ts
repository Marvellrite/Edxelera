import { DataTypes, type Sequelize } from "sequelize";

export function defineRoleModel(sequelize: Sequelize) {
  return sequelize.define("Role", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING(32), allowNull: false, unique: true },
  }, { tableName: "roles", underscored: true, timestamps: true });
}
