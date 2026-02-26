import { DataTypes, type Sequelize } from "sequelize";

export function defineDiscussionThreadModel(sequelize: Sequelize) {
  return sequelize.define("DiscussionThread", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    cohortId: { type: DataTypes.UUID, allowNull: false, field: "cohort_id" },
    weekId: { type: DataTypes.UUID, allowNull: false, field: "week_id" },
    title: { type: DataTypes.STRING(255), allowNull: false },
    pinnedPostId: { type: DataTypes.UUID, allowNull: true, field: "pinned_post_id" },
  }, { tableName: "discussion_threads", underscored: true, timestamps: true, indexes: [{ unique: true, fields: ["week_id"] }] });
}
