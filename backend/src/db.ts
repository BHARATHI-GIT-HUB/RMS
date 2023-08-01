// import { Sequelize } from "sequelize";

// // import dotenv from "dotenv";
// // import path from "path";
// // dotenv.config();

// const sequelize = new Sequelize("Report", "root", "local@123", {
//   host: "localhost",
//   dialect: "mysql",
// });

// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Database connection has been established successfully.");
//     // Return success response here if needed
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//     // Return error response here if needed
//   }
// })();

// module.exports = sequelize;

import { Sequelize } from "sequelize";

import dotenv from "dotenv";
import path from "path";
dotenv.config();

export const sequelize = new Sequelize(
  "Report",
  process.env.DBUSER ? process.env.DBUSER : "root",
  process.env.PASSWORD ? process.env.PASSWORD : "local@123",
  {
    dialect: "mysql",
    //     storage: path.join(__dirname + "/db/db.sqlite"),
    //     logging: false,
  }
);
