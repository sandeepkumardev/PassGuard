import { gql } from "apollo-server-express";

export default gql`
  type Domain_Input {
    name: String!
    password: String!
  }

  type Domain {
    id: ID
    name: String
    usedPW: [String]
    password: String
    createdAt: String
    updatedAt: String
    deletedAt: String
  }

  type affectedRows {
    affectedCount: Int!
  }

  type newDomainOutput {
    data: Domain!
  }

  type Query {
    domains(isDeleted: Boolean): [Domain]!
  }

  type Mutation {
    newDomain(name: String!): Domain
    isPasswordExist(id: ID!, password: String!): affectedRows!
    addPassword(id: ID!, password: String!): affectedRows!
    removeDomain(id: ID!, password: String!): affectedRows!
    destroyDomain(id: ID!): affectedRows!
  }
`;
