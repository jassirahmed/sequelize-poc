const { User } = require("./models");
const Sequelize = require("sequelize");
import { Request, Response } from "express";
const Op = Sequelize.Op;

export const findAllUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();
  console.log(users, "users");

  return res.send({ error: false, data: users, message: "user List" });
};
export const findAllSameUsers = async () => {
  const johns = await User.findAll({
    where: {
      firstName: "John",
    },
  });
  console.log(
    "All users with first name John:",
    JSON.stringify(johns, null, 4)
  );
};
export const CreateUser = async (req: Request, res: Response) => {
  const user = req.body;
  if (!user) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide user" });
  }
  const data = await User.create(user);
  console.log("Jane's auto-generated ID:", data.id);
  return res.status(200).send({
    error: true,
    message: "New user has been created successfully.",
    data: data,
  });
};
export const destroyUser = async () => {
  const destroyed = await User.destroy({
    where: {
      firstName: "Jane",
    },
  });
  console.log("Destroyed:", destroyed);
};
export const updateUser = async () => {
  const updated = await User.update(
    { lastName: "Smith" },
    {
      where: {
        lastName: "Doe",
      },
    }
  );
  console.log("Updated:", updated);
};
export const findAllEmails = async () => {
  const emails = await User.findAll({
    attributes: ["email"],
  });
  console.log("All user emails:", JSON.stringify(emails, null, 4));
};
export const findAllJohnsOrJanes = async () => {
  const johnOrJanes = await User.findAll({
    where: {
      [Op.or]: [{ firstName: "John" }, { firstName: "Jane" }],
    },
  });
  console.log(
    "All users with first name John or Jane:",
    JSON.stringify(johnOrJanes, null, 4)
  );
};
