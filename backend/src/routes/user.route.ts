// import { Router } from "express";
// import { UserController } from "../controllers";
// import { verifyToken } from "../middleware";

// export class UserRoutes {
//   private router: Router;
//   private controller: UserController;

//   constructor() {
//     this.controller = new UserController();
//     this.router = Router();
//     this.routes();
//   }

//   private routes() {
//     // this.router.get("/page", verifyToken, (req, res) =>
//     //   this.controller.getPaged(req, res)
//     // );

//     this.router.get("/", verifyToken, (req, res) =>
//       this.controller.getAll(req, res)
//     );

//     this.router.get("/:id", verifyToken, (req, res) =>
//       this.controller.getById(req, res)
//     );

//     this.router.post("/register", (req, res) => this.controller.post(req, res));

//     this.router.post("/login", (req, res) => this.controller.login(req, res));

//     this.router.put("/:id", verifyToken, (req, res) =>
//       this.controller.update(req, res)
//     );

//     this.router.delete("/:id", verifyToken, (req, res) =>
//       this.controller.delete(req, res)
//     );
//   }

//   public getRouter() {
//     return this.router;
//   }
// }
