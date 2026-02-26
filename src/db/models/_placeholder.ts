import { DataTypes, type Sequelize } from "sequelize";

export function definePlaceholderModel(sequelize: Sequelize, modelName: string, tableName: string) {
  return sequelize.define(
    modelName,
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
    },
    {
      tableName,
      timestamps: true,
      underscored: true,
    },
  );
}
