import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';

import App from '../../client/router/index';
import routeList from '../../client/router/route-config';
import matchRoute from '../../share/match-route';
//导入资源处理库
import getAssets from '../common/assets';
import getStaticRoutes from '../common/get-static-routes'

//得到静态资源
const assetsMap = getAssets();

export default async (ctx, next) => {
  try {
    const path = ctx.request.path;

    if (path.indexOf('.') > -1) {
      ctx.body = null;
      return next();
    }

    console.log('ctx.request.path.', ctx.request.path);

    const staticRoutesList = await getStaticRoutes(routeList);

    //查找到的目标路由对象
    let matchResult = matchRoute(path, staticRoutesList);
    let { targetRoute, targetMatch } = matchResult;

    //得到数据
    let fetchDataFn = targetRoute && targetRoute.component.getInitialProps;
    let fetchResult = {};
    if (fetchDataFn) {
      fetchResult = await fetchDataFn();
    }

    const context = {
      initialData: fetchResult,
    };

    const html = renderToString(
      <StaticRouter location={path} context={context}>
        <App routeList={staticRoutesList}></App>
      </StaticRouter>,
    );

    ctx.body = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>my react ssr</title>
    <!-- 输出 css 资源 -->
    ${assetsMap.css.join('')}
  </head>
  <body>
    <div id="root">${html}</div>
    <textarea id="ssrTextInitData" style="display:none;">${JSON.stringify(fetchResult)}</textarea>
    <!-- 输出 js 资源 -->
    ${assetsMap.js.join('')}
  </body>
</html>
`;

    await next();
  } catch (error) {
    console.log(error);
  }
};
