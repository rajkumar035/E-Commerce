import { NextFunction, Request, Response } from "express";

export const handleAuthentication = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.headers.authorization);
  if (req.headers.authorization) {
    return next();
  } else {
    res.send(400).json({ Message: "No Authorization" });
  }
};
