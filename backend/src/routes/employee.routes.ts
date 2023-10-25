import { Router } from "express";
import { EmployeeController } from "../controllers";
import { Request, Response } from "express";
import { verifyToken } from "../middleware";

export class EmployeeRoutes {
  private router: Router;
  private controller: EmployeeController;

  constructor() {
    this.controller = new EmployeeController();
    this.router = Router();
    this.routes();
  }

  private routes() {
    // Get all employees
    this.router.get(
      "/",
      (req, res, next) =>
        verifyToken(req, res, next, ["SUPERADMIN", "EMPLOYEE"]),
      (req: Request, res: Response) => this.controller.getAll(req, res)
    );

    //login
    this.router.post("/login", (req: Request, res: Response) =>
      this.controller.login(req, res)
    );

    // Get an employee by ID
    this.router.get(
      "/:id",
      (req, res, next) =>
        verifyToken(req, res, next, ["SUPERADMIN", "EMPLOYEE"]),
      (req: Request, res: Response) => this.controller.getByUserId(req, res)
    );

    // Create a new employee
    this.router.post(
      "/",
      (req, res, next) =>
        verifyToken(req, res, next, ["SUPERADMIN", "EMPLOYEE"]),
      (req: Request, res: Response) => this.controller.create(req, res)
    );

    // Update an employee
    this.router.put(
      "/:id",
      (req, res, next) =>
        verifyToken(req, res, next, ["SUPERADMIN", "EMPLOYEE"]),
      (req: Request, res: Response) => this.controller.update(req, res)
    );

    // Delete an employee
    this.router.delete(
      "/:id",
      (req, res, next) =>
        verifyToken(req, res, next, ["SUPERADMIN", "EMPLOYEE"]),
      (req: Request, res: Response) => this.controller.delete(req, res)
    );
  }

  public getRouter() {
    return this.router;
  }
}
