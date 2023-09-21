import { UserController } from "../controllers";
import { Router } from "express";
import { Request, Response } from "express";
import { verifyToken } from "../middleware";
import upload from "../middleware/multer";

export class UserRoutes {
  private router: Router;
  private controller: UserController;

  constructor() {
    this.controller = new UserController();
    this.router = Router();
    this.routes();
  }
  private routes() {
    this.router.get(
      "/",
      // (req, res, next) => verifyToken(req, res, next, ["SUPERADMIN", "ADMIN"]),
      (req: Request, res: Response) => this.controller.getAll(req, res)
    );

    this.router.get(
      "/employee",
      // (req, res, next) => verifyToken(req, res, next, ["SUPERADMIN", "ADMIN"]),
      (req: Request, res: Response) => this.controller.getByEmployee(req, res)
    );

    this.router.get(
      "/department",
      // (req, res, next) => verifyToken(req, res, next, ["SUPERADMIN", "ADMIN"]),
      (req: Request, res: Response) => this.controller.getByDepartment(req, res)
    );

    this.router.get(
      "/:id",
      //
      // (req, res, next) =>
      //   //   // verifyToken(req, res, next, ["SUPERADMIN", "ADMIN", "EMPLOYEE"]),
      (req: Request, res: Response) => this.controller.getById(req, res)
    );

    this.router.post(
      "/",
      upload.single("photo"),
      // (req, res, next) =>
      // verifyToken(req, res, next, ["SUPERADMIN", "ADMIN", "EMPLOYEE"]),
      async (req: Request, res: Response) => this.controller.create(req, res)
    );

    this.router.put(
      "/:id",
      // (req, res, next) =>
      // verifyToken(req, res, next, ["SUPERADMIN", "ADMIN", "EMPLOYEE"]),
      (req: Request, res: Response) => this.controller.update(req, res)
    );

    this.router.delete(
      "/:id",
      (req, res, next) =>
        // verifyToken(req, res, next, ["SUPERADMIN", "ADMIN", "EMPLOYEE"]),
        (req: Request, res: Response) =>
          this.controller.delete(req, res)
    );
  }

  public getRouter() {
    return this.router;
  }
}
