'use strict';
module.exports = (sequelize, DataTypes) => {
  const PortfolioEntry = sequelize.define('PortfolioEntry', {
    portfolioId: {
      allowNull: false,
      references: { model: "Portfolios" },
      type: DataTypes.INTEGER
    },
    amount: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    symbol: {
      allowNull: false,
      type: DataTypes.STRING
    },
    symbolName: {
      type: DataTypes.STRING
    },
    currentPrice: {
      type: DataTypes.DECIMAL
    },
    expires: {
      type: DataTypes.DATE
    },
    impVol: {
      type: DataTypes.DECIMAL
    },
    delta: {
      type: DataTypes.DECIMAL
    },
    theta: {
      type: DataTypes.DECIMAL
    },
    gamma: {
      type: DataTypes.DECIMAL
    },
    rho: {
      type: DataTypes.DECIMAL
    },
  }, {});
  PortfolioEntry.associate = function(models) {
    // associations can be defined here
    PortfolioEntry.belongsTo(models.Portfolio, { foreignKey: 'portfolioId', onDelete: "CASCADE", hooks: true });
  };
  return PortfolioEntry;
};
