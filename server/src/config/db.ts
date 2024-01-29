import { Sequelize } from "sequelize";

interface DBConig {
  host: string;
  name: string;
  username: string;
  password: string;
  dialect: any;
}

const db_Config: DBConig = {
  host: process.env.DB_HOST || "",
  name: process.env.DB_NAME || "",
  username: process.env.DB_USERNAME || "",
  password: process.env.DB_PASSWORD || "",
  dialect: process.env.DB_DIALECT || "",
};

export const sequelize = new Sequelize({
  host: db_Config.host,
  database: db_Config.name,
  username: db_Config.username,
  password: db_Config.password,
  dialect: db_Config.dialect,
  logging: false,
});
