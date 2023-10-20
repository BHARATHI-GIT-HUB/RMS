import { Router } from "express";
import { IssuesController } from "../controllers";
import { Request, Response } from "express";
import { verifyToken } from "../middleware";
import upload from "../middleware/multer";
import { MulterRequest } from "../services/service";
export class IssueRoutes {
  private router: Router;
  private controller: IssuesController;

  constructor() {
    this.controller = new IssuesController();
    this.router = Router();
    this.routes();
  }

  private routes() {
    // Get all employees
    this.router.get(
      "/",
      // (req, res, next) => verifyToken(req, res, next, ["SUPERADMIN", "ADMIN"]),
      (req: Request, res: Response) => this.controller.getAll(req, res)
    );

    // Get an employee by ID
    this.router.get(
      "/:id",
      //
      // (req, res, next) =>
      //   //   // verifyToken(req, res, next, ["SUPERADMIN", "ADMIN", "EMPLOYEE"]),
      (req: Request, res: Response) => this.controller.getById(req, res)
    );

    this.router.get(
      "/employee/:id",
      //
      // (req, res, next) =>
      //   //   // verifyToken(req, res, next, ["SUPERADMIN", "ADMIN", "EMPLOYEE"]),
      (req: Request, res: Response) => this.controller.getByEmployeeId(req, res)
    );

    // Create a new employee
    this.router.post(
      "/",
      upload.single("photo"),
      // (req, res, next) =>
      // verifyToken(req, res, next, ["SUPERADMIN", "ADMIN", "EMPLOYEE"]),
      async (req: Request, res: Response) => this.controller.create(req, res)
    );

    // Update an employee
    this.router.put(
      "/:id",
      // (req, res, next) =>
      // verifyToken(req, res, next, ["SUPERADMIN", "ADMIN", "EMPLOYEE"]),
      (req: Request, res: Response) => this.controller.update(req, res)
    );

    // Delete an employee
    this.router.delete(
      "/:id",
      // (req, res, next) =>
      // verifyToken(req, res, next, ["SUPERADMIN", "ADMIN", "EMPLOYEE"]),
      (req: Request, res: Response) => this.controller.delete(req, res)
    );
  }

  public getRouter() {
    return this.router;
  }
}
