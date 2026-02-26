import { DataTypes, type Sequelize } from "sequelize";

export function definePaymentTransactionModel(sequelize: Sequelize) {
  return sequelize.define("PaymentTransaction", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false, field: "user_id" },
    cohortId: { type: DataTypes.UUID, allowNull: false, field: "cohort_id" },
    provider: { type: DataTypes.STRING(32), allowNull: false, defaultValue: "paystack" },
    reference: { type: DataTypes.STRING(128), allowNull: false, unique: true },
    status: { type: DataTypes.STRING(32), allowNull: false, defaultValue: "pending" },
    amountMinor: { type: DataTypes.INTEGER, allowNull: false, field: "amount_minor" },
    currency: { type: DataTypes.STRING(8), allowNull: false, defaultValue: "NGN" },
    metadataJson: { type: DataTypes.TEXT, allowNull: true, field: "metadata_json" },
  }, { tableName: "payment_transactions", underscored: true, timestamps: true });
}
