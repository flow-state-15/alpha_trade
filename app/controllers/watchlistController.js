const asyncHandler = require("express-async-handler");
const { Watchlist, WatchlistEntry } = require("../db/models");

const get_all_watchlists = asyncHandler(async (req, res) => {
	const userId = req.params.userId;
	const watchlists = await Watchlist.findAll({
		where: { userId: userId },
		include: [{ model: WatchlistEntry }],
	});
	return res.json({
		watchlists,
	});
});

const create_watchlist = asyncHandler(async (req, res) => {
	if (!req.body.name || !req.body.userId) return Error("Bad data");
	const wl = await Watchlist.create(req.body);
	return res.json(wl);
});

const update_watchlist = asyncHandler(async (req, res) => {
	const id = req.params.id;
	const wl = await Watchlist.findByPk(id);
	await wl.update(req.body);
	const findwl = await Watchlist.findOne({
		where: { id: id },
		include: [{ model: WatchlistEntry }],
	});
	return res.json(findwl);
});

const delete_watchlist = asyncHandler(async (req, res) => {
	const id = req.params.id;
	const wl = await Watchlist.findByPk(id);
	if (!wl) throw new Error("Cannot find wl");
	await Watchlist.destroy({ where: { id: id } });
	return res.json(wl);
});

const delete_symbol_watchlist = asyncHandler(async (req, res) => {
	const { id, entryId } = req.params;
	await WatchlistEntry.destroy({ where: { id: entryId } });
	const findwl = await Watchlist.findOne({
		where: { id: id },
		include: [{ model: WatchlistEntry }],
	});
	return res.json(findwl);
});

const add_symbol_watchlist = asyncHandler(async (req, res) => {
	const form = req.body;

	await WatchlistEntry.create(form);

	const findwl = await Watchlist.findOne({
		where: { id: form.watchlistId },
		include: [{ model: WatchlistEntry }],
	});
	return res.json(findwl);
});

module.exports = {
	get_all_watchlists,
	create_watchlist,
	update_watchlist,
	delete_watchlist,
	delete_symbol_watchlist,
	add_symbol_watchlist,
};
