import { DataTypes, type Sequelize } from "sequelize";

export function defineDiscussionPostModel(sequelize: Sequelize) {
  return sequelize.define("DiscussionPost", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    threadId: { type: DataTypes.UUID, allowNull: false, field: "thread_id" },
    authorUserId: { type: DataTypes.UUID, allowNull: false, field: "author_user_id" },
    title: { type: DataTypes.STRING(255), allowNull: true },
    body: { type: DataTypes.TEXT, allowNull: false },
    parentPostId: { type: DataTypes.UUID, allowNull: true, field: "parent_post_id" },
    isPinned: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, field: "is_pinned" },
    status: { type: DataTypes.STRING(16), allowNull: false, defaultValue: "visible" },
  }, { tableName: "discussion_posts", underscored: true, timestamps: true });
}
