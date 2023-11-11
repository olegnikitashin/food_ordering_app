import express, { Request, Response, NextFunction } from "express";
import {
  GetVendorProfile,
  PatchVendorProfile,
  PatchVendorServiceAvailability,
  VendorLogin,
} from "../controllers";
import { Authenticate } from "../middlewares/CommonAuth";

const router = express.Router();

router.post("/login", VendorLogin);

router.use(Authenticate);
router.get("/profile", GetVendorProfile);
router.patch("/profile", PatchVendorProfile);
router.patch("/service_available", PatchVendorServiceAvailability);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Hello from Vendor" });
});

export { router as VendorRoute };
