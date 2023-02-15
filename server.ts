import express, { Express, Request, Response } from "express";
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
import dotenv from "dotenv";
import { CreateUser, findAllUsers } from "./app";
const app: Express = express();

dotenv.config();
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/create", CreateUser);
app.post("/users", findAllUsers);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
