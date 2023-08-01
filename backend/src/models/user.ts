import { DataTypes, Model } from "sequelize";
import { sequelize } from "./../db";

export class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public role!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM,
      values: ["SUPERADMIN", "ADMIN", "EMPLOYEE"],
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false,
    underscored: false,
  }
);

(async () => {
  try {
    // Check if the "Issues" table exists
    const tableExists = await sequelize.getQueryInterface().showAllTables();
    if (!tableExists.includes("issues")) {
      // Create the "Issues" table if it doesn't exist
      await User.sync();
      console.log("Issues table created successfully.");
    }

    // Perform other operations on the "Issues" table here
  } catch (error) {
    console.error("Error creating or accessing Issues table:", error);
  }
})();
