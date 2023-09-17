import { Employee } from "./employee";
import { Department } from "./department";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

export class Issue extends Model {}

Issue.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    place: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Employee,
        key: "id",
      },
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Department,
        key: "id",
      },
    },
    status: {
      type: DataTypes.JSON, // Use ARRAY data type for an array of JSON objects
      allowNull: true,
      // defaultValue: [], // Optional: Set a default value as an empty array
    },
  },
  {
    sequelize,
    modelName: "Issues",
    tableName: "issues",
    timestamps: true,
    underscored: true,
  }
);

Issue.belongsTo(Employee, {
  foreignKey: "employeeId",
  as: "employee",
});

Issue.belongsTo(Department, {
  foreignKey: "departmentId",
  as: "department",
});

Employee.hasMany(Issue, {
  foreignKey: "employeeId",
  as: "issues",
  onDelete: "cascade",
});

Department.hasMany(Issue, {
  foreignKey: "departmentId",
  as: "issues",
  onDelete: "cascade",
});

(async () => {
  try {
    // Check if the "Issues" table exists
    const tableExists = await sequelize.getQueryInterface().showAllTables();
    if (!tableExists.includes("issues")) {
      // Create the "Issues" table if it doesn't exist
      await Issue.sync();
      console.log("Issues table created successfully.");
    }

    // Perform other operations on the "Issues" table here
  } catch (error) {
    console.error("Error creating or accessing Issues table:", error);
  }
})();
