import redis from 'redis'

const redis_client = redis.createClient({
    connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: 6379
    }
})

redis_client.on('error', (err) => {
    console.log("\n\n REDIS ERROR!!!: ", err, "\n\n")
})

console.log("\n\n REDIS CLIENT INITIALIZED \n\n")

export default redis_client