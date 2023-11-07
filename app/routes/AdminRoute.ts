import express, { Request, Response, NextFunction } from "express";
import { CreateVendor, GetVendors, GetVendorByID } from "../controllers";

const router = express.Router();

router.post("/vendors", CreateVendor);
router.get("/vendors", GetVendors);
router.get("/vendors/:id", GetVendorByID);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Hello from Admin" });
});

export { router as AdminRoute };
