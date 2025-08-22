import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import router from "./routes/index.js";
import notFound from "./middleware/notFound.js";      // default export?
import errorHandler from "./middleware/errorHandler.js"; // default export?

dotenv.config(); // ✅ load env first

const app = express();
import { connectDB } from "./config/db.js";
const PORT = process.env.PORT || 3001;

app.use(cors(/* later: { origin: CLIENT_URL } */));
app.use(express.json());
app.use(morgan("dev"));

// app.get("/boom", (req, res) => {
//   throw new Error("Something exploded 💥");
// });

app.use("/", router);

// 404 first, then error handler (must be LAST)
app.use(notFound);       
app.use(errorHandler);  

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});