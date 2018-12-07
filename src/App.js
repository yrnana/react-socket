import React, { Component } from 'react'
import io from 'socket.io-client'

class App extends Component {
	componentDidMount() {
		this.socket = io()
		this.socket.on('message', msg => {
			console.log('Client got message! :', msg)
		})
	}

	handleClick = () => {
		this.socket.emit('message', "client's message")
	}

	render() {
		return <button onClick={this.handleClick}>클릭!</button>
	}
}

export default App
