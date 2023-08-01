import { NextFunction, Request, Response } from "express";

import { verify } from "jsonwebtoken";

// const config = process.env.SECRET_KEY ? process.env.SECRET_KEY : "";
const config = "come_and_fly_with_me";

export const verifyToken = (
  req: any,
  res: Response,
  next: NextFunction,
  access: string[]
) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded: any = verify(token, config);
    console.log(decoded, "decoded");
    req.user = decoded;
    if (!access.includes(decoded.role)) {
      return res.status(403).send("You do not have permission");
    }
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
