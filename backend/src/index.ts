import express from "express";
import bcrypt from "bcrypt";
const http = require("http");

import { Secret } from "jsonwebtoken";
import { User } from "./models/user";
import { Employee } from "./models/Employee";
import { Department } from "./models/department";

var nodemailer = require("nodemailer");

const { Server } = require("socket.io");
import {
  EmployeeRoutes,
  DepartmentRoutes,
  IssueRoutes,
  UserRoutes,
} from "./routes";
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

const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user: "bharathi.senthil203@gmail.com",
    pass: "fjgy slge gkjo zvao",
  },
  secure: true,
});

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

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

    res.status(200).json({ token: token, userData: userData });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Failed to log in" });
  }
});

app.post("/forgetpassword", async (req, res) => {
  try {
    const { email } = req.body;
    const existingEmployee = await Employee.findOne({
      where: { email: email },
    });
    const existingDepartment = await Department.findOne({
      where: { email: email },
    });

    if (!existingEmployee && !existingDepartment) {
      console.log("user not found");
      return res
        .status(404)
        .json({ error: `User with Email ${email} not found` });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);
    const otpExpier = new Date();

    otpExpier.setMinutes(otpExpier.getMinutes() + 1);
    console.log(otp, otpExpier);

    let user: User | null = null;
    let mailto;

    if (existingEmployee) {
      user = await User.findByPk(existingEmployee.id);
      mailto = email;
    }

    if (existingDepartment) {
      user = await User.findByPk(existingDepartment.id);
      mailto = email;
    }

    if (user) {
      await user.update({ otp, otpExpire: otpExpier });
      res.status(200).json({ message: "Valid Email" });
    } else {
      return res.status(404).json({ error: `User not found` });
    }
    const mailData = {
      from: "bharathi.senthil203@gmail.com", // sender address
      to: mailto, // list of receivers
      subject: "One Time Password",
      text: `Here is you OTP , Reset mail befor 10 minutes`,
      html: `<html><head><style>body{font-family:'Arial',sans-serif;background-color:#f4f4f4;color:#333;padding:20px;}.container{max-width:600px;margin:0 auto;background-color:#fff;padding:20px;border-radius:5px;box-shadow:0 0 10px rgba(0,0,0,0.1);}h1{color:#007bff;}p{margin-bottom:20px;}.otp{font-size:24px;font-weight:bold;color:#007bff;}.instructions{margin-top:20px;}.footer{margin-top:20px;text-align:center;color:#777;}</style></head><body><div class="container"><h1>One Time Password ${otp}</h1><p>Dear User,</p><p>We've received a request to reset your password. To ensure the security of your account, please use the following One Time Password ${otp} to complete the password reset process:</p><div class="instructions"><p>This OTP is valid for a 10 minitues . Please reset your password promptly.</p><p>If you didn't request a password reset, please ignore this message.</p></div></div><div class="footer"><p>Sent with ❤️ from [RMS]</p></div></body></html>
`,
    };

    transporter.sendMail(mailData, function (err: any, info: any) {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Error sending email" });
      } else {
        console.log(info);
        const messageId = info.messageId || "N/A"; // Handle the case where info.messageId is undefined
        return res
          .status(200)
          .json({ message: "Mail sent", messageId: messageId });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: "Process Failed" });
  }
});

app.post("/resetPassword", async (req, res) => {
  try {
    const now = new Date();
    const tenMinutesFromNow = new Date(now.getTime() + 10 * 60000);
    const { email, password, otp }: any = req.body;
    console.log(email, "email");

    const existingEmployee = await Employee.findOne({
      where: { email: email },
    });
    const existingDepartment = await Department.findOne({
      where: { email: email },
    });

    if (!existingEmployee && !existingDepartment) {
      return res
        .status(404)
        .json({ error: `User with Email ${email} not found` });
      // End the function here to avoid further execution
    }

    let user: User | null = null;
    if (existingEmployee) {
      user = await User.findByPk(existingEmployee.id);
    }

    if (existingDepartment) {
      user = await User.findByPk(existingDepartment.id);
    }

    if (!user) {
      return res.status(404).json({ error: `User not found` });
    }

    if (user.otp != otp) {
      return res.status(404).json({ error: `Given Otp is not valid` });
    }
    const otpExpireTime = user.otpExpire;
    const isExpired = otpExpireTime.getTime() < tenMinutesFromNow.getTime();

    if (!isExpired) {
      return res.status(404).json({ error: `Otp Expired` });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await user.update({
        password: hashedPassword,
        otp: null,
        otpExpire: null,
      });
      return res.status(200).json(user);
    } catch (error: any) {
      return res
        .status(500)
        .json({ error: `Error updating password: ${error.message}` });
    }
  } catch (error) {
    return res.status(500).json({ error: `Process Failed ${error}` });
  }
});

app.use("/api/employee", new EmployeeRoutes().getRouter());
app.use("/api/department", new DepartmentRoutes().getRouter());
app.use("/api/issues", new IssueRoutes().getRouter());
app.use("/api/user", new UserRoutes().getRouter());

const port = 8087;

export const server = http.createServer(app);

export const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST", "PUT"] },
});

io.on("connect_error", (err: any) => {
  console.log(`connect_error due to ${err.message}`);
});

io.on("connection", (socket: any) => {
  console.log(`a user connected ${socket.id}`);
});

server.listen(port, () => {
  console.log(`Express app listening on port http://localhost:${port}`);
});
