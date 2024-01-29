import dotenv from "dotenv";
dotenv.config();
const ApolloServer = require("apollo-server").ApolloServer;
const ApolloServerLambda = require("apollo-server-lambda").ApolloServer;
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import { sequelize } from "./config/db";

export async function createLambdaServer() {
  await sequelize
    .authenticate()
    .then(() => {
      console.log("Database connection has been established successfully!");
    })
    .catch((err) => {
      console.error("failed to connect database!");
      console.log(err.message);
      process.exit(1);
    });

  return new ApolloServerLambda({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });
}

async function createLocalServer() {
  await sequelize
    .authenticate()
    .then(() => {
      console.log("Database connection has been established successfully!");
    })
    .catch((err) => {
      console.error("failed to connect database!");
      console.log(err.message);
      process.exit(1);
    });

  return new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });
}

async function startApolloServer() {
  const server = await createLocalServer();

  //@ts-ignore
  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

startApolloServer();
