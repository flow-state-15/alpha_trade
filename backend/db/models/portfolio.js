'use strict';
module.exports = (sequelize, DataTypes) => {
  const Portfolio = sequelize.define('Portfolio', {
    name: {
      type: DataTypes.STRING
    },
    userId: {
      allowNull: false,
      references: { model: "Users" },
      type: DataTypes.INTEGER
    },
    startingFunds: {
      type: DataTypes.DECIMAL
    },
    currentFunds: {
      type: DataTypes.DECIMAL
    },
    plYTD: {
      type: DataTypes.DECIMAL
    },
    plMonth: {
      type: DataTypes.DECIMAL
    },
    plDay: {
      type: DataTypes.DECIMAL
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  Portfolio.associate = function(models) {
    // associations can be defined here
  };
  return Portfolio;
};
