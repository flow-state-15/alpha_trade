"use strict";
module.exports = (sequelize, DataTypes) => {
	const Portfolio = sequelize.define(
		"Portfolio",
		{
			name: {
				type: DataTypes.STRING,
			},
			userId: {
				references: { model: "Users" },
				onDelete: "CASCADE",
				type: DataTypes.INTEGER,
			},
			startingFunds: {
				type: DataTypes.DECIMAL,
			},
			currentFunds: {
				type: DataTypes.DECIMAL,
			},
			value: {
				type: DataTypes.DECIMAL,
			},
			change: {
				type: DataTypes.DECIMAL,
			},
			createdAt: {
				type: DataTypes.DATE,
			},
			updatedAt: {
				type: DataTypes.DATE,
			},
		},
		{}
	);
	Portfolio.associate = function (models) {
		// associations can be defined here
		Portfolio.belongsTo(models.User, { foreignKey: "userId" });
		Portfolio.hasMany(models.PortfolioEntry, {
			foreignKey: "portfolioId",
			onDelete: "CASCADE",
			as: "symbols",
			hooks: true,
		});
		Portfolio.hasMany(models.Transaction, {
			foreignKey: "portfolioId",
			onDelete: "CASCADE",
			hooks: true,
		});
	};
	return Portfolio;
};
