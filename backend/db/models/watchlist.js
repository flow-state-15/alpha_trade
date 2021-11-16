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
  };
  return Watchlist;
};
