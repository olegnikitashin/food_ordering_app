import { Request, Response, NextFunction } from "express";
import { LoginVendorInput, PatchVendorInput } from "../dto";
import { Vendor } from "../models";
import { GenerateJwtToken, ValidatePassword } from "../utility";

export const VendorLogin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email, password } = <LoginVendorInput>request.body;

  const existingVendor = await Vendor.findOne({ email: email });

  if (existingVendor !== null) {
    const validation = await ValidatePassword(
      password,
      existingVendor.password,
      existingVendor.salt
    );

    if (validation) {
      const jwtToken = await GenerateJwtToken({
        _id: existingVendor.id,
        email: existingVendor.email,
        name: existingVendor.name,
        foodType: existingVendor.foodType,
      });
      return response.json(jwtToken);
    } else {
      return response.json({
        message: "Password is not valid",
      });
    }
  }

  return response.json({ message: "Login credentials are not valid" });
};

export const GetVendorProfile = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const user = request.user;

  if (user) {
    const vendor = await Vendor.findById(user._id);
    return response.json(vendor);
  }

  return response.json({ message: "Vendor not found" });
};

export const PatchVendorProfile = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const {
    name,
    food_type: foodType,
    address,
    phone,
  } = <PatchVendorInput>request.body;
  const user = request.user;

  if (user) {
    const vendor = await Vendor.findById(user._id);

    if (vendor != null) {
      vendor.name = name;
      vendor.address = address;
      vendor.phone = phone;
      vendor.foodType = foodType;

      const updatedVendor = await vendor.save();

      return response.json(updatedVendor);
    }
    return response.json(vendor);
  }

  return response.json({ message: "Vendor not found" });
};

export const PatchVendorServiceAvailability = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const user = request.user;

  if (user) {
    const vendor = await Vendor.findById(user._id);

    if (vendor != null) {
      vendor.serviceAvailable = !vendor.serviceAvailable;
      const updatedVendor = await vendor.save();

      return response.json(updatedVendor);
    }
    return response.json(vendor);
  }

  return response.json({ message: "Vendor not found" });
};
