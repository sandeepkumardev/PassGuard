import * as dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server";
import { ApolloServer as ApolloServerLambda } from "apollo-server-lambda";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import serverless from "serverless-http";
import express, { Router } from "express";
import * as path from "path";

function clientServer() {
  const app = express();
  const router = Router();

  app.use(express.static(path.join(__dirname, "build")));

  router.get("/", (req, res) => {
    const pathDir = path.join(__dirname, "build", "index.html");
    const rootDir = __dirname;
    res.send({
      pathDir,
      rootDir,
    });
  });

  app.use(router);
  return serverless(app);
}

function createLambdaServer() {
  return new ApolloServerLambda({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });
}

function createLocalServer() {
  return new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });
}

export { clientServer, createLambdaServer, createLocalServer };
