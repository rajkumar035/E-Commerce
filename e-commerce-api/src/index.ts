import express, { Express } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/router";

const App: Express = express();

const routerConnect = () => {
  //Basic Configs

  dotenv.config();
  App.use(cors());
  App.use(express.json());
  App.use(express.urlencoded({ extended: true }));
  App.use("/api", router);

  App.listen("2100", () => {
    console.log("App is listening on 2100");
  });
};

const mongooseConnect = () => {
  try {
    mongoose.connect("mongodb://localhost:27017").then(() => {
      routerConnect();
      console.log("Db connected");
    });
  } catch (err) {
    console.log("DB is not Connected");
  }
};

mongooseConnect();
