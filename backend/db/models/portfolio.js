'use strict';
module.exports = (sequelize, DataTypes) => {
  const Portfolio = sequelize.define('Portfolio', {
    name: {
      type: DataTypes.STRING
    },
    userId: {
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
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {});
  Portfolio.associate = function(models) {
    // associations can be defined here
    Portfolio.belongsTo(models.User, { foreignKey: 'userId' });
    Portfolio.hasOne(models.PortfolioEntry, { foreignKey: 'portfolioId', onDelete: "CASCADE", hooks: true });
    Portfolio.hasMany(models.Transaction, { foreignKey: 'portfolioId', onDelete: "CASCADE", hooks: true });
  };
  return Portfolio;
};
