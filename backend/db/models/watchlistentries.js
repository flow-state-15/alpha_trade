'use strict';
module.exports = (sequelize, DataTypes) => {
  const WatchlistEntries = sequelize.define('WatchlistEntries', {
    watchlistId: {
      allowNull: false,
      references: { model: "Watchlists" },
      type: DataTypes.INTEGER
    },
    amount: {
      type: DataTypes.INTEGER
    },
    symbol: {
      type: DataTypes.STRING
    },
    symbolName: {
      type: DataTypes.STRING
    },
    currentPrice: {
      type: DataTypes.DECIMAL
    },
    sessionStartPrice: {
      type: DataTypes.DECIMAL
    },
    prevSessionClose: {
      type: DataTypes.DECIMAL
    },
  }, {});
  WatchlistEntries.associate = function(models) {
    // associations can be defined here
  };
  return WatchlistEntries;
};
