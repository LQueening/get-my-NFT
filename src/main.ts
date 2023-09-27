import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

const app = new Koa();
const router = new Router();
const PORT = 4090;

// 使用 koa-bodyparser 中间件来解析 POST 请求的请求体
app.use(bodyParser());

// 处理 GET 请求
router.get('/account/getNFTList', async (ctx: Koa.BaseContext) => {
  const { query } = ctx;
  ctx.body = `This is a GET request response.Received data: ${JSON.stringify(
    query,
  )}`;
});

// 处理 POST 请求
router.post('/account/refreshNFT', async (ctx: Koa.BaseContext) => {
  // 获取 POST 请求的请求体数据
  const requestData = ctx.request.body;
  console.log(requestData);
  ctx.body = `This is a POST request response. Received data: ${JSON.stringify(
    requestData,
  )}`;
});

// 使用路由中间件
app.use(router.routes());
app.use(router.allowedMethods());

// mongodb配置相关
const mongoUsername = process.env.USERNAME;
const mongoPassword = process.env.PASSWORD;
console.log(mongoUsername, mongoPassword);
const uri: string = `mongodb://127.0.0.1:27017/get_my_nft`;

mongoose
  .connect(uri, {
    authSource: 'get_my_nft',
    // user: mongoUsername,
    // pass: mongoPassword,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`),
    ),
  )
  .catch((error) => {
    console.log(JSON.stringify(error));
    throw error;
  });
