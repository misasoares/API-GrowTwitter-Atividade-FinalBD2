import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      email: string;
      password: string;
      username: string;
      name: string;
      iat: number;
    };
  }
}
