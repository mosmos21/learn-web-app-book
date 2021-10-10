import { ErrorRequestHandler } from "express";
import { AuthenticationError, ServiceError } from "~/services/errors";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  switch (err.name) {
    case ServiceError.name:
      res.status(400).send({ message: err.message });
      break;
    case AuthenticationError.name:
      res.status(401).send({ message: err.message });
      break;
    default:
      res.status(500).send({ message: "Internal server error." });
  }
};
