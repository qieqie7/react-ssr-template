import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';

import App from '../../client/router/index';
import routeList from '../../client/router/route-config';
import matchRoute from '../../share/match-route';

export default async (ctx, next) => {
  try {
    const path = ctx.request.path;

    //查找到的目标路由对象
    let matchResult = matchRoute(path, routeList);
    let { targetRoute, targetMatch } = matchResult;

    //得到数据
    let fetchDataFn = targetRoute.component.getInitialProps;
    let fetchResult = {};
    if (fetchDataFn) {
      fetchResult = await fetchDataFn();
    }

    const context = {
      initialData: fetchResult,
    };

    const html = renderToString(
      <StaticRouter location={path} context={context}>
        <App routeList={routeList}></App>
      </StaticRouter>,
    );

    ctx.body = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>my react ssr</title></head><body><div id="root">${html}</div><textarea id="ssrTextInitData" style="display:none;">${JSON.stringify(
      fetchResult,
    )}</textarea><script type="text/javascript"src="index.js"></script></body></html>`;

    await next();
  } catch (error) {
    console.log(error);
  }
};
