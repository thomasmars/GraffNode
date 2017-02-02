import Express from 'express'
import {Server} from 'http'
import {config, port, env} from '../config/server'
import UniversalRoute from './routes/universal'
import AdminRoute from './routes/admin'

const app = new Express()
const server = new Server(app)

config(app)
AdminRoute(app)
UniversalRoute(app)

server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
