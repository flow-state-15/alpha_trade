'use strict';
module.exports = (sequelize, DataTypes) => {
  const PortfolioEntry = sequelize.define('PortfolioEntry', {
    portfolioId: {
      allowNull: false,
      references: { model: "Portfolios" },
      onDelete: "CASCADE",
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
    value: {
      type: DataTypes.DECIMAL,
    },
    change: {
      type: DataTypes.DECIMAL,
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    },
  }, {});
  PortfolioEntry.associate = function(models) {
    // associations can be defined here
    PortfolioEntry.belongsTo(models.Portfolio, { foreignKey: 'portfolioId', onDelete: "CASCADE", hooks: true });
  };
  return PortfolioEntry;
};
