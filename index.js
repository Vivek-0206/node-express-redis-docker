import express from 'express'
import {createClient} from 'redis'

const PORT = process.env.PORT || 5000

const app = express()

const client = await createClient({
	url: 'redis://red-cm77267qd2ns73f1rjt0:6379',
})
	.on('error', (err) => console.log('Redis Client Error', err))
	.connect()

// Send and retrieve some values
await client.set('key', 'node redis')
const value = await client.get('key')

console.log('value', value)

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
