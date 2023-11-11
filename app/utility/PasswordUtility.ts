import bcrypt from "bcrypt";
import { VendorPayload } from "../dto";
import jwt from "jsonwebtoken";
import { APP_SECRET } from "../config";
import { Request } from "express";
import { AuthPayload } from "../dto/Auth.dto";

export const GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

export const GeneratePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const ValidatePassword = async (
  enteredPassword: string,
  savedPassword: string,
  salt: string
) => {
  return (await GeneratePassword(enteredPassword, salt)) === savedPassword;
};

export const GenerateJwtToken = async (payload: VendorPayload) => {
  return jwt.sign(payload, APP_SECRET, { expiresIn: "2h" });
};

export const ValidateJwtToken = async (request: Request) => {
  const jwtToken = request.get("Authorization");

  if (jwtToken) {
    const payload = jwt.verify(
      jwtToken.split(" ")[1],
      APP_SECRET
    ) as AuthPayload;

    request.user = payload;

    return true;
  }
};
