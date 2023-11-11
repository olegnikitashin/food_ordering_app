import { NextFunction, Request, Response } from "express";
import { AuthPayload } from "../dto";
import { ValidateJwtToken } from "../utility";

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export const Authenticate = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const valid = await ValidateJwtToken(request);

  if (valid) {
    next();
  } else {
    return response.json({ message: "User not Authorized" });
  }
};
