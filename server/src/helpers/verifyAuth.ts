import { Request, Response, NextFunction } from "express";
import UserServices from "../services/userServices";
import jwt_decode from "jwt-decode";

async function getUserById(userid: string) {
  try {
    const isUserExist = await UserServices.getUserById(userid);
    return isUserExist;
  } catch (err) {
    return err;
  }
}

async function tokenValidation(req: Request, res: Response) {
  const token = req.cookies.token;
  const user = req.cookies.cred;
  const userType = req.cookies.type;
  const headerToken = req.headers.authorization;

  // Token Availability Checking
  if (!user || !token || !headerToken || !userType) {
    return res.status(401).send("Unauthorized");
  }

  // Decoding Tokens from both cookie and header
  const decode = jwt_decode(token) as any;
  const decode2 = jwt_decode(`${headerToken}`) as any;

  // Comparing the decoded token creds
  if (decode?.id !== decode2?.id) {
    return res.status(402).send("Token Mismatch");
  }

  const userData = (await getUserById(decode?.id)) as any;
  const userDatav2 = (await getUserById(decode2?.id)) as any;

  // Checking is the user exists
  if (userData && userData?._id === null && userDatav2 && userDatav2?._id === null) {
    return res.status(403).send("Forbidden");
  }

  // Checking is the cookie userid and the decoded tokens creds matches
  if (user !== userData._id.toString() && user !== userDatav2._id.toString()) {
    return res.status(403).send("Forbidden");
  }

  // Checking if the type of user is override
  if (userData?.usertype !== userType || userDatav2?.usertype !== userType) {
    return res.status(401).send("Unauthorized");
  }
}

export async function verifyStorageAuth(req: Request, res: Response, next: NextFunction) {
  console.log(req.originalUrl, req.method, new Date().toUTCString());
  await tokenValidation(req, res);
  return next();
}

export async function verifyAdminAuth(req: Request, res: Response, next: NextFunction) {
  // Basic Token Validation
  await tokenValidation(req, res);
  const token = req.headers.authorization;
  const userType = req.cookies.type;

  // Checking if the token is in there
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  if (userType !== "ADMIN") {
    return res.status(401).send("Unauthorized");
  }

  const token_decode = jwt_decode(token) as any;
  const user_id = token_decode?.id;
  const userData = (await getUserById(user_id)) as any;

  // Checking the if the user id ADMIN based on the decoded token
  if (userData?.usertype !== "ADMIN") {
    return res.status(401).send("Unauthorized");
  }

  return next();
}
