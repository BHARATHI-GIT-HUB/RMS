import { Request, Response } from "express";
import { Issue } from "../models";
import { DATE } from "sequelize";

import multerMiddle from "../middleware/multer";
const multer = require("multer");
import path from "path";
import { io } from "../index";

import { MulterRequest } from "../services/service"; // Import your MulterRequest interface

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
      const id = req.params.id;
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

  async getByEmployeeId(req: Request, res: Response) {
    try {
      const id = req.params.id;
      console.log("id in get :", id);
      const issue = await Issue.findAll({ where: { employeeId: id } });
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
      const { title, place, description, employeeId, departmentId, status } =
        req.body;

      const file = req.file;
      // If no file was uploaded, send a 400 Bad Request response to the client.
      console.log("Filename : ", file);
      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Get the filename generated by Multer
      const photoFilename = file.filename;
      const employ_Id = Number(employeeId);
      const dept_Id = Number(departmentId);

      Issue.create({
        title,
        place,
        description,
        photo: photoFilename,
        employeeId: employ_Id,
        departmentId: dept_Id,
        status: [
          {
            dot: `ClockCircleOutlined`,
            children: `Issue Created at ${new Date().toLocaleDateString()} at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} `,
          },
        ],
      })
        .then(async (issue) => {
          console.log("Issues created successfully:", issue);
          const Allissue = await Issue.findAll();
          io.emit("new_issue_data", Allissue);
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

        io.emit("updated_issue_data", issue);

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