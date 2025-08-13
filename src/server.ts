import express from "express";
import {
  globalMiddleware,
  errorHandler,
} from "./middleware/globalMiddleware.ts";
import newsletterRoute from "./routes/newsletterRoute.ts";
import { createConnection } from "./config/db.ts";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(globalMiddleware); // this middleware will be executed for every request

app.get("/api/v1", function (req, res) {
  res.json({ message: "Newsletter API" });
});

app.use("/api/v1/newsletter", newsletterRoute); // this has the routes for the resturants

app.use(errorHandler); // if any unxpected synchronous error occurs, this middleware will catch it

(async () => {
  try {
    await createConnection();
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
})();
