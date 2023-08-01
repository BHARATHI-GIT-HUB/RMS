import { Request, Response } from "express";
import { Issue } from "../models";

export class IssuesController {
  async getAll(req: Request, res: Response) {
    try {
      const issue = await Issue.findAll();
      res.status(200).json(issue);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve Issues" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const issue = await Issue.findByPk(id);
      if (issue) {
        res.status(200).json(issue);
      } else {
        res.status(404).json({ error: `Issue with id ${id} not found` });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve Issue" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const {
        title,
        place,
        description,
        photo,
        employeeId,
        departmentId,
        status,
      } = req.body;

      console.log(
        title,
        place,
        description,
        photo,
        employeeId,
        departmentId,
        status
      );

      Issue.create({
        title,
        place,
        description,
        photo,
        employeeId,
        departmentId,
        status,
      })
        .then((issue) => {
          console.log("Issues created successfully:", issue);
          res.status(201).json(issue);
        })
        .catch((error) => {
          console.error("Error creating Issue:", error);
          res.status(500).json({ message: error || "Failed to create Issue" });
        });
    } catch (error) {
      console.error("Error creating Issues:", error);
      res.status(500).json({ message: error || "Failed to create Issues" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        title,
        place,
        description,
        photo,
        employeeId,
        departmentId,
        status,
      } = req.body;

      const issue = await Issue.findByPk(id);
      if (issue) {
        await issue.update({
          title,
          place,
          description,
          photo,
          employeeId,
          departmentId,
          status,
        });
        res.status(200).json(issue);
      } else {
        res.status(404).json({ error: `Issues with id ${id} not found` });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update Issues" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const issue = await Issue.findByPk(id);
      if (issue) {
        await issue.destroy();
        res.status(200).json({});
      } else {
        res.status(404).json({ error: `Issues with id ${id} not found` });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete Issues" });
    }
  }
}
