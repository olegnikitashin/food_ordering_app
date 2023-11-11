import { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import { Vendor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility";

export const CreateVendor = async (
  request: Request,
  response: Response,
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
  } = <CreateVendorInput>request.body;

  const existingVender = await Vendor.findOne({ email: email });

  if (existingVender !== null) {
    return response.json({
      message: "A vendor with this email already exists!",
    });
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

  return response.json(CreateVendor);
};

export const GetVendors = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const vendors = await Vendor.find();

  if (vendors !== null) {
    return response.json(vendors);
  }

  return response.json({ message: "There are no vendors" });
};

export const GetVendorByID = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const vendorId = request.params.id;

  const vendor = await Vendor.findById(vendorId);

  if (vendor !== null) {
    return response.json(vendor);
  }

  return response.json({ message: "There's no vendor with the given id" });
};
