import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, Route } from 'react-router';

import App from '../../client/router/index';
import routeList, { matchRoute } from '../../client/router/route-config';

export default async (ctx, next) => {
  try {
    const path = ctx.request.path;

    let targetRoute = matchRoute(ctx, routeList);

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
