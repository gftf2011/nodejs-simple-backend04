import { Router } from "express";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";

import {
  nameExists,
  emailExists,
  oldPasswordExists,
  passwordExists
} from "./app/middlewares/userMiddleware";

import authToken from "./app/middlewares/sessionMiddleware";

const routes = new Router();

routes.get("/user", authToken, (req, res) => {
  UserController.list(req, res);
});

routes.post("/user", nameExists, emailExists, passwordExists, (req, res) => {
  UserController.store(req, res);
});

routes.post("/session", (req, res) => {
  SessionController.store(req, res);
});

routes.put(
  "/user",
  emailExists,
  passwordExists,
  oldPasswordExists,
  authToken,
  (req, res) => {
    UserController.update(req, res);
  }
);

routes.delete("/user", emailExists, authToken, (req, res) => {
  UserController.remove(req, res);
});

export default routes;
