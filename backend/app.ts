import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
import apiRoutes from "./routes/api";

app.use(cors());
app.use(express.json());
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
