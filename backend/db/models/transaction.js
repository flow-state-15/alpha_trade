'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "Users" }
    },
    portfolioId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "Portfolios" }
    },
    symbol: {
      allowNull: false,
      type: DataTypes.STRING
    },
    symbolName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here

  };
  return Transaction;
};
