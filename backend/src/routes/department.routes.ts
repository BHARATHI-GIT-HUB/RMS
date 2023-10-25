import { Router } from "express";
import { DepartmentController } from "../controllers";
import { Request, Response } from "express";
import { verifyToken } from "../middleware";

export class DepartmentRoutes {
  private router: Router;
  private controller: DepartmentController;

  constructor() {
    this.controller = new DepartmentController();
    this.router = Router();
    this.routes();
  }

  private routes() {
    // Get all departments
    this.router.get(
      "/",
      (req, res, next) =>
        verifyToken(req, res, next, ["SUPERADMIN", "ADMIN", "EMPLOYEE"]),
      (req: Request, res: Response) => this.controller.getAll(req, res)
    );

    this.router.get(
      "/departmentissues/",
      (req, res, next) => verifyToken(req, res, next, ["SUPERADMIN", "ADMIN"]),
      (req: Request, res: Response) =>
        this.controller.getIssuesByCurrentDepartmentId(req, res)
    );

    // Get all departments
    this.router.post("/login", (req: Request, res: Response) =>
      this.controller.login(req, res)
    );

    // Get an departments by ID
    this.router.get(
      "/:id",
      (req, res, next) => verifyToken(req, res, next, ["SUPERADMIN", "ADMIN"]),
      (req: Request, res: Response) => this.controller.getByUserId(req, res)
    );

    // Create a new departments
    this.router.post(
      "/",
      (req, res, next) => verifyToken(req, res, next, ["SUPERADMIN", "ADMIN"]),
      (req: Request, res: Response) => this.controller.create(req, res)
    );

    // Update an employee
    this.router.put(
      "/:id",
      (req, res, next) => verifyToken(req, res, next, ["SUPERADMIN", "ADMIN"]),
      (req: Request, res: Response) => this.controller.update(req, res)
    );

    // Delete an departments
    this.router.delete(
      "/:id",
      (req, res, next) => verifyToken(req, res, next, ["SUPERADMIN", "ADMIN"]),
      (req: Request, res: Response) => this.controller.delete(req, res)
    );
  }

  public getRouter() {
    return this.router;
  }
}
