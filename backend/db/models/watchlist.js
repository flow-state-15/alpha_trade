'use strict';
module.exports = (sequelize, DataTypes) => {
  const Watchlist = sequelize.define('Watchlist', {
    name: {
      type: DataTypes.STRING
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {});
  Watchlist.associate = function(models) {
    // associations can be defined here
    Watchlist.belongsTo(models.User, { foreignKey: 'userId', onDelete: "CASCADE", hooks: true });
    Watchlist.hasOne(models.WatchlistEntry, { foreignKey: 'watchlistId', onDelete: "CASCADE", hooks: true })
  };
  return Watchlist;
};
