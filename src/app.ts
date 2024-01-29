import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import middleware from "./middleware";
import cors from "cors";
import { sequelize } from "./config/db";
import path from "path";

async function startApolloServer() {
  await sequelize
    .authenticate()
    .then(() => {
      console.log("Database connection has been established successfully!");
    })
    .catch((err: Error) => {
      console.error("failed to connect database!");
      console.log(err.message);
      process.exit(1);
    });

  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  //@ts-ignore
  server.applyMiddleware({ app });

  app.use(cors());
  app.use(middleware);

  app.use(express.static(path.join(__dirname)));

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client", "build", "index.html"));
  });

  // app.get("/", (req: any, res: any) => {
  //   res.send("Hello");
  // });

  app.listen({ port: 4000 });
  console.log("🚀 Server ready at -", {
    REST: `http://localhost:4000`,
    Graphql: `http://localhost:4000${server.graphqlPath}`,
  });
  return { server, app };
}

startApolloServer();
