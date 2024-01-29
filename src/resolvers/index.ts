import {
  Create,
  DeleteDomain,
  Fetch,
  IsPasswordExist,
  RemoveDomain,
  UpdatePassword,
} from "../services";

const resolvers = {
  Query: {
    async domains(root: any, { isDeleted }: any) {
      return await Fetch(isDeleted);
    },
  },
  Mutation: {
    async newDomain(root: any, { name }: any) {
      return await Create(name);
    },
    async isPasswordExist(root: any, { id, password }: any) {
      return await IsPasswordExist(id, password);
    },
    async addPassword(root: any, { id, password }: any) {
      return await UpdatePassword(id, password);
    },
    async removeDomain(root: any, { id, password }: any) {
      return await RemoveDomain(id, password);
    },
    async destroyDomain(root: any, { id }: any) {
      return await DeleteDomain(id);
    },
  },
};

export default resolvers;
