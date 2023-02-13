import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import express, { Express, Request, Response } from "express";
const usersRouter = require("./users/user");
const port = 4000;
const app = express();

dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", usersRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
