import express from "express";
import bodyParser from "body-parser";
import mongoose, { ConnectOptions } from "mongoose";

import { AdminRoute, VendorRoute } from "./app/routes";
import { MONGO_URI } from "./app/config";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/admin", AdminRoute);
app.use("/vendor", VendorRoute);

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then((result) => {
    // console.log(result);
    console.log("DB connected");
  })
  .catch((error) => console.log("error" + error));

app.listen(8000, () => {
  console.clear();
  console.log("App is listening to the port 8000");
});
