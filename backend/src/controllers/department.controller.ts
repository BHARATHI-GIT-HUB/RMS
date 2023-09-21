import { Request, Response } from "express";
import { Department, Issue, User } from "../models";
import { Request as ExpressRequest } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Secret } from "jsonwebtoken";
import { sequelize } from "../db";

const secretKey: Secret = process.env.SECRET_KEY || "";
const expiresIn = "1h";

interface CustomRequest extends Request {
  user?: any; // Modify the type of 'user' according to your decoded token data
}

export class DepartmentController {
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

  async getIssuesByCurrentDepartmentId(req: CustomRequest, res: Response) {
    try {
      // Debugging: Check the structure of req.user
      const currentDepartmentId = req.query.id; // Access the 'id' query parameter
      if (!currentDepartmentId) {
        res.status(500).json({ error: "Employee not found" });
      }

      console.log(currentDepartmentId, ":id");
      const issues = await Issue.findAll({
        where: {
          departmentId: currentDepartmentId,
        },
      });
      res.json(issues);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const department = await Department.findAll();
      res.status(200).json(department);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve department" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const department = await Department.findByPk(id);
      if (department) {
        res.status(200).json(department);
      } else {
        res.status(404).json({ error: `Department with id ${id} not found` });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve Department" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, password, department_name } = req.body;

      const existingDepartment = await Department.findOne({
        where: { department_name: department_name },
      });

      if (existingDepartment) {
        return res.status(400).json("Department Admin Already Have an Account");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // Create User and Department inside the same transaction
      const transaction = await sequelize.transaction();

      try {
        const createdUser = await User.create(
          {
            username: name,
            password: hashedPassword,
            role: "ADMIN",
          },
          { transaction }
        );

        await Department.create(
          {
            userId: createdUser.id,
            password: hashedPassword,
            department_name: department_name,
          },
          { transaction }
        );

        const token = jwt.sign(
          { userId: createdUser.id, name, role: "ADMIN" },
          secretKey,
          { expiresIn }
        );
        await transaction.commit();

        console.log("Department and User created successfully:");
        res.status(201).json({ token: token, Department: createdUser });
      } catch (error) {
        await transaction.rollback();
        console.error("Error creating Department:", error);
        res.status(500).json({ message: "Failed to create Department" });
      }
    } catch (error) {
      console.error("Error creating Department:", error);
      res.status(500).json({ message: "Failed to create Department" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, role, Department } = req.body;
      const department = await Department.findByPk(id);
      if (department) {
        await department.update({ name, role, Department });
        res.status(200).json(department);
      } else {
        res.status(404).json({ error: `Department with id ${id} not found` });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update department" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const department = await Department.findByPk(id);
      if (department) {
        await department.destroy();
        res.status(200).json({});
      } else {
        res.status(404).json({ error: `Department with id ${id} not found` });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete department" });
    }
  }
}
