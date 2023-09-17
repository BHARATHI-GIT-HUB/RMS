import { Sequelize } from "sequelize";

import dotenv from "dotenv";
import path from "path";
dotenv.config();

export const sequelize = new Sequelize(
  "Report",
  process.env.DBUSER ? process.env.DBUSER : "root",
  process.env.PASSWORD ? process.env.PASSWORD : "root",
  {
    dialect: "mysql",
    //     storage: path.join(__dirname + "/db/db.sqlite"),
    //     logging: false,
  }
);
