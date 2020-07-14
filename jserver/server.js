// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const portNumber = 3333;

server.use(middlewares)
server.use(router)
server.listen(portNumber, () => {
  console.log('JSON Server is running')
})