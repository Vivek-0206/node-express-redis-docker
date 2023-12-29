import express from 'express'
import {createClient} from 'redis'

const PORT = process.env.PORT || 5000

const app = express()

const client = createClient({
	url: process.env.REDIS_URL,
})

client.on('error', (err) => console.log('Redis Client Error', err))

await client.connect()

// Send and retrieve some values
await client.set('key', 'node redis')
const value = await client.get('key')

console.log('found value: ', value)

client.set('visits', 0)

app.get('/', (req, res) => {
	client.get('visits', (err, visits) => {
		res.send('Number of visits is ' + visits)
		client.set('visits', parseInt(visits) + 1)
	})
})

app.listen(PORT, () => {
	console.log(`[INFO] ==> Server is running on port ${PORT}`)
	console.log(`[INFO] ==> http://localhost:${PORT}`)
})
