'use strict';
module.exports = (sequelize, DataTypes) => {
  const WatchlistEntry = sequelize.define('WatchlistEntry', {
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
  WatchlistEntry.associate = function(models) {
    // associations can be defined here
    WatchlistEntry.belongsTo(models.Watchlist, { foreignKey: 'watchlistId' })
  };
  return WatchlistEntry;
};
