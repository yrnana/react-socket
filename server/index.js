/**
 * Socket Server
 */

const express = require('express')
const app = express()

const path = require('path')
const http = require('http')
const socketIo = require('socket.io')

const server = http.createServer(app)
const io = socketIo(server)

io.on('connection', socket => {
	console.log('New client connected')

	socket.on('disconnect', () => console.log('Client disconnected'))

	socket.on('message', message => {
		console.log('Server got message! :', message)
		io.sockets.emit('message', 'Server got message!')
	})
})

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.resolve('./build')))
	app.get('*', (req, res) => {
		res.sendFile(path.resolve('./build/index.html'))
	})
}

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
	console.log(`Listening on ${PORT}...`)
})
