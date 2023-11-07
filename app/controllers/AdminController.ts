import { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import { Vendor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility";

export const CreateVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    owner_name: ownerName,
    food_type: foodType,
    pincode,
    address,
    phone,
    email,
    password,
  } = <CreateVendorInput>req.body;

  const existingVender = await Vendor.findOne({ email: email });

  if (existingVender !== null) {
    return res.json({ message: "A vendor with this email already exists!" });
  }

  const salt = await GenerateSalt();
  const hashedPassword = await GeneratePassword(password, salt);

  const CreateVendor = await Vendor.create({
    name: name,
    ownerName: ownerName,
    foodType: foodType,
    pincode: pincode,
    address: address,
    phone: phone,
    email: email,
    password: hashedPassword,
    salt: salt,
    serviceAvailable: false,
    coverImages: [],
    rating: 0,
  });

  return res.json(CreateVendor);
};

export const GetVendors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const GetVendorByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
