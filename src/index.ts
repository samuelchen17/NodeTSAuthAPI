import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import connectDB from "./database/index.database";
import { errorHandler } from "./utils/errorHandler.utils";
import router from "./router/index.router";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(compression()); // compresses all responses
app.use(cookieParser());
app.use(bodyParser.json()); // to parse JSON-formatted request bodies
app.use(bodyParser.urlencoded({ extended: true })); // to parse URL-encoded data (from forms)

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server running on localhost:8080");
});

connectDB(); // connect to DB

app.use("/", router());

app.use(errorHandler);
