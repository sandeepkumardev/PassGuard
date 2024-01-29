import { sequelize } from "../config/db";
import { DataTypes } from "sequelize";

const Domain = sequelize.define("domain", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  usedPW: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

Domain.sync().catch((err) => {
  console.error("failed to synced Model - ", err.message);
});

export default Domain;
