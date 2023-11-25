import { DataTypes, Model } from "sequelize";
import { sequelize } from "./../db";

export class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public role!: string;
  public otp!: number; // Add this line
  public otpExpire!: Date;
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
    otp: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    otpExpire: {
      type: DataTypes.DATE,
      allowNull: true,
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
    const tableExists = await sequelize.getQueryInterface().showAllTables();
    if (!tableExists.includes("user")) {
      await User.sync();
      console.log("user table created successfully.");
    }
  } catch (error) {
    console.error("Error creating or accessing user table:", error);
  }
})();
