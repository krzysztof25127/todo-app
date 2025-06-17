import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import todosRoutes from "./routes/todosRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/todos", todosRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Serwer działa na http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Błąd podczas uruchamiania serwera:", err);
  });
