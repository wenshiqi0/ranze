import * as http from 'http';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as SocketIO from 'socket.io';
import * as path from 'path';
import { readFile } from 'fs-extra';

const app = new Koa();
const router = new Router();

const server = http.createServer(app.callback());

router.get('/', async (ctx, next) => {
  // ctx.router available
  const htmlString =
    await readFile(path.join(__dirname, '../../template/index.html'), 'utf-8');
  ctx.body = htmlString;
  next();
});

router.get('/source/client.js', async (ctx, next) => {
  const jsString = 
    await readFile(path.join(__dirname, '../client/index.js'), 'utf-8');
  ctx.body = jsString;
  next();
})

app
  .use(router.routes())
  .use(router.allowedMethods());

const io = SocketIO(server);

io.on('connection', function (socket) {
  console.log('a user connected')

  socket.on('message', (event) => {
    console.log(event);
    socket.send("message", event);
  })
})

server.listen(3000);
