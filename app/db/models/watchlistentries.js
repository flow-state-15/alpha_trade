"use strict";
module.exports = (sequelize, DataTypes) => {
  const WatchlistEntry = sequelize.define(
    "WatchlistEntry",
    {
      watchlistId: {
        allowNull: false,
        references: { model: "Watchlists" },
        onDelete: "CASCADE",
        type: DataTypes.INTEGER,
      },
      symbol: {
        type: DataTypes.STRING,
      },
      symbolName: {
        type: DataTypes.STRING,
      },
    },
    {}
  );
  WatchlistEntry.associate = function (models) {
    // associations can be defined here
    WatchlistEntry.belongsTo(models.Watchlist, {
      foreignKey: "watchlistId",
      onDelete: "CASCADE",
      hooks: true,
    });
  };
  return WatchlistEntry;
};
