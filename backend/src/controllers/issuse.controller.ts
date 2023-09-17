import { Request, Response } from "express";
import { Issue } from "../models";
import { DATE } from "sequelize";
const multer = require("multer");
import path from "path";

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

  // async create(req: Request, res: Response) {
  //   try {
  //     const { title, place, description, employeeId, departmentId, status } =
  //       req.body;

  //    upload.single('photo')(req, res, async (err) => {
  //     if (err) {
  //       return res.status(400).json({ message: 'File upload failed', error: err.message });
  //     }

  //     // Get the filename generated by Multer
  //     const photoFilename = req['file'].filename;

  //     console.log(
  //       title,
  //       place,
  //       description,
  //       photoFilename,
  //       employeeId,
  //       departmentId,
  //       status
  //     );

  //     Issue.create({
  //       title,
  //       place,
  //       description,
  //       photo:photoFilename,
  //       employeeId,
  //       departmentId,
  //       status: [
  //         {
  //           dot: `ClockCircleOutlined`,
  //           children: `Issue Created at ${new Date().toLocaleDateString()} at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} `,
  //         },
  //       ],
  //     })

  //       //     dot: (
  //       //       <ClockCircleOutlined
  //       //         style={{
  //       //           fontSize: "16px",
  //       //         }}
  //       //       />
  //       //     ),
  //       //     children: "Technical testing 2015-09-01",
  //       //   }
  //       .then((issue) => {
  //         console.log("Issues created successfully:", issue);
  //         res.status(201).json(issue);
  //       })
  //       .catch((error) => {
  //         console.error("Error creating Issue:", error);
  //         res.status(500).json({ message: error || "Failed to create Issue" });
  //       });
  //   } catch (error) {
  //     console.error("Error creating Issues:", error);
  //     res.status(500).json({ message: error || "Failed to create Issues" });
  //   }
  // }

  async create(req: Request, res: Response) {
    try {
      // Get the uploaded file from the request object.
      const file = req.file;

      // If no file was uploaded, send a 400 Bad Request response to the client.
      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Get the filename generated by Multer
      const photoFilename = file.filename;

      // Create a new Issue object with the values from the request body and the filename of the uploaded file.
      const issue = await Issue.create({
        title: req.body.title,
        place: req.body.place,
        description: req.body.description,
        photo: photoFilename,
        employeeId: req.body.employeeId,
        departmentId: req.body.departmentId,
        status: [
          {
            dot: `ClockCircleOutlined`,
            children: `Issue Created at ${new Date().toLocaleDateString()} at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
          },
        ],
      });

      // Send a 201 Created response to the client with the newly created issue object.
      res.status(201).json(issue);
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

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: null | Error, destination: string) => void
  ) => {
    cb(null, "../Images"); // Define the destination directory for uploaded files
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: null | Error, destination: string) => void
  ) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Define the filename for uploaded files
  },
});

export const upload = (req: Request, res: Response) =>
  multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB limit for file size
    fileFilter: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: null | Error, destination: boolean | string) => void
    ) => {
      const fileTypes = /jpeg|jpg|png|gif/; // Define allowed file types
      const mimeType = fileTypes.test(file.mimetype);
      const extname = fileTypes.test(path.extname(file.originalname));

      if (mimeType && extname) {
        return cb(null, true);
      }
      cb(new Error("Give proper file formats to upload"), false);
    },
  }).single("photo");
