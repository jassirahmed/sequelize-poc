import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
const mysql = require("mysql");
const app: Express = express();
const port = 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
const dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Jassir@1234",
  database: "prac_db",
});
dbConn.connect((err: string) => {
  if (err) throw err;
  console.log("Connected to Database");
});

app.get("/users", (req, res) => {
  dbConn.query("SELECT * FROM users", (error: boolean, data: []) => {
    if (error) throw error;
    return res.send({ error: false, data: data, message: "user list" });
  });
});
app.get("/user/:id", (req, res) => {
  let user_id = req.params.id;
  if (!user_id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide user_id" });
  }
  dbConn.query(
    `SELECT * FROM users where id=?`,
    user_id,
    (error: boolean, results: any) => {
      if (error) throw error;
      console.log("data", results);
      return res.send({
        error: false,
        data: results[0],
        message: "users list.",
      });
    }
  );
});
app.post("/user", (req, res) => {
  let user = req.body.user;
  if (!user) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide user" });
  }
  dbConn.query(
    `INSERT INTO users SET ?`,
    user,
    (error: boolean, results: any) => {
      console.log("data", user);

      return res.send({
        error: false,
        data: results,
        message: "New user has been created successfully.",
      });
    }
  );
});
app.put("/user", (req, res) => {
  let user_id = req.body.user_id;
  let user = req.body.user;
  if (!user_id || !user) {
    res
      .status(400)
      .send({ error: user, message: "Please provide user and user_id" });
  }
  dbConn.query(
    `UPDATE users SET ? WHERE id=?`,
    [user, user_id],
    (error: any, results: any) => {
      res.send({
        error: false,
        data: results,
        message: "user has been updated successfully.",
      });
    }
  );
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
