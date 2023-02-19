import redis_client from "../redis/client";

// const asyncHandler = require('express-async-handler')
// const { redis_client } = require("./client")
const { request_stream } = require("../app/utils/td_api");
const sp100 = require("../app/db/seeders/sp100.json");
const qqq = require("../app/db/seeders/qqq.json");

const load_default_redis = async () => {
	const data = request_stream([...sp100, ...qqq].reduce());
};
