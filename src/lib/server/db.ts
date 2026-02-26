import { Sequelize } from "sequelize";
import { initModels } from "@/db/models";

let sequelize: Sequelize | null = null;
let models: ReturnType<typeof initModels> | null = null;

export async function getSequelize() {
  if (!sequelize) {
    sequelize = new Sequelize(process.env.MYSQL_DATABASE ?? "edxelera", process.env.MYSQL_USER ?? "root", process.env.MYSQL_PASSWORD ?? "", {
      host: process.env.MYSQL_HOST ?? "127.0.0.1",
      port: Number(process.env.MYSQL_PORT ?? 3306),
      dialect: "mysql",
      logging: false,
    });
    models = initModels(sequelize);
  }
  return sequelize;
}

export async function getModels() {
  await getSequelize();
  return models!;
}
