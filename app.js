const reactSsr = require('./dist/src/server/middlewares/react-ssr').default;

const Koa = require('koa2');
const koaStatic = require('koa-static');
const path = require('path');

const app = new Koa();

app.use(koaStatic(path.join(__dirname, './dist/static')));

//react ssr 中间件
app.use(reactSsr);

//启动服务
app.listen(9001);
