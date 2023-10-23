import { Department } from "./department";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";
import { User } from "./user";

export class Employee extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: string;
}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Employee",
    tableName: "employees",
    timestamps: false,
    underscored: false,
  }
);

(async () => {
  try {
    // Check if the "employees" table exists
    const tableExists = await sequelize.getQueryInterface().showAllTables();
    if (!tableExists.includes("employees")) {
      // Create the "employees" table if it doesn't exist
      await Employee.sync();
      console.log("Employees table created successfully.");
    }

    // Perform other operations on the "employees" table here
  } catch (error) {
    console.error("Error creating or accessing employees table:", error);
  }
})();
