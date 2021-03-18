import express, { ErrorRequestHandler } from "express";
import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";

interface Config {
  jwksUri: string;
}

export const createApp: (config: Config) => express.Application = ({
  jwksUri,
}) =>
  express()
    .use(
      jwt({
        secret: jwksRsa.expressJwtSecret({
          cache: false,
          jwksUri,
        }),
        audience: "urn:my-resource-server",
        issuer: "https://my-authz-server/",
        algorithms: ["RS256"],
      })
    )
    .get("/", (_, res) => {
      res.sendStatus(200);
    })
    .use(
      (
        error: Error,
        _: express.Request,
        __: express.Response,
        next: express.NextFunction
      ) => {
        console.log(error);
        next(error);
      }
    );
