import { DataTypes, type Sequelize } from "sequelize";

export function defineUserModel(sequelize: Sequelize) {
  return sequelize.define("User", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    fullName: { type: DataTypes.STRING(255), allowNull: false, field: "full_name" },
    passwordHash: { type: DataTypes.STRING(255), allowNull: false, field: "password_hash" },
    twoFaEnabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, field: "two_fa_enabled" },
    twoFaSecret: { type: DataTypes.STRING(255), allowNull: true, field: "two_fa_secret" },
    recoveryCodesJson: { type: DataTypes.TEXT, allowNull: true, field: "recovery_codes_json" },
  }, { tableName: "users", underscored: true, timestamps: true });
}
