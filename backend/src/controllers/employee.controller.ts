import { Request, Response } from "express";
import { Employee, User } from "../models";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Secret } from "jsonwebtoken";
import { sequelize } from "../db";

const secretKey: Secret = process.env.SECRET_KEY || "";
const expiresIn = "1h";

export class EmployeeController {
  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    console.log(username, password);

    try {
      const user = await User.findOne({ where: { username: username } });

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: user.id, username, role: user.role },
        secretKey,
        { expiresIn }
      );

      const userData = {
        id: user.id,
        username,
        role: user.role,
      };

      res.status(200).json({ token: token, employee: userData });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Failed to log in" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const employees = await Employee.findAll();
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve employees" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const employee = await Employee.findByPk(id);
      if (employee) {
        res.status(200).json(employee);
      } else {
        res.status(404).json({ error: `Employee with id ${id} not found` });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve employee" });
    }
  }
  async getByUserId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const employee = await Employee.findOne({ where: { userId: id } });
      if (employee) {
        res.status(200).json(employee);
      } else {
        res.status(404).json({ error: `Employee with id ${id} not found` });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve employee" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, email, phone, password, designation } = req.body;
      console.log("Data", name, email, password, designation);
      const existingEmail = await Employee.findOne({ where: { email: email } });

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

        await Employee.create(
          {
            userId: createdUser.id,
            email: email,
            phone: phone,
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
        res.status(201).json({ token: token, employee: createdUser });
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
      const employee = await Employee.findByPk(id);
      if (employee) {
        await employee.update({ name, email, role, Department });
        res.status(200).json(employee);
      } else {
        res.status(404).json({ error: `Employee with id ${id} not found` });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update employee" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const employee = await Employee.findByPk(id);
      if (employee) {
        await employee.destroy();
        res.status(200).json({});
      } else {
        res.status(404).json({ error: `Employee with id ${id} not found` });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete employee" });
    }
  }
}
