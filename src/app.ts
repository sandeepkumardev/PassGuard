// import * as dotenv from "dotenv";
// dotenv.config();
// import express, { Router } from "express";
// import graphiql from "graphql-playground-middleware-express";
// import { ApolloServer } from "apollo-server-express";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import middleware from "./middleware";
import cors from "cors";
import { sequelize } from "./config/db";
import path from "path";
import serverless from "serverless-http";

// async function startApolloServer() {
//   await sequelize
//     .authenticate()
//     .then(() => {
//       console.log("Database connection has been established successfully!");
//     })
//     .catch((err: Error) => {
//       console.error("failed to connect database!");
//       console.log(err.message);
//       process.exit(1);
//     });

//   const app = express();

//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//   });

//   //@ts-ignore
//   server.applyMiddleware({ app });

//   app.get("/playground", graphiql({ endpoint: "/graphql" }));
//   app.use(cors());
//   const router = Router();
//   router.get("/", (req, res) => {
//     res.send("Test route");
//   });
//   app.use("/.netlify/functions/api", router);

//   const handler = serverless(app);

//   return { handler };

// app.use(middleware);

// app.use(express.static(path.join(__dirname, "build")));

// router.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });
// router.get("/test", (req, res) => {
//   res.send("Test route");
// });

// const handler = serverless(app);

// var port = process.env.PORT || 4000;
// app.listen({ port });

// console.log("🚀 Server ready at -", {
//   REST: `http://localhost:4000`,
//   Graphql: `http://localhost:4000${server.graphqlPath}`,
// });
// return { server, handler };
// }

// startApolloServer();
