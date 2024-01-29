import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

module.exports = {
  schema: "http://localhost:4000/graphql",
  documents: ["./src/api/*.graphql"],
  overwrite: true,
  generates: {
    "./src/api/index.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        apolloReactHooksImportFrom: "@apollo/client",
      },
    },
  },
};
