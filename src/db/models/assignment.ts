import type { Sequelize } from \"sequelize\";
import { definePlaceholderModel } from \"./_placeholder\";

export function defineAssignmentModel(sequelize: Sequelize) {
  // TODO: Replace placeholder schema with full Sequelize attributes/associations.
  return definePlaceholderModel(sequelize, \"Assignment\", \"assignments\");
}
