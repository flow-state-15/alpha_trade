const asyncHandler = require('express-async-handler')
const { redis_client } = require("./client")
const { request_stream } = require("../backend/utils/td_api")
const sp100 = require("../backend/db/seeders/sp100.json")
const qqq = require("../backend/db/seeders/qqq.json")

const load_default_redis = asyncHandler(async () => {
    const data = request_stream([...sp100, ...qqq].reduce())
})

module.exports = {
    load_redis
}