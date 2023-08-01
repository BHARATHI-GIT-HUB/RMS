import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";
import { User } from "./user";

export class Department extends Model {
  public id!: number;
  public name!: string;
  public department_admin!: string;
  public password!: string;
}

Department.init(
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
    department_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Department",
    tableName: "department",
    timestamps: false,
    underscored: false,
  }
);

(async () => {
  try {
    // Check if the "Department" table exists
    const tableExists = await sequelize.getQueryInterface().showAllTables();
    if (!tableExists.includes("deparatments")) {
      // Create the "Department" table if it doesn't exist
      await Department.sync();
      console.log("Department table created successfully.");
    }

    // Perform other operations on the "Department" table here
  } catch (error) {
    console.error("Error creating or accessing Department table:", error);
  }
})();
