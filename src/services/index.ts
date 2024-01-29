import { Sequelize } from "sequelize";
import Domain from "../models";

const Fetch = async (isDeleted: Boolean) => {
  return await Domain.findAll({
    where: !isDeleted
      ? {
          deletedAt: null,
        }
      : {},
    order: [["createdAt", "DESC"]],
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

const IsPasswordExist = async (id: Number, password: String) => {
  //@ts-ignore
  const data = await Domain.findByPk(id);
  if (data.dataValues?.usedPW?.includes(password)) {
    return { affectedCount: 1 };
  }
  return { affectedCount: 0 };
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

const RemoveDomain = async (id: Number, password: String) => {
  const data = await Domain.update(
    {
      deletedAt: Date.now(),
      password: password,
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

export {
  Fetch,
  Create,
  IsPasswordExist,
  UpdatePassword,
  RemoveDomain,
  DeleteDomain,
};
