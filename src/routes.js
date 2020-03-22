import { Router } from "express";

import UserController from "./app/controllers/UserController";

import {
  nameExists,
  emailExists,
  oldPasswordExists,
  passwordExists
} from "./app/middlewares/userMiddleware";

const routes = new Router();

routes.get("/user", (req, res) => {
  UserController.list(req, res);
});

routes.post("/user", nameExists, emailExists, passwordExists, (req, res) => {
  UserController.store(req, res);
});

routes.put(
  "/user",
  emailExists,
  passwordExists,
  oldPasswordExists,
  (req, res) => {
    UserController.update(req, res);
  }
);

routes.delete("/user", emailExists, (req, res) => {
  UserController.remove(req, res);
});

export default routes;
