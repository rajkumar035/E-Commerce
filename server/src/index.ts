import express, { Express } from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import router from "./V1/routes/router";
import { graphqlHTTP } from "express-graphql";
import { verifyAdminAuth, verifyStorageAuth } from "./helpers/verifyAuth";
import UserSchema from "./V1/graphql/UserSchema";
import StorageSchema from "./V1/graphql/StorageSchema";
import cookieParser from "cookie-parser";

const App: Express = express();
dotenv.config();

const routerConnect = () => {
  //Basic Configs

  App.use(cors({ credentials: true, origin: `http://localhost:${process.env.CLIENT_PORT}` }));
  App.use(cookieParser());
  App.use(express.json({ limit: "20mb" }));

  // For Authentication only
  App.use(`${process.env.BACKEND_ROOT_API}`, router);

  // Admin Only Accessible Queries
  App.use(`${process.env.BACKEND_GRAPHQL_ADMIN_ROOT_API}`, verifyAdminAuth, graphqlHTTP({ graphiql: false, schema: UserSchema }));

  // Common Accessible Queries
  App.use(`${process.env.BACKEND_GRAPHQL_STOARGE_ROOT_API}`, verifyStorageAuth, graphqlHTTP({ graphiql: false, schema: StorageSchema }));

  // Origin Port
  App.listen(process.env.BACKEND_PORT, () => {
    console.log("App is listening on 2100");
  });
};

const mongooseConnect = () => {
  try {
    if (process.env.MONOGODB_PORT) {
      mongoose
        .connect(process.env.MONOGODB_PORT)
        .then(() => {
          routerConnect();
        })
        .catch((err) => {
          return err;
        });
    }
  } catch (err) {
    console.log("DB is not Connected");
  }
};

mongooseConnect();
