import express from "express";
import bcrypt from "bcrypt";
import { Secret } from "jsonwebtoken";
import { User } from "./models/user";
import { EmployeeRoutes, DepartmentRoutes, IssueRoutes } from "./routes";
import jwt from "jsonwebtoken";

const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

const secretKey: Secret = process.env.SECRET_KEY || "";
const expiresIn = "1h";

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  try {
    const user = await User.findOne({ where: { username: username } });

    if (!user) {
      return res.status(401).json({ error: "Invalid UserName" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
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
});

app.use("/api/employee", new EmployeeRoutes().getRouter());
app.use("/api/department", new DepartmentRoutes().getRouter());
app.use("/api/issues", new IssueRoutes().getRouter());

const port = 8087;
app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
