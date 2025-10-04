import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { mongoDB } from './lib/db.js';
import userRoute from './routes/userRoute.js';
import blogRoute from './routes/blogRoute.js';
import path from 'path'
import { fileURLToPath } from 'url';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());

// app.get('/', (req, res) => {
//     res.send("server is working fine ✅");
// })

app.use("/api/user", userRoute);
app.use("/api/blog", blogRoute);

// **** most important for production :
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("/*any", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
    mongoDB();
})