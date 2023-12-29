import express from 'express'
import {createClient} from 'redis'

const PORT = process.env.PORT || 5000

const app = express()
const client = createClient({
	host: 'redis-server',
	port: 6379
})
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
