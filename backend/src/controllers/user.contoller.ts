import { Request, Response } from "express";
import { Employee, User } from "../models";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Secret } from "jsonwebtoken";
import { sequelize } from "../db";

const secretKey: Secret = process.env.SECRET_KEY || "";
const expiresIn = "1h";

export class UserController {
  async getByEmployee(req: Request, res: Response) {
    try {
      const user = await User.findAll({
        where: { role: "EMPLOYEE" },
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve user" });
    }
  }

  async getByDepartment(req: Request, res: Response) {
    try {
      const user = await User.findAll({ where: { role: "ADMIN" } });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve user" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const user = await User.findAll();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve user" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: `user with id ${id} not found` });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve user" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, email, password, designation } = req.body;
      // console.log("Data", name, email, password, designation);
      const existingEmail = await User.findOne({ where: { email: email } });

      if (existingEmail) {
        return res.status(400).json("Employee Already Exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const transaction = await sequelize.transaction();

      try {
        const createdUser = await User.create(
          {
            username: name,
            password: hashedPassword,
            role: "EMPLOYEE",
          },
          { transaction }
        );

        await User.create(
          {
            userId: createdUser.id,
            email: email,
            designation: designation,
          },
          { transaction }
        );

        const token = jwt.sign(
          { userId: createdUser.id, name, role: "EMPLOYEE" },
          secretKey,
          { expiresIn }
        );
        await transaction.commit();

        console.log("Employee and User created successfully:");
        res.status(201).json({ token: token, userData: createdUser });
      } catch (error) {
        await transaction.rollback(); // Rollback the transaction if an error occurs
        console.error("Error creating employee:", error);
        res.status(500).json({ message: "Failed to create employee" });
      }
    } catch (error) {
      console.error("Error creating employee:", error);
      res.status(500).json({ message: "Failed to create employee" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, role, Department } = req.body;
      const user = await User.findByPk(id);
      if (user) {
        await user.update({ name, email, role, Department });
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: `user with id ${id} not found` });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (user) {
        await user.destroy();
        res.status(200).json({});
      } else {
        res.status(404).json({ error: `User with id ${id} not found` });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete user" });
    }
  }
}
