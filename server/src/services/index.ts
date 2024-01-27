import { Sequelize } from "sequelize";
import Domain from "../models";

const Fetch = async (isDeleted: Boolean) => {
  return await Domain.findAll({
    where: !isDeleted
      ? {
          deletedAt: null,
        }
      : {},
  });
};

const Create = async (name: string) => {
  const data = await Domain.findOrCreate({
    where: {
      name: name,
    },
    defaults: {
      id: Date.now(),
      name,
    },
  });

  if (!data[1]) return;
  return data[0].dataValues;
};

const UpdatePassword = async (id: Number, password: String) => {
  const data = await Domain.update(
    {
      usedPW: Sequelize.fn("array_append", Sequelize.col("usedPW"), password),
    },
    {
      where: {
        id: id,
      },
    }
  );

  //@ts-ignore
  if (data == 1) {
    return { affectedCount: 1 };
  } else {
    return { affectedCount: 0 };
  }
};

const RemoveDomain = async (id: Number) => {
  const data = await Domain.update(
    {
      deletedAt: Date.now(),
    },
    {
      where: {
        id: id,
      },
    }
  );

  //@ts-ignore
  if (data == 1) {
    return { affectedCount: 1 };
  } else {
    return { affectedCount: 0 };
  }
};

const DeleteDomain = async (id: Number) => {
  const data = await Domain.destroy({
    where: {
      id: id,
    },
  });

  return { affectedCount: data };
};

export { Fetch, Create, UpdatePassword, RemoveDomain, DeleteDomain };
